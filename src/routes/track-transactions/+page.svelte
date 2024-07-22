<script>
    // Example data, replace with actual data from your backend
    let transactions = [
        { date: "2024-07-19", quantity: 500, price: 50.0, status: "Completed" },
        { date: "2024-07-18", quantity: 300, price: 30.0, status: "Pending" },
        { date: "2024-07-17", quantity: 200, price: 20.0, status: "Completed" },
    ];
</script>

<div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-blue-600 text-white p-4 shadow-md">
        <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-2xl font-bold">Track Transactions</h1>
            <nav>
                <a href="/" class="mr-4 hover:underline">Home</a>
                <a href="/signup" class="mr-4 hover:underline">Sign Up</a>
                <a href="/login" class="hover:underline">Login</a>
            </nav>
        </div>
    </header>

    <main class="flex-grow container mx-auto p-6">
        <section class="my-12">
            <h2 class="text-3xl font-bold mb-4 text-center">
                Your Transaction History
            </h2>
            <p class="text-lg mb-8 text-center">
                View all your energy transactions and consumption history.
            </p>
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr>
                            <th class="py-2 px-4 bg-gray-200">Date</th>
                            <th class="py-2 px-4 bg-gray-200">Quantity (kWh)</th
                            >
                            <th class="py-2 px-4 bg-gray-200">Price ($)</th>
                            <th class="py-2 px-4 bg-gray-200">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each transactions as transaction}
                            <tr class="border-t">
                                <td class="py-2 px-4">{transaction.date}</td>
                                <td class="py-2 px-4">{transaction.quantity}</td
                                >
                                <td class="py-2 px-4"
                                    >{transaction.price.toFixed(2)}</td
                                >
                                <td class="py-2 px-4">{transaction.status}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </section>
    </main>

    <footer class="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2024 Energy Trading MVP. All rights reserved.</p>
        <nav>
            <a href="/about" class="mr-4 hover:underline">About Us</a>
            <a href="/contact" class="hover:underline">Contact Us</a>
        </nav>
    </footer>
</div>

<style global>
    /* Global styles can be added here */
</style>
