// import { createPool } from "@vercel/postgres";
// import { POSTGRES_URL } from "$env/static/private";
// import type { Actions } from "./$types";
// import { json } from '@sveltejs/kit';

// const db = createPool({ connectionString: POSTGRES_URL });



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


// async function seed() {
//   const client = await db.connect();
//   try {
//     // Create the users table if it doesn't exist
//     await client.query(`
//       CREATE TABLE IF NOT EXISTS users (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email VARCHAR(255) UNIQUE NOT NULL,
//         address VARCHAR(255),
//         energy source details VARCHAR(255), 
//         payment method VARCHAR(255),
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       );
//     `);

//     // Check if the table is empty
//     const { rows } = await client.query("SELECT COUNT(*) FROM users");
//     if (rows[0].count === '0') {
//       // Insert sample data
//       await client.query(`
//         INSERT INTO users (name, email, address, energy source details, payment method)
//         VALUES
//           ('John Doe', 'john@example.com', '123 Main St, Anytown, USA', 'nuclear', 'bitocin'),
//           ('Jane Smith', 'jane@example.com', '456 Oak Ave, Another City, USA', 'solar', 'UPI'),
//           ('Bob Johnson', 'bob@example.com', '789 Pine Rd, Somewhere, USA', 'wind', 'cash')
//         ON CONFLICT (email) DO NOTHING;
//       `);
//       console.log("Seeded users successfully");
//       // Log the table content
//       const { rows: tableContent } = await client.query("SELECT * FROM users");
//       console.log("Current users table content:", tableContent);
//     } else {
//       console.log("Users table already contains data, skipping seed");
//       const { rows: tableContent } = await client.query("SELECT * FROM users");
//       console.log("Current users table content:", tableContent);
//     }
//   } catch (error) {
//     console.error("Error seeding database:", error);
//   } finally {
//     client.release();
//   }
// }

// // Call the seed function when the module is loaded
// seed().catch(error => console.error("Error during seeding:", error));


// export const actions: Actions = {
//   update: async ({ request, cookies }) => {
//     const formData = await request.formData();
//     const email = formData.get('email') as string;
//     const name = formData.get('name') as string;
//     const address = formData.get('address') as string;

//     console.log("Received form data:", { email, name, address });

//     if (!email || !name || !address) {
//       console.log("Missing required fields");
//       return json({ success: false, error: "All fields are required." });
//     }

//     try {
//       console.log("Attempting to find or create user in database");
      
//       // Try to update the user first
//       const updateResult = await db.query(
//         "UPDATE users SET name = $1, address = $2 WHERE email = $3 RETURNING *;",
//         [name, address, email]
//       );

//       let user;
//       if (updateResult.rows.length === 0) {
//         // No user found, insert a new user
//         console.log("No user found with email:", email, "Creating new user");
//         const insertResult = await db.query(
//           "INSERT INTO users (name, email, address) VALUES ($1, $2, $3) RETURNING *;",
//           [name, email, address]
//         );
//         user = insertResult.rows[0];
//       } else {
//         user = updateResult.rows[0];
//       }

//       console.log("Updated/Inserted user:", user);

//       // Update the session cookie with the latest user data
//       cookies.set('session', JSON.stringify(user), {
//         path: '/',
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         maxAge: 60 * 60 * 24 // 1 day
//       });


//       console.log("Session cookie updated");
//       const response = { success: true, message: "Profile updated successfully" };
//       console.log("Sending response:", response);

      
//       // Log the updated session user data
//       const sessionCookie = cookies.get('session');
//       if (sessionCookie) {
//         const sessionUser = JSON.parse(sessionCookie);
//         console.log("Updated session user data:", sessionUser);
//       } else {
//         console.log("No session cookie found after update");
//       }


//       return response;
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       return { success: false, error: `Update failed: ${(error as Error).message}` };
//     }
//   }
// };









// import { createPool } from "@vercel/postgres";
// import { POSTGRES_URL } from "$env/static/private";
// import type { Actions } from "./$types";
// import { json } from '@sveltejs/kit';

// const db = createPool({ connectionString: POSTGRES_URL });



// export const load = async ({ cookies }) => {
//   try {
//     const sessionCookie = cookies.get('session');
//     if (!sessionCookie) {
//       return { user: null };
//     }

//     const session = JSON.parse(sessionCookie);
//     const { rows } = await db.query("SELECT * FROM profiles WHERE id = $1", [session.id]);
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


// async function seed() {
//   const client = await db.connect();
//   try {
//     // Create the profiles table if it doesn't exist
//     await client.query(`
//       CREATE TABLE IF NOT EXISTS profiles (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email VARCHAR(255) UNIQUE NOT NULL,
//         address VARCHAR(255),
//         energy source details VARCHAR(255), 
//         payment method VARCHAR(255),
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       );
//     `);

//     // Check if the table is empty
//     const { rows } = await client.query("SELECT COUNT(*) FROM profiles");
//     if (rows[0].count === '0') {
//       // Insert sample data
//       await client.query(`
//         INSERT INTO profiles (name, email, address, energy source details, payment method)
//         VALUES
//           ('John Doe', 'john@example.com', '123 Main St, Anytown, USA', 'nuclear', 'bitocin'),
//           ('Jane Smith', 'jane@example.com', '456 Oak Ave, Another City, USA', 'solar', 'UPI'),
//           ('Bob Johnson', 'bob@example.com', '789 Pine Rd, Somewhere, USA', 'wind', 'cash')
//         ON CONFLICT (email) DO NOTHING;
//       `);
//       console.log("Seeded profiles successfully");
//       // Log the table content
//       const { rows: tableContent } = await client.query("SELECT * FROM profiles");
//       console.log("Current profiles table content:", tableContent);
//     } else {
//       console.log("profiles table already contains data, skipping seed");
//       const { rows: tableContent } = await client.query("SELECT * FROM profiles");
//       console.log("Current profiles table content:", tableContent);
//     }
//   } catch (error) {
//     console.error("Error seeding database:", error);
//   } finally {
//     client.release();
//   }
// }

// // Call the seed function when the module is loaded
// seed().catch(error => console.error("Error during seeding:", error));


// export const actions: Actions = {
//   update: async ({ request, cookies }) => {
//     const formData = await request.formData();
//     const email = formData.get('email') as string;
//     const name = formData.get('name') as string;
//     const address = formData.get('address') as string;
//     const payment_method = formData.get('payment_method') as string;
//     const energy_source_details = formData.get('energy_source_details') as string;


//     console.log("Received form data:", { email, name, address, payment_method, energy_source_details });

//     if (!email || !name || !address || !payment_method || !energy_source_details) {
//       console.log("Missing required fields");
//       return json({ success: false, error: "All fields are required." });
//     }

//     try {
//       console.log("Attempting to find or create user in database");
      
//       // Try to update the user first
//       const updateResult = await db.query(
//         "UPDATE profiles SET name = $1, address = $2, payment_method = $3, energy_source_details = $4  WHERE email = $5 RETURNING *;",
//         [name, address, payment_method, energy_source_details, email]
//       );

//       let user;
//       if (updateResult.rows.length === 0) {
//         // No user found, insert a new user
//         console.log("No user found with email:", email, "Creating new user");
//         const insertResult = await db.query(
//           "INSERT INTO profiles (name, email, address, payment_method, energy_source_details) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
//           [name, email, address, payment_method, energy_source_details]
//         );
//         user = insertResult.rows[0];
//       } else {
//         user = updateResult.rows[0];
//       }

//       console.log("Updated/Inserted user:", user);

//       // Update the session cookie with the latest user data
//       cookies.set('session', JSON.stringify(user), {
//         path: '/',
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         maxAge: 60 * 60 * 24 // 1 day
//       });


//       console.log("Session cookie updated");
//       const response = { success: true, message: "Profile updated successfully" };
//       console.log("Sending response:", response);

      
//       // Log the updated session user data
//       const sessionCookie = cookies.get('session');
//       if (sessionCookie) {
//         const sessionUser = JSON.parse(sessionCookie);
//         console.log("Updated session user data:", sessionUser);
//       } else {
//         console.log("No session cookie found after update");
//       }


//       return response;
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       return { success: false, error: `Update failed: ${(error as Error).message}` };
//     }
//   }
// };









// import { createPool } from "@vercel/postgres";
// import { POSTGRES_URL } from "$env/static/private";
// import type { Actions } from "./$types";
// import { json } from '@sveltejs/kit';

// const db = createPool({ connectionString: POSTGRES_URL });

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

// async function seed() {
//   const client = await db.connect();
//   try {
//     // Check if the table exists
//     const tableExists = await client.query(`
//       SELECT EXISTS (
//         SELECT FROM information_schema.tables 
//         WHERE table_name = 'users'
//       );
//     `);

//     if (!tableExists.rows[0].exists) {
//       // Create the users table if it doesn't exist
//       await client.query(`
//         CREATE TABLE users (
//           id SERIAL PRIMARY KEY,
//           name VARCHAR(255) NOT NULL,
//           email VARCHAR(255) UNIQUE NOT NULL,
//           address VARCHAR(255),
//           energy_source_details VARCHAR(255),
//           payment_method VARCHAR(255),
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         );
//       `);
//       console.log("Created users table");
//     } else {
//       // Check if the new columns exist
//       const columnsExist = await client.query(`
//         SELECT 
//           EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'energy_source_details') as energy_source_exists,
//           EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'payment_method') as payment_method_exists
//       `);

//       if (!columnsExist.rows[0].energy_source_exists) {
//         await client.query(`ALTER TABLE users ADD COLUMN energy_source_details VARCHAR(255);`);
//         console.log("Added energy_source_details column");
//       }

//       if (!columnsExist.rows[0].payment_method_exists) {
//         await client.query(`ALTER TABLE users ADD COLUMN payment_method VARCHAR(255);`);
//         console.log("Added payment_method column");
//       }
//     }

//     // Check if the table is empty
//     const { rows } = await client.query("SELECT COUNT(*) FROM users");
//     if (rows[0].count === '0') {
//       // Insert sample data
//       await client.query(`
//         INSERT INTO users (name, email, address, energy_source_details, payment_method)
//         VALUES
//           ('John Doe', 'john@example.com', '123 Main St, Anytown, USA', 'Solar panels', 'Credit card'),
//           ('Jane Smith', 'jane@example.com', '456 Oak Ave, Another City, USA', 'Wind power', 'PayPal'),
//           ('Bob Johnson', 'bob@example.com', '789 Pine Rd, Somewhere, USA', 'Hydroelectric', 'Bank transfer')
//         ON CONFLICT (email) DO NOTHING;
//       `);
//       console.log("Seeded users successfully");
//     } else {
//       console.log("Users table already contains data, skipping seed");
//     }
//     const { rows: tableContent } = await client.query("SELECT * FROM users");
//     console.log("Current users table content:", tableContent);
//   } catch (error) {
//     console.error("Error seeding database:", error);
//   } finally {
//     client.release();
//   }
// }

// // The rest of your code remains the same...



// seed().catch(error => console.error("Error during seeding:", error));

// export const actions: Actions = {
//   update: async ({ request, cookies }) => {
//     const formData = await request.formData();
//     const email = formData.get('email') as string;
//     const name = formData.get('name') as string;
//     const address = formData.get('address') as string;
//     const energySourceDetails = formData.get('energySourceDetails') as string;
//     const paymentMethod = formData.get('paymentMethod') as string;

//     console.log("Received form data:", { email, name, address, energySourceDetails, paymentMethod });

//     if (!email || !name || !address || !energySourceDetails || !paymentMethod) {
//       console.log("Missing required fields");
//       return json({ success: false, error: "All fields are required." });
//     }

//     try {
//       console.log("Attempting to find or create user in database");
      
//       // Try to update the user first
//       const updateResult = await db.query(
//         "UPDATE users SET name = $1, address = $2, energy_source_details = $3, payment_method = $4 WHERE email = $5 RETURNING *;",
//         [name, address, energySourceDetails, paymentMethod, email]
//       );

//       let user;
//       if (updateResult.rows.length === 0) {
//         // No user found, insert a new user
//         console.log("No user found with email:", email, "Creating new user");
//         const insertResult = await db.query(
//           "INSERT INTO users (name, email, address, energy_source_details, payment_method) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
//           [name, email, address, energySourceDetails, paymentMethod]
//         );
//         user = insertResult.rows[0];
//       } else {
//         user = updateResult.rows[0];
//       }

//       console.log("Updated/Inserted user:", user);

//       // Update the session cookie with the latest user data
//       cookies.set('session', JSON.stringify(user), {
//         path: '/',
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         maxAge: 60 * 60 * 24 // 1 day
//       });

//       console.log("Session cookie updated");
//       const response = { success: true, message: "Profile updated successfully" };
//       console.log("Sending response:", response);

      
//       // Log the updated session user data
//       const sessionCookie = cookies.get('session');
//       if (sessionCookie) {
//         const sessionUser = JSON.parse(sessionCookie);
//         console.log("Updated session user data:", sessionUser);
//       } else {
//         console.log("No session cookie found after update");
//       }


//       return response;
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       return { success: false, error: `Update failed: ${(error as Error).message}` };
//     }
//   }
// };
