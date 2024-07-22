<script>
    let user = {
        name: "John Doe",
        email: "john.doe@example.com",
        address: "123 Main St, City, Country",
        energySourceDetails: "nuclear",
        paymentMethod: "UPI",
    };
</script>

<div
    class="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6"
>
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto">
        <h2 class="text-3xl font-bold mb-6 text-center text-blue-600">
            Profile
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
                    placeholder={user.name}
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
                    placeholder={user.email}
                    class="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div class="mb-5">
                <label
                    for="address"
                    class="block text-sm font-medium text-gray-700"
                    >Address</label
                >
                <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder={user.address}
                    class="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div class="mb-5">
                <label
                    for="energy-source-details"
                    class="block text-sm font-medium text-gray-700"
                    >Energy Source Details</label
                >
                <input
                    type="text"
                    id="energy-source-details"
                    name="energy-source-details"
                    placeholder={user.energySourceDetails}
                    class="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div class="mb-5">
                <label
                    for="payment-method"
                    class="block text-sm font-medium text-gray-700"
                    >Payment Method</label
                >
                <input
                    type="text"
                    id="payment-method"
                    name="payment-method"
                    placeholder={user.paymentMethod}
                    class="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <button
                type="submit"
                class="bg-blue-600 text-white py-3 rounded-lg w-full font-semibold hover:bg-blue-700 transition duration-300"
                >Update Profile</button
            >
        </form>
    </div>
</div>
