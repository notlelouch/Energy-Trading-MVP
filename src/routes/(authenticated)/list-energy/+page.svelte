<script lang="ts">
  let energyType = "Solar";
  let quantity = "";
  let pricePerUnit = "";
  let successMessage = "";
  let errorMessage = "";
 

  async function submitListing(event: Event) {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  console.log("Submitting form data:", Object.fromEntries(formData));

  try {
    const response = await fetch('/list-energy?/update', {
      method: 'POST',
      body: formData
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", Object.fromEntries(response.headers));

    const result = await response.json();
    console.log("Server response:", result);

    if (result.data.success) {
      successMessage = result.message || "Listed energy successfully.";
      errorMessage = "";
      resetForm();
    } else {
      successMessage = "";
      errorMessage = result.error || "Failed to create energy listing. Please try again.";
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    successMessage = "";
    errorMessage = "Error communicating with the server.";
  }
}

function resetForm() {
    energyType = "Solar";
    quantity = "";
    pricePerUnit = "";
  }
</script>


<!-- 
<div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
  <div class="w-full max-w-lg bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
    <div class="p-8">
      <h2 class="text-3xl font-extrabold text-white mb-6 text-center">List Your Energy for Sale</h2>
      
      {#if successMessage}
        <div class="mb-4 py-2 px-3 bg-green-500 bg-opacity-20 border-l-4 border-green-500 rounded">
          <p class="text-green-400 text-sm">{successMessage}</p>
        </div>
      {/if}
      {#if errorMessage}
        <div class="mb-4 py-2 px-3 bg-red-500 bg-opacity-20 border-l-4 border-red-500 rounded">
          <p class="text-red-400 text-sm">{errorMessage}</p>
        </div>
      {/if}
      
      <form on:submit|preventDefault={submitListing} class="space-y-6">
        <div class="space-y-4">
          <div class="relative">
            <label for="energy-type" class="block text-sm font-medium text-gray-300 mb-2">Energy Type</label>
            <select
              id="energy-type"
              name="energy-type"
              bind:value={energyType}
              class="block w-full py-3 px-4 rounded-md bg-gray-700 text-gray-200 border-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-inner"
            >
              <option value="Solar">Solar</option>
              <option value="Wind">Wind</option>
              <option value="Hydropower">Hydropower</option>
              <option value="Nuclear">Nuclear</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Gas">Gas</option>
              <option value="Geothermal">Geothermal</option>
              <option value="Electrical">Electrical</option>
            </select>
          </div>
          <div class="relative">
            <label for="quantity" class="block text-sm font-medium text-gray-300 mb-2">Quantity (kWh)</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              bind:value={quantity}
              class="block w-full py-3 px-4 rounded-md bg-gray-700 text-gray-200 border-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-inner"
            />
          </div>
          <div class="relative">
            <label for="price" class="block text-sm font-medium text-gray-300 mb-2">Price per Unit ($)</label>
            <input
              type="number"
              step="0.01"
              id="price"
              name="price"
              bind:value={pricePerUnit}
              class="block w-full py-3 px-4 rounded-md bg-gray-700 text-gray-200 border-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-inner"
            />
          </div>
        </div>
        <div class="flex justify-center mt-6">

          <button
            type="submit"
            class="font-semibold px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200 font-medium"
          >
            Submit Listing
          </button>
        </div>
      </form>
    </div>
  </div>
</div> -->




<div class="min-h-screen bg-black text-white font-mono p-8 flex flex-col">
  <header class="mb-12">
    <h1 class="text-2xl font-light">ENERGY TRADING MVP</h1>
    <p class="text-sm text-gray-500">List Your Energy</p>
  </header>

  <div class="flex-grow">
    <form on:submit={submitListing} class="space-y-6 max-w-md mx-auto">
      {#if successMessage}
        <div class="mb-4 py-2 px-3 border-l-4 border-green-500">
          <p class="text-green-500 text-sm">{successMessage}</p>
        </div>
      {/if}
      {#if errorMessage}
        <div class="mb-4 py-2 px-3 border-l-4 border-red-500">
          <p class="text-red-500 text-sm">{errorMessage}</p>
        </div>
      {/if}

      <div class="space-y-4">
        <div class="relative">
          <label for="energy-type" class="block text-sm text-gray-500 mb-1">ENERGY TYPE</label>
          <select
            id="energy-type"
            name="energy-type"
            bind:value={energyType}
            class="w-full py-2 px-3 bg-black text-white border border-gray-700 focus:border-white focus:outline-none transition-colors appearance-none"
          >
            <option value="Solar">Solar</option>
            <option value="Wind">Wind</option>
            <option value="Hydropower">Hydropower</option>
            <option value="Nuclear">Nuclear</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Gas">Gas</option>
            <option value="Geothermal">Geothermal</option>
            <option value="Electrical">Electrical</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
        <div>
          <label for="quantity" class="block text-sm text-gray-500 mb-1">QUANTITY (kWh)</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            bind:value={quantity}
            class="w-full py-2 px-3 bg-black text-white border border-gray-700 focus:border-white focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label for="price" class="block text-sm text-gray-500 mb-1">PRICE PER UNIT ($)</label>
          <input
            type="number"
            step="0.01"
            id="price"
            name="price"
            bind:value={pricePerUnit}
            class="w-full py-2 px-3 bg-black text-white border border-gray-700 focus:border-white focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div class="flex justify-end mt-6">
        <button
          type="submit"
          class="px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300"
        >
          SUBMIT LISTING
        </button>
      </div>
    </form>
  </div>

  <footer class="mt-12 text-center text-xs text-gray-500 flex flex-col items-center">
    <p>© 2024 ENERGY TRADING MVP | ALL RIGHTS RESERVED</p>
    <nav class="mt-2">
      <a href="/about" class="hover:underline text-green-500">About Us</a>
      <span class="mx-2">|</span>
      <a href="/contact" class="hover:underline text-green-500">Contact Us</a>
    </nav>
  </footer>
</div>

<style>
  :global(body) {
    background-color: black;
  }
  
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
  }
</style>