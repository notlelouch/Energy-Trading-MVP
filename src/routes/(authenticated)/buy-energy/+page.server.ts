import { createPool } from "@vercel/postgres";
import { POSTGRES_URL } from "$env/static/private";
import type { PageServerLoad } from "./$types";
import * as NeucronSDK from "neucron-sdk";
import { session } from "$lib/stores/session";
import { get } from "svelte/store";

const db = createPool({ connectionString: POSTGRES_URL });

// Function to initialize the database
async function initializeDatabase() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS tracktransactions (
        transaction_id SERIAL PRIMARY KEY,
        listing_id INTEGER NOT NULL,
        buyer_id VARCHAR(255) NOT NULL,
        seller_id VARCHAR(255) NOT NULL,
        quantity DECIMAL(10, 2) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        status VARCHAR(20) NOT NULL,
        payment_txid VARCHAR(64) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("tracktransactions table created or already exists");
  } catch (error) {
    console.error("Error creating tracktransactions table:", error);
  }
}

// Call the initialization function
initializeDatabase();

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;

  if (!user) {
    return { listings: [], error: "User not authenticated" };
  }

  try {
    // // Deleting the listing for a specific user
    // const userIdToDelete = "anandharsh999@gmail.com";
    // await db.query(`DELETE FROM energy_listings WHERE user_id = $1`, [
    //   userIdToDelete,
    // ]);

    // console.log(`Listings for user_id ${userIdToDelete} deleted successfully.`);

    const result = await db.query(
      `SELECT *
       FROM energy_listings
       WHERE status = 'active'
       ORDER BY created_at DESC`
    );

    const listings = result.rows.map((listing) => ({
      ...listing,
      created_at: listing.created_at.toISOString(),
      price_per_unit: parseFloat(listing.price_per_unit).toFixed(2),
    }));

    return { listings };
  } catch (error) {
    console.error("Error fetching energy listings:", error);
    return { listings: [], error: "Error fetching energy listings" };
  }
};

export const actions = {
  purchase: async ({ request, locals }) => {
    const user = locals.user;
    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    const sessionData = get(session);

    const formData = await request.formData();
    const listingId = formData.get("listingId");

    const neucron =
      typeof NeucronSDK.default === "function"
        ? new NeucronSDK.default()
        : NeucronSDK;
    const authModule = neucron.authentication;

    try {
      const loginResponse = await authModule.login({
        email: sessionData.user?.email,
        password: sessionData.user?.password,
      });
      console.log(loginResponse);

      await db.query("BEGIN");

      try {
        const listingResult = await db.query(
          "SELECT * FROM energy_listings WHERE listing_id = $1 AND status = 'active' FOR UPDATE",
          [listingId]
        );

        if (listingResult.rows.length === 0) {
          throw new Error("Listing not available");
        }

        const listing = listingResult.rows[0];

        console.log("User ID:", user.id);
        console.log("Listing User ID:", listing.user_id);

        const options = {
          outputs: [
            {
              address: listing.user_id,
              note: "Energy Purchase",
              amount: listing.quantity * listing.price_per_unit,
            },
          ],
        };

        const payResponse = await neucron.pay.txSpend(options);

        if (payResponse.data.txid) {
          await db.query(
            "UPDATE energy_listings SET status = 'sold' WHERE listing_id = $1",
            [listingId]
          );

          await db.query(
            `INSERT INTO tracktransactions
            (listing_id, buyer_id, seller_id, quantity, price, status, payment_txid)
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
              listingId,
              user.id,
              listing.user_id,
              listing.quantity,
              listing.price_per_unit * listing.quantity,
              "completed",
              payResponse.data.txid,
            ]
          );

          await db.query("COMMIT");

          return { success: true, payment: payResponse.data.txid };
        } else {
          throw new Error("Payment failed");
        }
      } catch (error) {
        await db.query("ROLLBACK");
        console.error("Error in purchase process:", error);
        return {
          success: false,
          error: error.message || "Error purchasing energy listing",
        };
      }
    } catch (error) {
      console.error("Error in authentication or payment:", error);
      return {
        success: false,
        error: error.message || "Error processing purchase",
      };
    }
  },
};
