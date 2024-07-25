<!-- <script lang="ts">
  import { session } from "$lib/stores/session";
</script>

<div
  class="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 py-16 px-4 sm:px-6 lg:px-8"
>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-4xl font-extrabold text-center mb-8 text-blue-400">
      SvelteKit Auth Example
    </h1>

    <div class="bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
      <p class="text-xl mb-6">
        Welcome to our SvelteKit Authentication Demo. Experience a simple yet
        powerful auth system built with SvelteKit.
      </p>

      <p class="mb-6">
        <a
          href="https://github.com/danawoodman/sveltekit-auth-example"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-400 hover:text-blue-300 underline"
        >
          Explore the source code on GitHub
        </a>
      </p>

      <div class="bg-gray-700 rounded-lg p-4 mb-6">
        <p class="text-sm text-gray-300">
          <strong class="text-yellow-400">Note:</strong> This demo uses server-side
          cookies for data storage. In a production environment, you'd want to implement
          a more robust backend system.
        </p>
      </div>

      <p class="mb-6">
        Ready to dive in? Sign up, log out, then log back in to test the
        authentication flow. Don't forget to try an API request!
      </p>
    </div>

    <div
      class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
    >
      {#if $session?.user}
        <a
          href="/dashboard"
          class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 text-center"
        >
          Go to Dashboard
        </a>
        <a
          href="/settings"
          class="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 text-center"
        >
          Settings
        </a>
      {:else}
        <a
          href="/signup"
          class="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 text-center"
        >
          Sign Up
        </a>
        <a
          href="/login"
          class="w-full sm:w-auto bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 text-center"
        >
          Log In
        </a>
      {/if}
    </div>
  </div>
</div> -->
<script lang="ts">
  import { session } from "$lib/stores/session";
</script>

<!-- <script lang="ts">
	import { session } from "$lib/stores/session";
</script>

<div class="prose">
	<h1>SvelteKit Auth Example</h1>
	<p>
		This project shows you how to implement a simple authentication system using
		SvelteKit.
	</p>
	<p>
		<a
			href="https://github.com/danawoodman/sveltekit-auth-example"
			target="_blank"
			rel="noopen">Checkout the source code here</a
		>.
	</p>
	<p>
		This demo doesn't use a database and instead just stores user data in a
		server-side cookie. This is just for demo purposes. In your application
		you'd want to connect to some backend system instead.
	</p>
	<p>
		Try signing up, loggin out, then logging in with that same user credentials
		then try and API request.
	</p>
	<p class="flex items-center gap-4 mt-12">
		{#if $session?.user}
			<a href="/dashboard" class="btn btn-primary">Dashboard</a>
			<a href="/settings" class="btn">Settings</a>
		{:else}
			<a href="/signup" class="btn btn-primary">Sign Up</a>
			<a href="/login" class="btn">Log In</a>
		{/if}
	</p>
</div> -->

<!--
<div
  class="min-h-screen bg-gradient-to-br from-green-900 to-blue-900 text-gray-100 py-16 px-4 sm:px-6 lg:px-8"
>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-5xl font-extrabold text-center mb-8 text-green-400">
      Energy Trading Platform
    </h1>
    <p class="text-2xl text-center mb-12">
      Revolutionizing peer-to-peer energy trading with blockchain technology
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <div class="bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold mb-4 text-blue-400">
          For Energy Sellers
        </h2>
        <ul class="list-disc list-inside mb-6 space-y-2">
          <li>List your excess energy for sale</li>
          <li>Set your own prices</li>
          <li>Manage your listings easily</li>
          <li>Track your sales and revenue</li>
        </ul>
        {#if $session?.user}
          <a
            href="/list-energy"
            class="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 text-center"
          >
            List Energy
          </a>
        {:else}
          <a
            href="/signup"
            class="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 text-center"
          >
            Sign Up to Sell
          </a>
        {/if}
      </div>

      <div class="bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold mb-4 text-blue-400">For Energy Buyers</h2>
        <ul class="list-disc list-inside mb-6 space-y-2">
          <li>Browse available energy listings</li>
          <li>Purchase energy at competitive prices</li>
          <li>Track your purchases and consumption</li>
          <li>Support local energy producers</li>
        </ul>
        {#if $session?.user}
          <a
            href="/buy-energy"
            class="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 text-center"
          >
            Buy Energy
          </a>
        {:else}
          <a
            href="/signup"
            class="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 text-center"
          >
            Sign Up to Buy
          </a>
        {/if}
      </div>
    </div>

    <div class="bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
      <h2 class="text-3xl font-bold mb-6 text-center text-green-400">
        Why Choose Our Platform?
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center">
          <h3 class="text-xl font-semibold mb-2 text-blue-400">
            Secure Transactions
          </h3>
          <p>
            Blockchain technology ensures all transactions are secure and
            verifiable.
          </p>
        </div>
        <div class="text-center">
          <h3 class="text-xl font-semibold mb-2 text-blue-400">
            Transparent Pricing
          </h3>
          <p>See real-time energy prices and make informed decisions.</p>
        </div>
        <div class="text-center">
          <h3 class="text-xl font-semibold mb-2 text-blue-400">
            Efficient Trading
          </h3>
          <p>
            Direct peer-to-peer trading eliminates intermediaries and reduces
            costs.
          </p>
        </div>
      </div>
    </div>

    <div class="text-center">
      <a
        href="/about"
        class="text-green-400 hover:text-green-300 underline mr-4">About Us</a
      >
      <a href="/contact" class="text-green-400 hover:text-green-300 underline"
        >Contact Us</a
      >
    </div>
  </div>
</div> -->

<div
  class="min-h-screen bg-gradient-to-br from-green-900 to-blue-900 text-gray-100 py-16 px-4 sm:px-6 lg:px-8"
>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-5xl font-extrabold text-center mb-8 text-green-400">
      Energy Trading Platform
    </h1>
    <p class="text-2xl text-center mb-12">
      Revolutionizing peer-to-peer energy trading with blockchain technology
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <div class="bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold mb-4 text-blue-400">
          Blockchain-Powered
        </h2>
        <p class="mb-4">
          Our platform leverages cutting-edge blockchain technology to ensure:
        </p>
        <ul class="list-disc list-inside mb-6 space-y-2">
          <li>Secure and transparent transactions</li>
          <li>Immutable record of energy trades</li>
          <li>Smart contracts for automated settlements</li>
          <li>Reduced transaction costs</li>
        </ul>
      </div>

      <div class="bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold mb-4 text-blue-400">
          Peer-to-Peer Trading
        </h2>
        <p class="mb-4">Experience the benefits of direct energy trading:</p>
        <ul class="list-disc list-inside mb-6 space-y-2">
          <li>Connect directly with local energy producers</li>
          <li>Competitive pricing without intermediaries</li>
          <li>Support for various energy types (solar, wind, etc.)</li>
          <li>Contribute to a more sustainable energy ecosystem</li>
        </ul>
      </div>
    </div>

    <div class="bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
      <h2 class="text-3xl font-bold mb-6 text-center text-green-400">
        Platform Features
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center">
          <h3 class="text-xl font-semibold mb-2 text-blue-400">
            Real-Time Tracking
          </h3>
          <p>
            Monitor your energy production, sales, purchases, and consumption in
            real-time.
          </p>
        </div>
        <div class="text-center">
          <h3 class="text-xl font-semibold mb-2 text-blue-400">
            Flexible Pricing
          </h3>
          <p>
            Set your own prices as a seller or choose the best deals as a buyer.
          </p>
        </div>
        <div class="text-center">
          <h3 class="text-xl font-semibold mb-2 text-blue-400">
            Automated Payments
          </h3>
          <p>
            Secure, blockchain-based transactions with automatic revenue
            distribution.
          </p>
        </div>
      </div>
    </div>

    <div class="text-center mb-12">
      {#if $session?.user}
        <a
          href="/dashboard"
          class="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 text-center mr-4"
        >
          Go to Dashboard
        </a>
      {:else}
        <a
          href="/signup"
          class="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 text-center mr-4"
        >
          Sign up
        </a>
        <a
          href="/login"
          class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 text-center"
        >
          Login
        </a>
      {/if}
    </div>
  </div>
</div>

<footer
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
  {/if} -->
</footer>
