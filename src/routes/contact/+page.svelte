<script>
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

<main class="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-4xl mx-auto">
    <h1 class="text-4xl font-extrabold text-center mb-8 text-green-400">
      Contact Us
    </h1>
    <p class="text-lg text-center mb-12">
      We're here to help and answer any questions you might have. We look
      forward to hearing from you!
    </p>

    <section class="mb-12">
      <h2 class="text-3xl font-bold mb-4 text-blue-400">Get in Touch</h2>
      <form on:submit|preventDefault={submitForm} class="space-y-6">
        <div>
          <label for="name" class="block text-lg font-medium mb-2">Name</label>
          <input
            type="text"
            id="name"
            bind:value={name}
            class="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-gray-100"
            placeholder="Your Name"
            required
          />
        </div>
        <div>
          <label for="email" class="block text-lg font-medium mb-2">Email</label
          >
          <input
            type="email"
            id="email"
            bind:value={email}
            class="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-gray-100"
            placeholder="Your Email"
            required
          />
        </div>
        <div>
          <label for="message" class="block text-lg font-medium mb-2"
            >Message</label
          >
          <textarea
            id="message"
            bind:value={message}
            rows="5"
            class="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-gray-100"
            placeholder="Your Message"
            required
          />
        </div>
        <div class="text-center">
          <button
            type="submit"
            class="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
          >
            Send Message
          </button>
        </div>
      </form>
    </section>

    <section class="mt-12">
      <h2 class="text-3xl font-bold mb-4 text-blue-400">Contact Information</h2>
      <p class="text-lg">
        You can also reach us through the following channels:
      </p>
      <ul class="list-none space-y-4 mt-4 text-lg">
        <li>
          <strong>Email:</strong>
          <a
            href="mailto:support@energytradingplatform.com"
            class="text-green-400 hover:text-green-300"
            >support@energytradingplatform.com</a
          >
        </li>
        <li>
          <strong>Phone:</strong>
          <a href="tel:+1234567890" class="text-green-400 hover:text-green-300"
            >+1 (234) 567-890</a
          >
        </li>
        <li>
          <strong>Address:</strong> 123 Energy Street, Sustainable City, Earth
        </li>
      </ul>
    </section>

    <div class="text-center mt-12">
      <a
        href="/"
        class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300"
      >
        Back to Home
      </a>
    </div>
  </div>
</main>
