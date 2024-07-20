<script>
    // You can add JavaScript logic here if needed
</script>

<div class="min-h-screen bg-gray-100 flex flex-col">
    <main class="flex-grow container mx-auto p-6">
        <section class="text-center my-12">
            <h2 class="text-3xl font-bold mb-4">List Your Energy for Sale</h2>
            <p class="text-lg mb-8">
                Provide details about the energy you want to list for sale.
            </p>
            <form class="bg-white p-6 rounded-lg shadow-md">
                <div class="mb-4">
                    <label
                        for="energy-type"
                        class="block text-sm font-medium text-gray-700"
                        >Energy Type</label
                    >
                    <select
                        id="energy-type"
                        name="energy-type"
                        class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option>Solar</option>
                        <option>Wind</option>
                        <option>Hydro</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label
                        for="quantity"
                        class="block text-sm font-medium text-gray-700"
                        >Quantity (kWh)</label
                    >
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div class="mb-4">
                    <label
                        for="price"
                        class="block text-sm font-medium text-gray-700"
                        >Price per Unit ($)</label
                    >
                    <input
                        type="number"
                        step="0.01"
                        id="price"
                        name="price"
                        class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    class="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
                    >Submit Listing</button
                >
            </form>
        </section>
    </main>
</div>
