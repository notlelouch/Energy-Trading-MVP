

<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { updateUser } from "$lib/stores/session";
    
    let name = $page.data.user?.name || "";
    let email = $page.data.user?.email || "";
    let address = "";
    let energySourceDetails = "";
    let paymentMethod = "";
    let successMessage = "";
    let errorMessage = "";
    
    onMount(() => {
      const user = get(session).user;
      if (user) {
        name = user.name || "";
        email = user.email || "";
       //address = user.address || "";
      }
      //console.log("hellooo hiiiii bihtchesssssss: ", user?.address);
      address = $page.data.user?.address || "";
      energySourceDetails = $page.data.user?.energy_source_details || "";
      paymentMethod = $page.data.user?.payment_method || "";
    });
  
    async function saveProfile(event: SubmitEvent) {
      event.preventDefault();
      
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      
      try {
        const response = await fetch('/profile?/update', {
          method: 'POST',
          body: formData
        });
        
        const result = await response.json();
        
        if (result.data.success) {
          successMessage = result.message || "Profile updated successfully.";
          errorMessage = "";
          address = formData.get('address') as string;
          energySourceDetails = formData.get('energySourceDetails') as string;
          paymentMethod = formData.get('paymentMethod') as string;
          updateUser({ name, email, address, energy_source_details: energySourceDetails, payment_method: paymentMethod });
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
  
  <div class="min-h-screen bg-gray-100 flex flex-col items-center py-8">
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
      <h2 class="text-2xl font-bold mb-4 text-center">Profile</h2>
      
      {#if successMessage}
        <p class="text-green-600 text-center mb-4">{successMessage}</p>
      {/if}
      {#if errorMessage}
        <p class="text-red-600 text-center mb-4">{errorMessage}</p>
      {/if}
      
      <form on:submit={saveProfile} class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" id="name" name="name" bind:value={name} readonly class="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-100" />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" name="email" bind:value={email} readonly class="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm bg-gray-100" />
        </div>
        <div>
          <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
          <input type="text" id="address" name="address" bind:value={address} placeholder="Enter your address" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
        </div>
        <div>
          <label for="energySourceDetails" class="block text-sm font-medium text-gray-700">Energy Source Details</label>
          <input type="text" id="energySourceDetails" name="energySourceDetails" bind:value={energySourceDetails} placeholder="Enter your energy source details" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
        </div>
        <div>
          <label for="paymentMethod" class="block text-sm font-medium text-gray-700">Payment Method</label>
          <input type="text" id="paymentMethod" name="paymentMethod" bind:value={paymentMethod} placeholder="Enter your payment method" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm" />
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">Save Profile</button>
      </form>
    </div>
  </div>
  
  