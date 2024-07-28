<script lang="ts">
  import { session } from "$lib/stores/session";
</script>

<div class="min-h-screen bg-black text-white font-mono p-8 flex flex-col">
  <header class="mb-12 text-center">
    <h1 class="text-4xl font-light mb-2">ENERGY TRADING MVP</h1>
    <p class="text-sm text-gray-500">Peer-to-Peer Energy Trading on Blockchain</p>
  </header>

  <main class="flex-grow flex flex-col items-center justify-center space-y-12">
    <section class="text-center max-w-2xl">
      <h2 class="text-2xl mb-4">REVOLUTIONIZE ENERGY TRADING</h2>
      <p class="text-sm text-gray-500">
        Secure, transparent, and efficient peer-to-peer energy trading powered by blockchain technology.
      </p>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
      <div class="border border-white p-6 hover:bg-white hover:text-black transition-colors duration-300">
        <h3 class="text-lg mb-2">FOR SELLERS</h3>
        <ul class="text-sm space-y-2">
          <li>• List your energy for sale</li>
          <li>• Set your own prices</li>
          <li>• Manage your listings</li>
          <li>• Track your sales</li>
        </ul>
      </div>
      <div class="border border-white p-6 hover:bg-white hover:text-black transition-colors duration-300">
        <h3 class="text-lg mb-2">FOR BUYERS</h3>
        <ul class="text-sm space-y-2">
          <li>• Browse energy listings</li>
          <li>• Purchase energy units</li>
          <li>• View transaction history</li>
          <li>• Monitor energy consumption</li>
        </ul>
      </div>
    </section>

    <section class="text-center">
      {#if $session?.user}
        <a
          href="/dashboard"
          class="inline-block px-8 py-2 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300"
        >
          GO TO DASHBOARD
        </a>
      {:else}
        <a
          href="/signup"
          class="inline-block px-8 py-2 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 mr-4"
        >
          SIGN UP
        </a>
        <a
          href="/login"
          class="inline-block px-8 py-2 border border-white text-white hover:bg-white hover:text-black transition-colors duration-300"
        >
          LOGIN
        </a>
      {/if}
    </section>
  </main>

  <footer class="mt-12 text-center text-xs text-gray-500 flex flex-col items-center">
    <p>© 2024 ENERGY TRADING MVP | ALL RIGHTS RESERVED</p>
    <nav class="mt-2">
      <a href="/about" class="hover:underline text-green-500">About Us</a>
      <span class="mx-2">|</span>
      <a href="/contact" class="hover:underline text-green-500">Contact Us</a>
    </nav>
  </footer>
</div>

<style>
  :global(body) {
    background-color: black;
  }
</style>
<!-- <footer
  class="bottom-0 left-0 z-20 w-full p-4 bg-gray-900 border-t border-gray-900 shadow md:flex md:items-center md:justify-between md:p-6"
>
  <p>&copy; 2024 Energy Trading MVP. All rights reserved.</p>
  <nav>
    <a href="/about" class="mr-4 hover:underline text-green-400">About Us</a>
    <a href="/contact" class="hover:underline text-green-400">Contact Us</a>
  </nav>
  <!-- <div class="text-sm mt-4 md:mt-0">
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
