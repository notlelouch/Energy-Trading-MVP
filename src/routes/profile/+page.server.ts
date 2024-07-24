import { createPool } from "@vercel/postgres";
import { POSTGRES_URL } from "$env/static/private";

const db = createPool({ connectionString: POSTGRES_URL });

export async function load() {
  try {
    const { rows: profiles } = await db.query("SELECT * FROM names ORDER BY \"createdAt\" DESC LIMIT 1");
    console.log("Loaded profile:", profiles[0]); // Log the data
    return {
      latestProfile: profiles[0] || {},
    };
  } catch (error) {
    console.error("Error loading profile:", error); // Log any errors
    console.log("Table does not exist, creating and seeding it with dummy data now...");
    await seed();
    const { rows: profiles } = await db.query("SELECT * FROM names ORDER BY \"createdAt\" DESC LIMIT 1");
    console.log("Loaded profile after seeding:", profiles[0]); // Log the data
    return {
      latestProfile: profiles[0] || {},
    };
  }
}

async function seed() {
  const client = await db.connect();
  await client.sql`CREATE TABLE IF NOT EXISTS names (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    address VARCHAR(255),
    energy_source VARCHAR(255),
    payment_method VARCHAR(255),
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );`;

  console.log(`Created "names" table`);

  const users = await Promise.all([
    client.sql`
      INSERT INTO names (name, email, address, energy_source, payment_method)
      VALUES ('Rohan', 'rohan@tcl.com', '123 Main St', 'Solar', 'Credit Card')
      ON CONFLICT (email) DO NOTHING;
    `,
    client.sql`
      INSERT INTO names (name, email, address, energy_source, payment_method)
      VALUES ('Rebecca', 'rebecca@tcl.com', '456 Oak Ave', 'Wind', 'PayPal')
      ON CONFLICT (email) DO NOTHING;
    `,
    client.sql`
      INSERT INTO names (name, email, address, energy_source, payment_method)
      VALUES ('Vivek', 'vivek@gmail.com', '789 Pine Rd', 'Hydro', 'Debit Card')
      ON CONFLICT (email) DO NOTHING;
    `,
  ]);
  console.log(`Seeded ${users.length} users`);

  return {
    users,
  };
}

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const client = await db.connect();

    const email = data.get("email")?.toString();
    const name = data.get("name")?.toString();
    const address = data.get("address")?.toString();
    const energy_source = data.get("energy_source")?.toString();
    const payment_method = data.get("payment_method")?.toString();

    try {
      await client.sql`
        INSERT INTO names (name, email, address, energy_source, payment_method)
        VALUES (${name}, ${email}, ${address}, ${energy_source}, ${payment_method})
        ON CONFLICT (email) DO UPDATE SET
          name = EXCLUDED.name,
          address = EXCLUDED.address,
          energy_source = EXCLUDED.energy_source,
          payment_method = EXCLUDED.payment_method;
      `;

      // Fetch the updated profile data
      const { rows: profiles } = await client.sql`
        SELECT * FROM names WHERE email = ${email}
      `;
      console.log("Profile updated:", profiles[0]); // Log the updated data

      return { 
        success: true,
        updatedProfile: profiles[0] || {},
      };
    } catch (error) {
      console.error("Error creating/updating profile:", error); // Log any errors
      return { success: false };
    }
  }
};
