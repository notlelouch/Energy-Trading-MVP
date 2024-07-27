<script>
  // JavaScript logic can be added here if necessary
  export let form;
</script>

<div
  class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center"
>
  <main class="flex-grow w-full max-w-4xl p-6">
    <section class="text-center my-12">
      <h2 class="text-4xl font-bold mb-4 text-white">Browse and Buy Energy</h2>
      <p class="text-lg mb-8 text-gray-300">
        Explore available energy listings and make a purchase.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <!-- Example listing, repeat for actual data -->
        <form id="1" method="POST" action="?/pay" class="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 class="text-2xl font-bold mb-2 text-blue-100">Solar Energy</h3>
          <p class="text-gray-300">Quantity: 1000 kWh</p>
          <p class="text-gray-300">Price per Unit: $0.10</p>
          <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="amount"
        >
          amount
        </label>
        <input
          class="appearance-none block w-full bg-gray-200 text-gray-300 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="amount"
          type="text"
          placeholder="Enter amount"
          name="amount"
        />
        <label
        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
        for="paymail"
      >
        Paymail
      </label>
      <input
        class="appearance-none block w-full bg-gray-200 text-gray-300 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="paymail"
        type="text"
        placeholder="Enter paymail"
        name="paymail"
      />
      <button type="submit" class="bg-blue-600 text-white py-2 px-4 rounded-full mt-4 inline-block hover:bg-blue-700 transition duration-300">Buy Now</button>
      {#if form?.success}
      <!-- this message is ephemeral; it exists because the page was rendered in
         response to a form submission. it will vanish if the user reloads -->
      <p class="pt-2">The payment was successful. Here is your <a href="https://whatsonchain.com/tx/{form?.payment}">transaction</a>!</p>
    {/if}
        </form>


        <!-- Repeat above block for each listing -->
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 class="text-2xl font-bold mb-2 text-blue-100">Wind Energy</h3>
          <p class="text-gray-300">Quantity: 1000 kWh</p>
          <p class="text-gray-300">Price per Unit: $5</p>
          <a
            href="/buy-energy/details"
            class="bg-blue-600 text-white py-2 px-4 rounded-full mt-4 inline-block hover:bg-blue-700 transition duration-300"
          >
            Buy Now
          </a>
        </div>
        <!-- Repeat above block for each listing -->
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 class="text-2xl font-bold mb-2 text-blue-100">Hydrogen Energy</h3>
          <p class="text-gray-300">Quantity: 1000 kWh</p>
          <p class="text-gray-300">Price per Unit: $10</p>
          <a
            href="/buy-energy/details"
            class="bg-blue-600 text-white py-2 px-4 rounded-full mt-4 inline-block hover:bg-blue-700 transition duration-300"
          >
            Buy Now
          </a>
        </div>
        <!-- Repeat above block for each listing -->
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 class="text-2xl font-bold mb-2 text-blue-100">Electric Energy</h3>
          <p class="text-gray-300">Quantity: 1000 kWh</p>
          <p class="text-gray-300">Price per Unit: $1</p>
          <a
            href="/buy-energy"
            class="bg-blue-600 text-white py-2 px-4 rounded-full mt-4 inline-block hover:bg-blue-700 transition duration-300"
          >
            Buy Now
          </a>
        </div>
        <!-- Repeat above block for each listing -->
      </div>
    </section>
  </main>
</div>
