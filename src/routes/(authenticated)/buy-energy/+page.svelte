<!--
<script lang="ts">
  import type { PageData } from './$types';
  import { enhance } from '$app/forms';

  export let data: PageData;
  export let form: { success: boolean, error?: string, payment?: string } | null;

  $: ({ listings, error } = data);

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString();
  }
</script>

<h1>Buy Energy</h1>

{#if error}
  <p>{error}</p>
{/if}

{#if form}
  {#if form.success}
    <p>Purchase successful! Transaction ID: {form.payment}</p>
  {:else if form.error}
    <p>{form.error}</p>
  {/if}
{/if}

{#if listings.length === 0}
  <p>No energy listings available at the moment.</p>
{:else}
  <table>
    <thead>
      <tr>
        <th>Energy Type</th>
        <th>Quantity (kWh)</th>
        <th>Price per kWh</th>
        <th>Created</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {#each listings as listing}
        <tr>
          <td>{listing.energy_type}</td>
          <td>{listing.quantity}</td>
          <td>${listing.price_per_unit}</td>
          <td>{formatDate(listing.created_at)}</td>
          <td>
            <form method="POST" action="?/purchase" use:enhance>
              <input type="hidden" name="listingId" value={listing.listing_id}>
              <button type="submit">Buy</button>
            </form>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if} -->
<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";

  export let data: PageData;
  export let form: { success: boolean; error?: string } | null;

  $: ({ listings, error } = data);

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString();
  }

  let selectedListing = null;
</script>

<div class="min-h-screen bg-black text-white font-mono p-8 flex flex-col">
  <header class="mb-12">
    <h1 class="text-2xl font-light">BUY ENERGY</h1>
    <p class="text-sm text-gray-500">Available listings</p>
  </header>

  {#if error}
    <p class="text-red-500 mb-4" in:fade>{error}</p>
  {/if}

  {#if form}
    {#if form.success}
      <p class="text-green-500 mb-4" in:fade>
        Purchase successful!
        <a href="https://whatsonchain.com/tx/{form?.payment}" class="underline"
          >View transaction</a
        >
      </p>
    {:else if form.error}
      <p class="text-red-500 mb-4" in:fade>{form.error}</p>
    {/if}
  {/if}

  {#if listings.length === 0}
    <p class="text-gray-300 text-center" in:fade>
      No energy listings available at the moment.
    </p>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4" in:fade>
      {#each listings as listing}
        <div
          class="border border-white p-4 hover:bg-white hover:text-black transition-colors duration-300 group"
        >
          <h2 class="text-xl mb-2">{listing.energy_type} Energy</h2>
          <p class="text-sm text-gray-500 group-hover:text-gray-800">
            Quantity: {listing.quantity} kWh
          </p>
          <p class="text-sm text-gray-500 group-hover:text-gray-800">
            Price: ${listing.price_per_unit} per kWh
          </p>
          <p class="text-xs text-gray-500 group-hover:text-gray-800 mt-2">
            Created: {formatDate(listing.created_at)}
          </p>
          <form method="POST" action="?/purchase" use:enhance class="mt-4">
            <input type="hidden" name="listingId" value={listing.listing_id} />
            <button
              type="submit"
              class="w-full border border-current p-2 hover:bg-black hover:text-white transition-colors duration-300"
            >
              BUY
            </button>
          </form>
          <div
            class="mt-2 h-1 w-0 bg-black group-hover:w-full transition-all duration-300"
          />
        </div>
      {/each}
    </div>
  {/if}

  <footer class="mt-12 text-center text-xs text-gray-500">
    <p>© 2024 ENERGY TRADING MVP | ALL RIGHTS RESERVED</p>
  </footer>
</div>

<style>
  :global(body) {
    background-color: black;
  }
</style>
