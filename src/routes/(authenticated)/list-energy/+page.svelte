<script>
  // JavaScript logic can be added here if necessary
</script>

<div
  class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center"
>
  <main class="flex-grow w-full max-w-3xl p-6">
    <section class="text-center my-12">
      <h2 class="text-4xl font-bold mb-4 text-white">
        List Your Energy for Sale
      </h2>
      <p class="text-lg mb-8 text-gray-300">
        Provide details about the energy you want to list for sale.
      </p>
      <form class="bg-gray-800 p-8 rounded-lg shadow-lg">
        <div class="mb-6">
          <label
            for="energy-type"
            class="block text-sm font-medium text-gray-400 mb-2"
          >
            Energy Type
          </label>
          <select
            id="energy-type"
            name="energy-type"
            class="block w-full py-3 px-4 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-200"
          >
            <option>Solar</option>
            <option>Wind</option>
            <option>Hydro</option>
          </select>
        </div>
        <div class="mb-6">
          <label
            for="quantity"
            class="block text-sm font-medium text-gray-400 mb-2"
          >
            Quantity (kWh)
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            class="block w-full py-3 px-4 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-200"
          />
        </div>
        <div class="mb-6">
          <label
            for="price"
            class="block text-sm font-medium text-gray-400 mb-2"
          >
            Price per Unit ($)
          </label>
          <input
            type="number"
            step="0.01"
            id="price"
            name="price"
            class="block w-full py-3 px-4 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-700 text-gray-200"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
        >
          Submit Listing
        </button>
      </form>
    </section>
  </main>
</div>
