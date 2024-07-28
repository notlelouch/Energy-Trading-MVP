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
          <!-- <button
            type="submit"
            class="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-full hover:bg-gradient-to-l hover:from-teal-600 hover:to-blue-600 hover:shadow-xl hover:scale-105 hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 active:scale-95 transition-all duration-300 font-semibold shadow-lg"
          > -->
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
</div>
