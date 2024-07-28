<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { PageData } from './$types';
  
  export let data: PageData;

  $: ({ transactions, error } = data);

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString();
  }

  function getStatusColor(status: string) {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-500';
      case 'pending':
        return 'text-yellow-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  }
</script>

<div class="min-h-screen bg-black text-white font-mono p-8 flex flex-col">
  <main class="flex-grow">
    <h1 class="text-2xl font-light mb-8">TRANSACTION HISTORY</h1>

    {#if error}
      <p class="text-red-500 mb-4 bg-gray-800 p-4 rounded-lg" in:fade>
        {error}
      </p>
    {/if}

    {#if transactions.length === 0}
      <p class="text-gray-300 text-lg bg-gray-800 p-6 rounded-lg" in:fade>
        No transactions found.
      </p>
    {:else}
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-gray-700">
              <th class="p-4 text-white font-normal">Date</th>
              <th class="p-4 text-white font-normal">Energy Type</th>
              <th class="p-4 text-white font-normal">Quantity (kWh)</th>
              <th class="p-4 text-white font-normal">Price</th>
              <th class="p-4 text-white font-normal">Status</th>
              <th class="p-4 text-white font-normal">Payment</th>
            </tr>
          </thead>
          <tbody>
            {#each transactions as transaction}
              <tr class="border-b border-gray-700 hover:bg-gray-900 transition-colors duration-200">
                <td class="p-4 text-white">{formatDate(transaction.created_at)}</td>
                <td class="p-4 text-white">{transaction.energy_type}</td>
                <td class="p-4 text-white">{transaction.quantity}</td>
                <td class="p-4 text-white">${transaction.price}</td>
                <td class="p-4">
                  <span class={getStatusColor(transaction.status)}>
                    {transaction.status}
                  </span>
                </td>
                <td class="p-4 text-white">
                  {#if transaction.payment_txid}
                    <a href={`https://whatsonchain.com/tx/${transaction.payment_txid}`} target="_blank" rel="noopener noreferrer" class="text-green-400 hover:underline">
                      View Transaction
                    </a>
                  {:else}
                    N/A
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </main>

  <footer class="mt-12 text-center text-xs text-gray-500">
    <p>© 2024 ENERGY TRADING MVP | ALL RIGHTS RESERVED</p>
  </footer>
</div>

<style>
  :global(body) {
    background-color: black;
  }
</style>