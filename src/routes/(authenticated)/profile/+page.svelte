 <script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { get } from "svelte/store";
  import { updateUser } from "$lib/stores/session";
  
  let name = "";
  let email = "";
  let address = "";
  let energySourceDetails = "";
  let paymentMethod = "";
  let successMessage = "";
  let errorMessage = "";
  let isEditing = false;
  
  onMount(() => {
    const data = get(page).data;
    if (data.user) {
      name = data.user.name || "";
      email = data.user.email || "";
      address = data.user.address || "";
      energySourceDetails = data.user.energy_source_details || "";
      paymentMethod = data.user.payment_method || "";
    }
  });

  function toggleEdit() {
    isEditing = !isEditing;
    if (!isEditing) {
      const data = get(page).data;
      if (data.user) {
        address = data.user.address || "";
        energySourceDetails = data.user.energy_source_details || "";
        paymentMethod = data.user.payment_method || "";
      }
    }
  }

  async function saveProfile(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('/profile?/update', { method: 'POST', body: formData });
      const result = await response.json();
      
      if (result.data.success) {
        successMessage = result.message || "Profile updated successfully.";
        errorMessage = "";
        address = formData.get('address') as string;
        energySourceDetails = formData.get('energySourceDetails') as string;
        paymentMethod = formData.get('paymentMethod') as string;
        updateUser({ name, email, address, energy_source_details: energySourceDetails, payment_method: paymentMethod });
        isEditing = false;
      } else {
        successMessage = "";
        errorMessage = result.error || "Failed to update profile. Please try again.";
      }
    } catch (error) {
      successMessage = "";
      errorMessage = `Unexpected error: ${error instanceof Error ? error.message : String(error)}`;
    }
  }
</script>




<!-- 
<div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
  <div class="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
    <div class="p-8">
      <h2 class="text-3xl font-bold text-white mb-6">Profile</h2>
      
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
      
      <form on:submit={saveProfile} class="space-y-6">
        <div class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-400 mb-1">Name</label>
            <input type="text" id="name" name="name" bind:value={name} readonly class="w-full py-2 px-3 rounded-md bg-gray-700 text-gray-300 border-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-inner" />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <input type="email" id="email" name="email" bind:value={email} readonly class="w-full py-2 px-3 rounded-md bg-gray-700 text-gray-300 border-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-inner" />
          </div>
          <div>
            <label for="address" class="block text-sm font-medium text-gray-400 mb-1">Address</label>
            <input type="text" id="address" name="address" bind:value={address} placeholder="Enter your address" class="w-full py-2 px-3 rounded-md bg-gray-700 text-gray-300 border-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-inner" disabled={!isEditing} />
          </div>
          <div>
            <label for="energySourceDetails" class="block text-sm font-medium text-gray-400 mb-1">Energy Source</label>
            <input type="text" id="energySourceDetails" name="energySourceDetails" bind:value={energySourceDetails} placeholder="Enter energy source details" class="w-full py-2 px-3 rounded-md bg-gray-700 text-gray-300 border-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-inner" disabled={!isEditing} />
          </div>
          <div>
            <label for="paymentMethod" class="block text-sm font-medium text-gray-400 mb-1">Payment Method</label>
            <input type="text" id="paymentMethod" name="paymentMethod" bind:value={paymentMethod} placeholder="Enter payment method" class="w-full py-2 px-3 rounded-md bg-gray-700 text-gray-300 border-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-inner" disabled={!isEditing} />
          </div>
        </div>
        <div class="flex justify-end space-x-3">
          {#if isEditing}
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200 text-sm font-medium">
              Save
            </button>
            <button type="button" on:click={toggleEdit} class="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200 text-sm font-medium">
              Cancel
            </button>
          {:else}
            <button type="button" on:click={toggleEdit} class="font-semibold px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200 font-medium">
              Edit
            </button>
          {/if}
        </div>
      </form>
    </div>
  </div>
</div> -->




<div class="min-h-screen bg-black text-white font-mono p-8 flex flex-col">
  <header class="mb-12">
    <h1 class="text-2xl font-light">ENERGY TRADING MVP</h1>
    <p class="text-sm text-gray-500">Profile Settings</p>
  </header>

  <div class="flex-grow">
    <form on:submit={saveProfile} class="space-y-6 max-w-md mx-auto">
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
        <div>
          <label for="name" class="block text-sm text-gray-500 mb-1">NAME</label>
          <input type="text" id="name" name="name" bind:value={name} readonly 
                 class="w-full py-2 px-3 bg-black text-white border border-gray-700 focus:border-white focus:outline-none transition-colors" />
        </div>
        <div>
          <label for="email" class="block text-sm text-gray-500 mb-1">EMAIL</label>
          <input type="email" id="email" name="email" bind:value={email} readonly 
                 class="w-full py-2 px-3 bg-black text-white border border-gray-700 focus:border-white focus:outline-none transition-colors" />
        </div>
        <div>
          <label for="address" class="block text-sm text-gray-500 mb-1">ADDRESS</label>
          <input type="text" id="address" name="address" bind:value={address} placeholder="Enter your address" 
                 class="w-full py-2 px-3 bg-black text-white border border-gray-700 focus:border-white focus:outline-none transition-colors" 
                 disabled={!isEditing} />
        </div>
        <div>
          <label for="energySourceDetails" class="block text-sm text-gray-500 mb-1">ENERGY SOURCE</label>
          <input type="text" id="energySourceDetails" name="energySourceDetails" bind:value={energySourceDetails} 
                 placeholder="Enter energy source details" 
                 class="w-full py-2 px-3 bg-black text-white border border-gray-700 focus:border-white focus:outline-none transition-colors" 
                 disabled={!isEditing} />
        </div>
        <div>
          <label for="paymentMethod" class="block text-sm text-gray-500 mb-1">PAYMENT METHOD</label>
          <input type="text" id="paymentMethod" name="paymentMethod" bind:value={paymentMethod} 
                 placeholder="Enter payment method" 
                 class="w-full py-2 px-3 bg-black text-white border border-gray-700 focus:border-white focus:outline-none transition-colors" 
                 disabled={!isEditing} />
        </div>
      </div>

      <div class="flex justify-end space-x-3">
        {#if isEditing}
          <button type="submit" 
                  class="px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300">
            SAVE
          </button>
          <button type="button" on:click={toggleEdit} 
                  class="px-6 py-2 border border-gray-700 text-gray-700 hover:border-white hover:text-white transition-colors duration-300">
            CANCEL
          </button>
        {:else}
          <button type="button" on:click={toggleEdit} 
                  class="px-6 py-2 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300">
            EDIT
          </button>
        {/if}
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
</style>