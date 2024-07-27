// import { createPool, sql } from "@vercel/postgres";
// import { POSTGRES_URL } from "$env/static/private";

// export async function load() {
//   const db = createPool({ connectionString: POSTGRES_URL });

//   try {
//     const { rows: names } = await db.query("SELECT * FROM names");
//     return {
//       names: names,
//     };
//   } catch (error) {
//     console.log(
//       "Table does not exist, creating and seeding it with dummy data now...",
//     );
//     // Table is not created yet
//     await seed();
//     const { rows: names } = await db.query("SELECT * FROM names");
//     return {
//       names: names,
//     };
//   }
// }

// async function seed() {
//   const db = createPool({ connectionString: POSTGRES_URL });
//   const client = await db.connect();
//   await client.sql`CREATE TABLE IF NOT EXISTS names (
//       id SERIAL PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email VARCHAR(255) UNIQUE NOT NULL,
//       address VARCHAR(255),
//       energy_source VARCHAR(255),
//       payment_method VARCHAR(255),
//       "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//     );`;

//   console.log(`Created "names" table`);

//   const users = await Promise.all([
//     client.sql`
//           INSERT INTO names (name, email, address, energy_source, payment_method)
//           VALUES ('Rohan', 'rohan@tcl.com', '123 Main St', 'Solar', 'Credit Card')
//           ON CONFLICT (email) DO NOTHING;
//       `,
//     client.sql`
//           INSERT INTO names (name, email, address, energy_source, payment_method)
//           VALUES ('Rebecca', 'rebecca@tcl.com', '456 Oak Ave', 'Wind', 'PayPal')
//           ON CONFLICT (email) DO NOTHING;
//       `,
//     client.sql`
//           INSERT INTO names (name, email, address, energy_source, payment_method)
//           VALUES ('Vivek', 'vivek@gmail.com', '789 Pine Rd', 'Hydro', 'Debit Card')
//           ON CONFLICT (email) DO NOTHING;
//       `,
//   ]);
//   console.log(`Seeded ${users.length} users`);

//   return {
//     users,
//   };
// }

// /** @type {import('./$types').Actions} */
// export const actions = {
//   update: async ({ request }) => {
//     const data = await request.formData();
//     const db = createPool({ connectionString: POSTGRES_URL });
//     const client = await db.connect();

//     const email = data.get("email");
//     const name = data.get("name");
//     const address = data.get("address");
//     const energy_source = data.get("energy_source");
//     const payment_method = data.get("payment_method");
//     const id = data.get("id");

//     if (
//       typeof email !== "string" ||
//       typeof name !== "string" ||
//       typeof address !== "string" ||
//       typeof energy_source !== "string" ||
//       typeof payment_method !== "string" ||
//       typeof id !== "string"
//     ) {
//       return { success: false, error: "Invalid form data" };
//     }

//     await client.sql`
//      UPDATE names
//      SET name = ${name}, email = ${email}, address = ${address}, energy_source = ${energy_source}, payment_method = ${payment_method}
//      WHERE id = ${id};`;

//     return { success: true };
//   },

//   delete: async ({ request }) => {
//     const data = await request.formData();
//     const db = createPool({ connectionString: POSTGRES_URL });
//     const client = await db.connect();

//     const id = Number(data.get("id"));

//     await client.sql`
//     DELETE FROM names
//     WHERE id = ${id};`;

//     return { success: true };
//   },

//   create: async ({ request }) => {
//     const data = await request.formData();
//     const db = createPool({ connectionString: POSTGRES_URL });
//     const client = await db.connect();

//     const email = data.get("email")?.toString();
//     const name = data.get("name")?.toString();
//     const address = data.get("address")?.toString();
//     const energy_source = data.get("energy_source")?.toString();
//     const payment_method = data.get("payment_method")?.toString();

//     await client.sql`
//       INSERT INTO names (name, email, address, energy_source, payment_method)
//       VALUES (${name}, ${email}, ${address}, ${energy_source}, ${payment_method})
//       ON CONFLICT (email) DO NOTHING;
//     `;
//     return { success: true };
//   },
// };

// // INSERT INTO names (paymail) values = "something@neucron.com" where name={user.name}  and email={user.email}
