<script lang="ts">
  import { fade, fly } from "svelte/transition";

  const team = [
    {
      name: "Aryan Pandey",
      role: "Lead Full-Stack Blockchain Developer",
      description:
        "Aryan is a skilled developer with a passion for blockchain technology and energy solutions. He leads the technical development of our platform.",
    },
    {
      name: "Himanshu",
      role: "Blockchain Developerr",
      description:
        "Himanshu oversees the product vision and ensures that our platform meets the needs of energy traders and consumers alike.",
    },
    {
      name: "Harsh Anand",
      role: "Full-Stack Specialist",
      description:
        "Harsh brings extensive knowledge in blockchain technologies, focusing on creating secure and efficient energy trading mechanisms.",
    },
  ];
</script>

<div class="min-h-screen bg-black text-white font-mono p-8 flex flex-col">
  <header class="mb-12">
    <h1 class="text-2xl font-light">ABOUT US</h1>
    <p class="text-sm text-gray-500">The team behind Energy Trading MVP</p>
  </header>

  <main class="flex-grow">
    <section class="mb-12" in:fade>
      <h2 class="text-xl font-bold mb-4 text-green-400">OUR MISSION</h2>
      <p class="text-sm text-gray-300 leading-relaxed">
        We aim to revolutionize energy trading using blockchain technology. Our
        goal is to create a transparent, efficient, and secure platform that
        empowers direct energy trading, fostering a sustainable and
        decentralized energy ecosystem.
      </p>
    </section>

    <section class="mb-12" in:fade>
      <h2 class="text-xl font-bold mb-4 text-green-400">WHO WE ARE</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each team as member}
          <div
            class="border border-white p-4 hover:bg-white hover:text-black transition-colors duration-300 group"
          >
            <h3 class="text-lg font-bold mb-2">{member.name}</h3>
            <p class="text-sm text-gray-500 group-hover:text-gray-800 mb-2">
              {member.role}
            </p>
            <p class="text-xs text-gray-300 group-hover:text-gray-600">
              {member.description}
            </p>
            <div
              class="mt-2 h-1 w-0 bg-black group-hover:w-full transition-all duration-300"
            />
          </div>
        {/each}
      </div>
    </section>

    <section class="mb-12" in:fade>
      <h2 class="text-xl font-bold mb-4 text-green-400">OUR VALUES</h2>
      <ul class="text-sm text-gray-300 space-y-2">
        <li>• TRANSPARENCY: Open and honest communication</li>
        <li>• INNOVATION: Exploring cutting-edge technologies</li>
        <li>• SUSTAINABILITY: Promoting renewable energy</li>
        <li>• COMMUNITY: Building an inclusive ecosystem</li>
      </ul>
    </section>

    <section class="mb-12" in:fade>
      <h2 class="text-xl font-bold mb-4 text-green-400">JOIN US</h2>
      <p class="text-sm text-gray-300 mb-4">
        We're always seeking talented individuals passionate about blockchain
        and energy. Explore our opportunities and be part of the revolution.
      </p>
      <a
        href="https://github.com/notlelouch/Energy-Trading-MVP"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-block border border-white px-4 py-2 hover:bg-white hover:text-black transition-colors duration-300"
      >
        VIEW OUR GITHUB
      </a>
    </section>
  </main>

  <footer
    class="mt-12 text-center text-xs text-gray-500 flex flex-col items-center"
  >
    <p>© 2024 ENERGY TRADING MVP | ALL RIGHTS RESERVED</p>
    <nav class="mt-2">
      <a href="/" class="hover:underline text-green-400">Home</a>
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
