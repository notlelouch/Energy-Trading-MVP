<script>
    // You can add JavaScript logic here if needed
</script>

<div class="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 class="text-2xl font-bold mb-4 text-center">Profile</h2>
        <form>
            <div class="mb-4">
                <label
                    for="name"
                    class="block text-sm font-medium text-gray-700">Name</label
                >
                <input
                    type="text"
                    id="name"
                    name="name"
                    value="John Doe"
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
                    value="john.doe@example.com"
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
                    value="123 Main St, City, Country"
                    class="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <button
                type="submit"
                class="bg-blue-600 text-white px-6 py-2 rounded-full w-full hover:bg-blue-700"
                >Update Profile</button
            >
        </form>
    </div>
</div>

<style global>
    /* Global styles can be added here */
</style>
