// src/routes/(authenticated)/my-listings/page.server.ts

import { createPool } from "@vercel/postgres";
import { POSTGRES_URL } from "$env/static/private";
import type { PageServerLoad } from "./$types";

const db = createPool({ connectionString: POSTGRES_URL });

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;

  if (!user) {
    return { listings: [], error: "User not authenticated" };
  }

  try {
    const result = await db.query(
      "SELECT * FROM energy_listings WHERE user_id = $1 ORDER BY created_at DESC",
      [user.email]
    );

    // Convert date fields to strings and format the price
    const listings = result.rows.map((listing) => ({
      ...listing,
      created_at: listing.created_at.toISOString(),
      price_per_unit: parseFloat(listing.price_per_unit).toFixed(2)
    }));

    return { listings };
  } catch (error) {
    console.error("Error fetching energy listings:", error);
    return { listings: [], error: "Error fetching energy listings" };
  }
};