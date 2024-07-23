<script lang="ts">
    // import Table from "$lib/Table.svelte";

    /** @type {import('./$types').PageData} */
    export let data;
    console.log("hello", data.names);

    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<!-- <Table names={data.names} /> -->

<div class="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 class="text-2xl font-bold mb-4 text-center">Profile</h2>
        <form method="POST" action="?/create">
            <div class="mb-4">
                <label
                    for="name"
                    class="block text-sm font-medium text-gray-700">Name</label
                >
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div class="mb-4">
                <label
                    for="email"
                    class="block text-sm font-medium text-gray-700">Email</label
                >
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="johndoe@gmail.com"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div class="mb-4">
                <label
                    for="address"
                    class="block text-sm font-medium text-gray-700"
                    >Address</label
                >
                <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="chunabhatti, Btown"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div class="mb-4">
                <label
                    for="energy_source"
                    class="block text-sm font-medium text-gray-700"
                    >Energy Source</label
                >
                <input
                    type="text"
                    id="energy_source"
                    name="energy_source"
                    placeholder="Enter energy source"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div class="mb-4">
                <label
                    for="payment_method"
                    class="block text-sm font-medium text-gray-700"
                    >Payment Method</label
                >
                <input
                    type="text"
                    id="payment_method"
                    name="payment_method"
                    placeholder="UPI, PAYPAL, CASH, BITCOIN, etc"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <button
                type="submit"
                class="bg-blue-600 text-white px-6 py-2 rounded-full w-full hover:bg-blue-700"
            >
                Save
            </button>
        </form>
        {#if form?.success}
            <p class="pt-2 text-center text-green-500">Updated User Profile!</p>
        {/if}
    </div>
</div>
