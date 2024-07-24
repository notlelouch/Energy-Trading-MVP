<script lang="ts">
    // import { onMount } from "svelte";
    // import { page } from "$app/stores";

    /** @type {import('./$types').PageData} */
    export let latestProfile;

    /** @type {import('./$types').ActionData} */
    export let form;

    let isEditMode = true;  // Initially in edit mode
    let profileData = {
        name: '',
        email: '',
        address: '',
        energy_source: '',
        payment_method: ''
    };

    let errors: Partial<Record<keyof typeof profileData, string>> = {};

    // Update profile data if form submission is successful
    if (form?.success) {
        isEditMode = false;
        profileData = {
            name: form?.updatedProfile?.name || '',
            email: form?.updatedProfile?.email || '',
            address: form?.updatedProfile?.address || '',
            energy_source: form?.updatedProfile?.energy_source || '',
            payment_method: form?.updatedProfile?.payment_method || ''
        };
    } else {
        // Display the latest profile data from load function
        profileData = {
            name: latestProfile?.name || '',
            email: latestProfile?.email || '',
            address: latestProfile?.address || '',
            energy_source: latestProfile?.energy_source || '',
            payment_method: latestProfile?.payment_method || ''
        };
    }

    function validateForm() {
        errors = {};
        let isValid = true;

        if (!profileData.name) {
            errors.name = "Name is required.";
            isValid = false;
        }
        if (!profileData.email) {
            errors.email = "Email is required.";
            isValid = false;
        }
        if (!profileData.address) {
            errors.address = "Address is required.";
            isValid = false;
        }
        if (!profileData.energy_source) {
            errors.energy_source = "Energy source is required.";
            isValid = false;
        }
        if (!profileData.payment_method) {
            errors.payment_method = "Payment method is required.";
            isValid = false;
        }

        return isValid;
    }

    async function handleSubmit(event: Event) {
        event.preventDefault();

        if (validateForm()) {
            const form = event.target as HTMLFormElement;
            form.submit();
        }
    }
</script>

<style>
    .profile-details {
        background: #f9f9f9;
        padding: 1rem;
        border-radius: 8px;
        margin-top: 1rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .profile-item {
        margin-bottom: 1rem;
    }
    .profile-item span {
        font-weight: bold;
        display: block;
    }
    .error {
        color: red;
        font-size: 0.875rem;
    }
</style>

<div class="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 class="text-2xl font-bold mb-4 text-center">{isEditMode ? "Profile Details" : "Your Profile"}</h2>
        {#if isEditMode}
            <form method="POST" action="?/create" on:submit|preventDefault={handleSubmit}>
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                    <input bind:value={profileData.name} type="text" id="name" name="name" placeholder="John Doe" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    {#if errors.name}
                        <p class="error">{errors.name}</p>
                    {/if}
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input bind:value={profileData.email} type="email" id="email" name="email" placeholder="johndoe@gmail.com" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    {#if errors.email}
                        <p class="error">{errors.email}</p>
                    {/if}
                </div>
                <div class="mb-4">
                    <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                    <input bind:value={profileData.address} type="text" id="address" name="address" placeholder="chunabhatti, Btown" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    {#if errors.address}
                        <p class="error">{errors.address}</p>
                    {/if}
                </div>
                <div class="mb-4">
                    <label for="energy_source" class="block text-sm font-medium text-gray-700">Energy Source</label>
                    <input bind:value={profileData.energy_source} type="text" id="energy_source" name="energy_source" placeholder="Enter energy source" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    {#if errors.energy_source}
                        <p class="error">{errors.energy_source}</p>
                    {/if}
                </div>
                <div class="mb-4">
                    <label for="payment_method" class="block text-sm font-medium text-gray-700">Payment Method</label>
                    <input bind:value={profileData.payment_method} type="text" id="payment_method" name="payment_method" placeholder="UPI, PAYPAL, CASH, BITCOIN, etc" class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    {#if errors.payment_method}
                        <p class="error">{errors.payment_method}</p>
                    {/if}
                </div>
                <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-full w-full hover:bg-blue-700">Save</button>
            </form>
        {:else}
            <div class="profile-details">
                <div class="profile-item">
                    <span>Name:</span>
                    <p>{profileData.name}</p>
                </div>
                <div class="profile-item">
                    <span>Email:</span>
                    <p>{profileData.email}</p>
                </div>
                <div class="profile-item">
                    <span>Address:</span>
                    <p>{profileData.address}</p>
                </div>
                <div class="profile-item">
                    <span>Energy Source:</span>
                    <p>{profileData.energy_source}</p>
                </div>
                <div class="profile-item">
                    <span>Payment Method:</span>
                    <p>{profileData.payment_method}</p>
                </div>
            </div>
        {/if}
        {#if form?.success}
            <p class="pt-2 text-center text-green-500">Your Profile Is Created!</p>
        {/if}
    </div>
</div>
