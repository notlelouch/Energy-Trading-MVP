<script>
    // You can add JavaScript logic here if needed
</script>

<div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-blue-600 text-white p-4 shadow-md">
        <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-2xl font-bold">Energy Trading MVP</h1>
            <nav>
                <a href="/signup" class="mr-4 hover:underline">Sign Up</a>
                <a href="/login" class="hover:underline">Login</a>
            </nav>
        </div>
    </header>

    <main class="flex-grow container mx-auto p-6">
        <section class="text-center my-12">
            <h2 class="text-4xl font-bold mb-4">
                Welcome to the Future of Energy Trading
            </h2>
            <p class="text-lg mb-8">
                Our platform facilitates secure and transparent peer-to-peer
                energy trading using blockchain technology. Join us today to
                start trading energy efficiently and securely.
            </p>
            <a
                href="/signup"
                class="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-blue-700"
                >Get Started</a
            >
        </section>

        <section class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-2xl font-bold mb-2">List Energy</h3>
                <p class="mb-4">
                    Sell your excess energy by listing it on our platform.
                </p>
                <a href="/list-energy" class="text-blue-600 hover:underline"
                    >Learn More</a
                >
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-2xl font-bold mb-2">Buy Energy</h3>
                <p class="mb-4">
                    Browse available energy listings and purchase the energy you
                    need.
                </p>
                <a href="/buy-energy" class="text-blue-600 hover:underline"
                    >Learn More</a
                >
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md">
                <h3 class="text-2xl font-bold mb-2">Track Transactions</h3>
                <p class="mb-4">
                    Keep track of all your energy transactions and consumption
                    history.
                </p>
                <a
                    href="/transaction-history"
                    class="text-blue-600 hover:underline">Learn More</a
                >
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
