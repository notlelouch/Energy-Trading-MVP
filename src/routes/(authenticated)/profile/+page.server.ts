import { createPool } from "@vercel/postgres";
import { POSTGRES_URL } from "$env/static/private";
import type { Actions } from "./$types";
import { json } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const db = createPool({ connectionString: POSTGRES_URL });


// export const load = async ({ cookies }) => {
//   try {
//     const sessionCookie = cookies.get('session');
//     if (!sessionCookie) {
//       return { user: null };
//     }

//     const session = JSON.parse(sessionCookie);
//     const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [session.id]);
//     if (rows.length === 0) {
//       return { user: null };
//     }

//     // Update the session cookie with the latest user data
//     const user = rows[0];
//     cookies.set('session', JSON.stringify(user), {
//       path: '/',
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       maxAge: 60 * 60 * 24 // 1 day
//     });

//     return { user };
//   } catch (error) {
//     console.error("Error loading user data:", error);
//     return { user: null };
//   }
// };


import debug from 'debug';
const log = debug("app:profile.server");

export const load: PageServerLoad = async ({ locals }) => {
  // Access user data from locals, which is set by your auth system in hooks.server.ts
  const user = locals.user;

  log("User from locals:", user);

  let userData = {
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    energy_source_details: '',
    payment_method: ''
  };

  if (user?.email) {
    try {
      const result = await db.query(`
        SELECT address, energy_source_details, payment_method
        FROM users
        WHERE email = $1
      `, [user.email]);

      log("Database query result:", result.rows);

      if (result.rows.length > 0) {
        userData = { ...userData, ...result.rows[0] };
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // We'll still return the basic user data even if the database query fails
    }
  }

  log("Final userData:", userData);

  return { user: userData };
};




async function seed() {
  const client = await db.connect();
  try {
    // Check if the table exists
    const tableExists = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'users'
      );
    `);

    if (!tableExists.rows[0].exists) {
      // Create the users table if it doesn't exist
      await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          address VARCHAR(255),
          energy_source_details VARCHAR(255),
          payment_method VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log("Created users table");
    } else {
      // Check if the new columns exist
      const columnsExist = await client.query(`
        SELECT 
          EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'energy_source_details') as energy_source_exists,
          EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'payment_method') as payment_method_exists
      `);

      if (!columnsExist.rows[0].energy_source_exists) {
        await client.query(`ALTER TABLE users ADD COLUMN energy_source_details VARCHAR(255);`);
        console.log("Added energy_source_details column");
      }

      if (!columnsExist.rows[0].payment_method_exists) {
        await client.query(`ALTER TABLE users ADD COLUMN payment_method VARCHAR(255);`);
        console.log("Added payment_method column");
      }
    }

    // Check if the table is empty
    const { rows } = await client.query("SELECT COUNT(*) FROM users");
    if (rows[0].count === '0') {
      // Insert sample data
      await client.query(`
        INSERT INTO users (name, email, address, energy_source_details, payment_method)
        VALUES
          ('John Doe', 'john@example.com', '123 Main St, Anytown, USA', 'Solar panels', 'Credit card'),
          ('Jane Smith', 'jane@example.com', '456 Oak Ave, Another City, USA', 'Wind power', 'PayPal'),
          ('Bob Johnson', 'bob@example.com', '789 Pine Rd, Somewhere, USA', 'Hydroelectric', 'Bank transfer')
        ON CONFLICT (email) DO NOTHING;
      `);
      console.log("Seeded users successfully");
    } else {
      console.log("Users table already contains data, skipping seed");
    }
    const { rows: tableContent } = await client.query("SELECT * FROM users");
    console.log("Current users table content:", tableContent);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    client.release();
  }
}

// The rest of your code remains the same...



seed().catch(error => console.error("Error during seeding:", error));

export const actions: Actions = {
  update: async ({ request, cookies }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const energySourceDetails = formData.get('energySourceDetails') as string;
    const paymentMethod = formData.get('paymentMethod') as string;

    console.log("Received form data:", { email, name, address, energySourceDetails, paymentMethod });

    if (!email || !name || !address || !energySourceDetails || !paymentMethod) {
      console.log("Missing required fields");
      return json({ success: false, error: "All fields are required." });
    }

    try {
      console.log("Attempting to find or create user in database");
      
      // Try to update the user first
      const updateResult = await db.query(
        "UPDATE users SET name = $1, address = $2, energy_source_details = $3, payment_method = $4 WHERE email = $5 RETURNING *;",
        [name, address, energySourceDetails, paymentMethod, email]
      );

      let user;
      if (updateResult.rows.length === 0) {
        // No user found, insert a new user
        console.log("No user found with email:", email, "Creating new user");
        const insertResult = await db.query(
          "INSERT INTO users (name, email, address, energy_source_details, payment_method) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
          [name, email, address, energySourceDetails, paymentMethod]
        );
        user = insertResult.rows[0];
      } else {
        user = updateResult.rows[0];
      }

      console.log("Updated/Inserted user:", user);

      // Update the session cookie with the latest user data
      cookies.set('session', JSON.stringify(user), {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 // 1 day
      });

      console.log("Session cookie updated");
      const response = { success: true, message: "Profile updated successfully" };
      console.log("Sending response:", response);

      
      // Log the updated session user data
      const sessionCookie = cookies.get('session');
      if (sessionCookie) {
        const sessionUser = JSON.parse(sessionCookie);
        console.log("Updated session user data:", sessionUser);
      } else {
        console.log("No session cookie found after update");
      }


      return response;
    } catch (error) {
      console.error("Error updating profile:", error);
      return { success: false, error: `Update failed: ${(error as Error).message}` };
    }
  }
};
