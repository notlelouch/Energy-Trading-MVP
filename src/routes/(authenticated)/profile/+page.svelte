<script lang="ts">
  import { session } from "$lib/stores/session";
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';

  /** @type {import('./$types').PageData} */
  export let data;
  console.log("hello", data.names);

  /** @type {import('./$types').ActionData} */
  export let form;

  let address = '';
  let energy_source = '';
  let payment_method = '';
  let isReadOnly = false;
  let successMessage = '';

  // Initialize input fields from session store
  onMount(() => {
    const sessionData: any = get(session);
    address = sessionData.user.address || '';
    energy_source = sessionData.user.energy_source || '';
    payment_method = sessionData.user.payment_method || '';
  });

  function toggleReadOnly() {
    if (isReadOnly) {
      // Save the form data to the session store
      session.update(current => {
        if (current && current.user) {
          current.user.address = address;
          current.user.energy_source = energy_source;
          current.user.payment_method = payment_method;
        }
        return current;
      });
      successMessage = 'Data saved successfully!';
    }
    isReadOnly = !isReadOnly;
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center">
  <main class="flex-grow w-full max-w-lg p-6">
    <h2 class="text-4xl font-bold mb-4 text-white">Profile</h2>
    <form class="bg-gray-800 p-8 rounded-lg shadow-lg" method="get">
      <div class="mb-6">
        <label for="name" class="block text-sm font-medium text-gray-400 mb-2">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          bind:value={$session.user.name}
          readonly={isReadOnly}
          class="block inactive w-full py-3 px-4 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-200"
        />
      </div>
      <div class="mb-6">
        <label for="email" class="block text-sm font-medium text-gray-400 mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          bind:value={$session.user.email}
          readonly={isReadOnly}
          class="block w-full py-3 px-4 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-200"
        />
      </div>
      <div class="mb-6">
        <label for="address" class="block text-sm font-medium text-gray-400 mb-2">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          bind:value={address}
          readonly={isReadOnly}
          class="block w-full py-3 px-4 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-200"
        />
      </div>
      <div class="mb-6">
        <label for="energy_source" class="block text-sm font-medium text-gray-400 mb-2">Energy Source</label>
        <input
          type="text"
          id="energy_source"
          name="energy_source"
          bind:value={energy_source}
          readonly={isReadOnly}
          class="block w-full py-3 px-4 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-200"
        />
      </div>
      <div class="mb-6">
        <label for="payment_method" class="block text-sm font-medium text-gray-400 mb-2">Payment Method</label>
        <input
          type="text"
          id="payment_method"
          name="payment_method"
          bind:value={payment_method}
          readonly={isReadOnly}
          class="block w-full py-3 px-4 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-200"
        />
      </div>
      <button
        type="button"
        class="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
        on:click={toggleReadOnly}
      >
        {isReadOnly ? 'Edit' : 'Save'}
      </button>
    </form>
    {#if successMessage}
      <p class="pt-2 text-center text-green-500">{successMessage}</p>
    {/if}
  </main>
</div>

<style>
  .min-h-screen {
    min-height: 100vh;
  }
</style>
