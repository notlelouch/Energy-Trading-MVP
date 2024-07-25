<script lang="ts">
  // import Table from "$lib/Table.svelte";

  /** @type {import('./$types').PageData} */
  export let data;
  console.log("hello", data.names);

  /** @type {import('./$types').ActionData} */
  export let form;
</script>

<div
  class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center"
>
  <main class="flex-grow w-full max-w-lg p-6">
    <h2 class="text-4xl font-bold mb-4 text-white">Profile</h2>
    <form
      method="POST"
      action="?/create"
      class="bg-gray-800 p-8 rounded-lg shadow-lg"
    >
      <div class="mb-6">
        <label for="name" class="block text-sm font-medium text-gray-400 mb-2"
          >Name</label
        >
        <input
          type="text"
          id="name"
          name="name"
          placeholder="John Doe"
          class="block w-full py-3 px-4 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-200"
        />
      </div>
      <div class="mb-6">
        <label for="email" class="block text-sm font-medium text-gray-400 mb-2"
          >Email</label
        >
        <input
          type="email"
          id="email"
          name="email"
          placeholder="johndoe@gmail.com"
          class="block w-full py-3 px-4 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-200"
        />
      </div>
      <div class="mb-6">
        <label
          for="address"
          class="block text-sm font-medium text-gray-400 mb-2">Address</label
        >
        <input
          type="text"
          id="address"
          name="address"
          placeholder="chunabhatti, Btown"
          class="block w-full py-3 px-4 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-200"
        />
      </div>
      <div class="mb-6">
        <label
          for="energy_source"
          class="block text-sm font-medium text-gray-400 mb-2"
          >Energy Source</label
        >
        <input
          type="text"
          id="energy_source"
          name="energy_source"
          placeholder="Enter energy source"
          class="block w-full py-3 px-4 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-200"
        />
      </div>
      <div class="mb-6">
        <label
          for="payment_method"
          class="block text-sm font-medium text-gray-400 mb-2"
          >Payment Method</label
        >
        <input
          type="text"
          id="payment_method"
          name="payment_method"
          placeholder="UPI, PAYPAL, CASH, BITCOIN, etc"
          class="block w-full py-3 px-4 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-200"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
      >
        Save
      </button>
    </form>
    {#if form?.success}
      <p class="pt-2 text-center text-green-500">Updated User Profile!</p>
    {/if}
  </main>
</div>
