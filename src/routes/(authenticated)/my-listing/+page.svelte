<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import type { PageData } from './$types';
  
  export let data: PageData;

  $: ({ listings, error } = data);

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString();
  }

  function getStatusColor(status: string) {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'sold':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  }

  let selectedListing = null;
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 flex flex-col items-center p-4 sm:p-8">
  <main class="flex-grow w-full max-w-6xl">
    <h1 class="text-4xl sm:text-5xl font-bold mb-8 text-white text-center" in:fly="{{ y: -50, duration: 1000 }}">My Energy Listings</h1>

    {#if error}
      <p class="text-red-500 mb-4 text-center bg-gray-800 p-4 rounded-lg shadow-lg" in:fade>
        {error}
      </p>
    {/if}

    {#if listings.length === 0}
      <p class="text-gray-300 text-center text-lg bg-gray-800 p-6 rounded-lg shadow-lg" in:fade>
        You haven't created any energy listings yet.
      </p>
    {:else}
      <div class="bg-gray-800 rounded-xl shadow-2xl overflow-hidden" in:fade>
        <!-- Desktop view -->
        <div class="hidden lg:block overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-700">
                <th class="p-4 text-white font-semibold">Energy Type</th>
                <th class="p-4 text-white font-semibold">Quantity (kWh)</th>
                <th class="p-4 text-white font-semibold">Price per kWh</th>
                <th class="p-4 text-white font-semibold">Created</th>
                <th class="p-4 text-white font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {#each listings as listing}
                <tr class="border-t border-gray-700 hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                    on:click={() => selectedListing = listing}>
                  <td class="p-4 text-white">{listing.energy_type}</td>
                  <td class="p-4 text-white">{listing.quantity}</td>
                  <td class="p-4 text-white">${listing.price_per_unit}</td>
                  <td class="p-4 text-gray-300">{formatDate(listing.created_at)}</td>
                  <td class="p-4">
                    <span class="{getStatusColor(listing.status)} text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {listing.status}
                    </span>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>

        <!-- Mobile view -->
        <div class="lg:hidden space-y-4 p-4">
          {#each listings as listing}
            <div class="bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                 on:click={() => selectedListing = listing}>
              <h2 class="text-xl font-semibold mb-2 text-white">{listing.energy_type} Energy</h2>
              <p class="text-gray-300">Quantity: {listing.quantity} kWh</p>
              <p class="text-gray-300">Price: ${listing.price_per_unit} per kWh</p>
              <p class="text-gray-400 text-sm mt-2">Created: {formatDate(listing.created_at)}</p>
              <p class="mt-2 flex items-center">
                Status: 
                <span class="{getStatusColor(listing.status)} ml-2 px-2 py-1 rounded-full text-xs font-semibold text-white">
                  {listing.status}
                </span>
              </p>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </main>
</div>

{#if selectedListing}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" on:click|self={() => selectedListing = null} transition:fade>
    <div class="bg-gray-800 p-6 rounded-xl shadow-2xl max-w-md w-full" transition:fly="{{ y: 50, duration: 300 }}">
      <h2 class="text-2xl font-bold mb-4 text-white">{selectedListing.energy_type} Energy Listing</h2>
      <p class="text-gray-300 mb-2">Quantity: {selectedListing.quantity} kWh</p>
      <p class="text-gray-300 mb-2">Price: ${selectedListing.price_per_unit} per kWh</p>
      <p class="text-gray-400 text-sm mb-2">Created: {formatDate(selectedListing.created_at)}</p>
      <p class="mb-4 flex items-center">
        Status: 
        <span class="{getStatusColor(selectedListing.status)} ml-2 px-2 py-1 rounded-full text-xs font-semibold text-white">
          {selectedListing.status}
        </span>
      </p>
      <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
              on:click={() => selectedListing = null}>
        Close
      </button>
    </div>
  </div>
{/if}