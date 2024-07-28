import { createPool } from "@vercel/postgres";
import { POSTGRES_URL } from "$env/static/private";
import type { Actions, PageServerLoad } from "./$types";

const db = createPool({ connectionString: POSTGRES_URL });

async function seed() {
    const client = await db.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS energy_listings (
          listing_id SERIAL PRIMARY KEY,
          user_id VARCHAR(255) NOT NULL,
          energy_type VARCHAR(50) NOT NULL,
          quantity INT NOT NULL,
          price_per_unit NUMERIC(10, 2) NOT NULL,
          status VARCHAR(20) DEFAULT 'active',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log("Energy listings table created successfully");

    // Test query
    const testResult = await client.query('SELECT NOW()');
    console.log("Database connection test successful:", testResult.rows[0]);

  } catch (error) {
    console.error("Error during database operations:", error);
  } finally {
    client.release();
  }
}

seed().catch(error => console.error("Error during seeding:", error));


export const load: PageServerLoad = async ({ locals }) => {
    const user = locals.user;
  
    if (!user) {
      return { listings: [], error: "User not authenticated" };
    }
  
    try {
      const result = await db.query(
        "SELECT * FROM energy_listings WHERE user_id = $1",
        [user.id]
      );
  
      // Convert date fields to strings
      const listings = result.rows.map((listing) => ({
        ...listing,
        created_at: listing.created_at.toISOString()
      }));
  
      return { listings };
    } catch (error) {
      console.error("Error fetching energy listings:", error);
      return { listings: [], error: "Error fetching energy listings" };
    }
  };
  export const actions: Actions = {
    update: async ({ request, locals }) => {
      console.log("Update action started");
      const data = await request.formData();
      const energyType = data.get("energy-type");
      const quantity = data.get("quantity");
      const pricePerUnit = data.get("price");
  
      console.log("Received data:", { energyType, quantity, pricePerUnit });
  
      if (!locals.user) {
        console.log("User not authenticated");
        return { success: false, error: "User not authenticated" };
      }
  
      if (!energyType || !quantity || !pricePerUnit) {
        console.log("Missing required fields");
        return { success: false, error: "All fields are required." };
      }
  
      try {
        const userId = locals.user.email;
        console.log("Attempting to insert into database");
  
        const result = await db.query(
          `INSERT INTO energy_listings (user_id, energy_type, quantity, price_per_unit)
           VALUES ($1, $2, $3, $4) RETURNING *;`,
          [userId, energyType, quantity, pricePerUnit]
        );
  
        console.log("Database insert successful");
  
        const listing = result.rows[0];
        listing.created_at = listing.created_at.toISOString();
  
        const response = {
          success: true,
          message: "Energy listing created successfully.",
          listing
        };
  
        console.log("Sending response to client:", response);
        return response;
      } catch (error) {
        console.error("Error creating energy listing:", error);
        const errorResponse = { success: false, error: (error as Error).message || "Failed to create energy listing" };
        console.log("Sending error response to client:", errorResponse);
        return errorResponse;
      }
    }
  };