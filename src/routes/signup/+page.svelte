<script>
    // You can add JavaScript logic here if needed
</script>

<div
    class="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6"
>
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h2 class="text-3xl font-bold mb-6 text-center text-blue-600">
            Sign Up
        </h2>
        <form>
            <div class="mb-5">
                <label
                    for="name"
                    class="block text-sm font-medium text-gray-700">Name</label
                >
                <input
                    type="text"
                    id="name"
                    name="name"
                    class="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div class="mb-5">
                <label
                    for="email"
                    class="block text-sm font-medium text-gray-700">Email</label
                >
                <input
                    type="email"
                    id="email"
                    name="email"
                    class="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div class="mb-5">
                <label
                    for="password"
                    class="block text-sm font-medium text-gray-700"
                    >Password</label
                >
                <input
                    type="password"
                    id="password"
                    name="password"
                    class="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <button
                type="submit"
                class="bg-blue-600 text-white py-3 rounded-lg w-full font-semibold hover:bg-blue-700 transition duration-300"
                >Sign Up</button
            >
        </form>
    </div>
</div>

<style global>
    /* Global styles can be added here */
</style>
