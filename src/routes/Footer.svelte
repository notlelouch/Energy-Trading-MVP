<script lang="ts">
  import { page } from "$app/stores";
  import { fade } from "svelte/transition";

  let visible = false;
</script>

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
</footer>
