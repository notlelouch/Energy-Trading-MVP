<script lang="ts">
  import { fade, fly } from "svelte/transition";

  let name = "";
  let email = "";
  let message = "";

  function submitForm() {
    // Handle form submission, e.g., send data to an API endpoint
    alert("Form submitted! We will get back to you shortly.");
    // Reset the form
    name = "";
    email = "";
    message = "";
  }
</script>

<div class="min-h-screen bg-black text-white font-mono p-8 flex flex-col">
  <header class="mb-12">
    <h1 class="text-2xl font-light">CONTACT US</h1>
    <p class="text-sm text-gray-500">Get in touch with our team</p>
  </header>

  <main class="flex-grow">
    <section class="mb-12" in:fade>
      <p class="text-sm text-gray-300 mb-8">
        We're here to answer any questions you might have about our energy
        trading platform.
      </p>

      <form on:submit|preventDefault={submitForm} class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium mb-2">NAME</label>
          <input
            type="text"
            id="name"
            bind:value={name}
            class="w-full p-2 bg-black border border-white text-white focus:outline-none focus:border-green-400"
            placeholder="Your Name"
            required
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium mb-2">EMAIL</label
          >
          <input
            type="email"
            id="email"
            bind:value={email}
            class="w-full p-2 bg-black border border-white text-white focus:outline-none focus:border-green-400"
            placeholder="Your Email"
            required
          />
        </div>
        <div>
          <label for="message" class="block text-sm font-medium mb-2"
            >MESSAGE</label
          >
          <textarea
            id="message"
            bind:value={message}
            rows="5"
            class="w-full p-2 bg-black border border-white text-white focus:outline-none focus:border-green-400"
            placeholder="Your Message"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            class="w-full border border-white p-2 hover:bg-white hover:text-black transition-colors duration-300"
          >
            SEND MESSAGE
          </button>
        </div>
      </form>
    </section>

    <section class="mb-12" in:fade>
      <h2 class="text-xl font-bold mb-4 text-green-400">
        OTHER WAYS TO REACH US
      </h2>
      <ul class="space-y-2 text-sm text-gray-300">
        <li>
          • EMAIL: <a
            href="mailto:notlelouchvb@gmail.com"
            class="text-green-400 hover:underline"
            >support@energytradingplatform.com</a
          >
        </li>
        <li>
          • PHONE: <a
            href="tel:+1234567890"
            class="text-green-400 hover:underline">+1 (234) 567-890</a
          >
        </li>
        <li>• ADDRESS: Earth</li>
      </ul>
    </section>
  </main>

  <footer
    class="mt-12 text-center text-xs text-gray-500 flex flex-col items-center"
  >
    <p>© 2024 ENERGY TRADING MVP | ALL RIGHTS RESERVED</p>
    <nav class="mt-2">
      <a href="/" class="hover:underline text-green-400">Home</a>
      <span class="mx-2">|</span>
      <a href="/about" class="hover:underline text-green-400">About Us</a>
    </nav>
  </footer>
</div>

<style>
  :global(body) {
    background-color: black;
  }
</style>
