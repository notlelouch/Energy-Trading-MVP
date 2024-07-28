<!-- <script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
  <h1 class="text-4xl font-bold mb-8 text-center text-gray-100">
    Energy Trading Dashboard
  </h1>
  <p class="text-xl mb-12 text-center text-gray-300">
    🎉 Welcome, <strong>{data.user?.email}</strong>! Ready to revolutionize
    energy trading?
  </p>

  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
    <div
      class="bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
    >
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-2 text-blue-100">List Energy</h2>
        <p class="text-blue-200 mb-4">Sell your excess energy with ease</p>
        <p class="text-gray-300 mb-6">
          Turn your surplus power into profit. List your energy and connect with
          buyers instantly.
        </p>
        <a
          href="/list-energy"
          class="inline-block bg-blue-100 text-blue-900 py-2 px-6 rounded-full font-semibold hover:bg-blue-200 transition duration-300"
          >Start Selling</a
        >
      </div>
    </div>

    <div
      class="bg-gradient-to-br from-green-900 to-green-700 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
    >
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-2 text-green-100">Buy Energy</h2>
        <p class="text-green-200 mb-4">Find the best energy deals</p>
        <p class="text-gray-300 mb-6">
          Browse a wide range of energy listings and purchase exactly what you
          need, when you need it.
        </p>
        <a
          href="/buy-energy"
          class="inline-block bg-green-100 text-green-900 py-2 px-6 rounded-full font-semibold hover:bg-green-200 transition duration-300"
          >Start Shopping</a
        >
      </div>
    </div>

    <div
      class="bg-gradient-to-br from-purple-900 to-purple-700 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
    >
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-2 text-purple-100">
          Track Transactions
        </h2>
        <p class="text-purple-200 mb-4">Monitor your energy trades</p>
        <p class="text-gray-300 mb-6">
          Get a clear overview of all your energy transactions and consumption
          patterns in real-time.
        </p>
        <a
          href="/transaction-history"
          class="inline-block bg-purple-100 text-purple-900 py-2 px-6 rounded-full font-semibold hover:bg-purple-200 transition duration-300"
          >View History</a
        >
      </div>
    </div>

    <div
    class="bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
  >
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-2 text-blue-100">My Listing</h2>
      <p class="text-blue-200 mb-4">Sell your excess energy with ease</p>
      <p class="text-gray-300 mb-6">
        Turn your surplus power into profit. List your energy and connect with
        buyers instantly.
      </p>
      <a
        href="/my-listing"
        class="inline-block bg-blue-100 text-blue-900 py-2 px-6 rounded-full font-semibold hover:bg-blue-200 transition duration-300"
        >Start Selling</a
      >
    </div>
  </div>
  

  </div>


  <div
    class="bg-gradient-to-br from-yellow-800 to-orange-900 rounded-xl shadow-lg overflow-hidden"
  >
    <div class="p-8">
      <h2 class="text-3xl font-bold mb-4 text-yellow-100">
        Welcome to the Future of Energy Trading
      </h2>
      <p class="text-gray-300 mb-6">
        Experience secure and transparent peer-to-peer energy trading powered by
        blockchain technology. Join our platform today and be part of the energy
        revolution!
      </p>
      <a
        href="/signup"
        class="inline-block bg-yellow-100 text-orange-900 py-3 px-8 rounded-full font-bold hover:bg-yellow-200 transition duration-300"
        >Get Started Now</a
      >
    </div>
  </div>
</div> -->






<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<div class="min-h-screen bg-black text-white font-mono p-8 flex flex-col">
  <header class="mb-12">
    <h1 class="text-2xl font-light">ENERGY TRADING MVP</h1>
    <p class="text-sm text-gray-500">Welcome, {data.user?.email}</p>
  </header>

  <nav class="grid grid-cols-2 gap-4 mb-12">
    {#each [
      { title: "LIST", href: "/list-energy" },
      { title: "BUY", href: "/buy-energy" },
      { title: "MANAGE", href: "/my-listing" },
      { title: "TRACK", href: "/transaction-history" }
    ] as item}
      <a 
        href={item.href}
        class="border border-white p-4 hover:bg-white hover:text-black transition-colors duration-300 group"
      >
        <span class="text-xs text-gray-500 group-hover:text-gray-800">{item.title}</span>
        <div class="mt-2 h-1 w-0 bg-black group-hover:w-full transition-all duration-300"></div>
      </a>
    {/each}
  </nav>

  <section class="flex-grow flex items-center justify-center">
    <div class="text-center">
      <h2 class="text-xl mb-4">REVOLUTIONIZE ENERGY TRADING</h2>
      <p class="text-sm text-gray-500 mb-6 max-w-md mx-auto">
        Secure, transparent, peer-to-peer. Powered by blockchain.
      </p>
      <a 
        href="/signup"
        class="inline-block border border-white px-8 py-2 hover:bg-white hover:text-black transition-colors duration-300"
      >
        JOIN NOW
      </a>
    </div>
  </section>
  <footer class="mt-12 text-center text-xs text-gray-500 flex flex-col items-center">
    <p>© 2024 ENERGY TRADING MVP | ALL RIGHTS RESERVED</p>
    <nav class="mt-2">
      <a href="/about" class="hover:underline text-green-400">About Us</a>
      <span class="mx-2">|</span>
      <a href="/contact" class="hover:underline text-green-400">Contact Us</a>
    </nav>
  </footer>
</div>

<style>
  :global(body) {
    background-color: black;
  }
</style>






<!--
<footer
  class="bottom-0 left-0 z-20 w-full p-4 bg-gray-900 border-t border-gray-900 shadow md:flex md:items-center md:justify-between md:p-6"
>
  <p>&copy; 2024 Energy Trading MVP. All rights reserved.</p>
  <nav>
    <a href="/about" class="mr-4 hover:underline text-green-400">About Us</a>
    <a href="/contact" class="hover:underline text-green-400">Contact Us</a>
  </nav>
   <div class="text-sm mt-4 md:mt-0">
    <button
      class="text-blue-400 hover:text-blue-300"
      on:click={() => (visible = !visible)}
    >
      {#if visible}
        Hide
      {:else}
        Show page data
      {/if}
    </button>
  </div>
  {#if visible && Object.keys($page.data).length}
    <section transition:fade>
      <h3>Page data:</h3>
      <pre>{JSON.stringify($page.data, null, 2)}</pre>
    </section>
  {/if} 
</footer> -->
