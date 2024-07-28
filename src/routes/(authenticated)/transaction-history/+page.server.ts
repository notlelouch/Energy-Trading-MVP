import { createPool } from "@vercel/postgres";
import { POSTGRES_URL } from "$env/static/private";
import type { PageServerLoad } from "./$types";

const db = createPool({ connectionString: POSTGRES_URL });

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;

  if (!user) {
    return { transactions: [], error: "User not authenticated" };
  }

  try {
    const result = await db.query(
      `SELECT 
        t.transaction_id,
        t.listing_id,
        t.buyer_id,
        t.seller_id,
        t.quantity,
        t.price,
        t.status,
        t.payment_txid,
        t.created_at,
        e.energy_type
      FROM 
        tracktransactions t
      JOIN 
        energy_listings e ON t.listing_id = e.listing_id
      WHERE 
        t.buyer_id = $1 OR t.seller_id = $1
      ORDER BY 
        t.created_at DESC`,
      [user.id]
    );

    const transactions = result.rows.map((transaction) => ({
      ...transaction,
      created_at: transaction.created_at.toISOString(),
      price: parseFloat(transaction.price).toFixed(2)
    }));

    return { transactions };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return { transactions: [], error: "Error fetching transactions" };
  }
};