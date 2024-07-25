<script>
  // Example data, replace with actual data from your backend
  let transactions = [
    { date: "2024-07-19", quantity: 500, price: 50.0, status: "Completed" },
    { date: "2024-07-18", quantity: 300, price: 30.0, status: "Pending" },
    { date: "2024-07-17", quantity: 200, price: 20.0, status: "Completed" },
  ];
</script>

<div
  class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col"
>
  <main class="flex-grow container mx-auto p-6">
    <section class="my-12">
      <h2 class="text-4xl font-bold mb-4 text-center text-white">
        Your Transaction History
      </h2>
      <p class="text-lg mb-8 text-center text-gray-300">
        View all your energy transactions and consumption history.
      </p>
      <div class="overflow-x-auto">
        <table
          class="min-w-full bg-gray-800 text-gray-300 shadow-lg rounded-lg"
        >
          <thead>
            <tr class="bg-gray-700">
              <th class="py-3 px-4 text-left font-semibold">Date</th>
              <th class="py-3 px-4 text-left font-semibold">Quantity (kWh)</th>
              <th class="py-3 px-4 text-left font-semibold">Price ($)</th>
              <th class="py-3 px-4 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {#each transactions as transaction}
              <tr class="border-t border-gray-600 hover:bg-gray-700">
                <td class="py-3 px-4">{transaction.date}</td>
                <td class="py-3 px-4">{transaction.quantity}</td>
                <td class="py-3 px-4">{transaction.price.toFixed(2)}</td>
                <td class="py-3 px-4">{transaction.status}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </section>
  </main>

  <footer class="bg-gray-900 text-white p-4 text-center">
    <p>&copy; 2024 Energy Trading MVP. All rights reserved.</p>
    <nav>
      <a href="/about" class="mr-4 hover:underline">About Us</a>
      <a href="/contact" class="hover:underline">Contact Us</a>
    </nav>
  </footer>
</div>
