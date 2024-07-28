<!-- <script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { faWarning } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";
  import type { ActionData } from "./$types";
  import debug from "debug";
  import { session } from "$lib/stores/session";
  import { goto } from "$app/navigation";

  const log = debug("app:routes:signup:page.svelte");

  export let form: ActionData;
</script>

<section class="max-w-sm mx-auto">
  <div class="prose">
    <h1>Sign Up</h1>
  </div>

  <form
    class="flex flex-col gap-6 my-6"
    method="POST"
    use:enhance={() =>
      async ({ result }) => {
        log("form result:", result);

        await applyAction(result);

        // TODO: this is kinda a hack since redirecting in the
        // action doesn't work because we can't also update page
        // data.
        if (result.type === "success") {
          const user = result.data?.user;
          if (user) $session.user = user;
          await goto("/dashboard");
        }
      }}
  >
    {#if form?.error}
      <div class="alert alert-error">
        <div>
          <Fa icon={faWarning} />
          {form.error}
        </div>
      </div>
    {/if}
    <p>
      <input
        type="name"
        name="name"
        placeholder="Name"
        class="input input-bordered w-full"
        required
        value={form?.name ?? ""}
      />
    </p>
    <p>
      <input
        type="email"
        name="email"
        placeholder="Email..."
        class="input input-bordered w-full"
        required
        value={form?.email ?? ""}
      />
    </p>
    <p>
      <input
        type="password"
        name="password"
        placeholder="Password..."
        class="input input-bordered w-full"
        required
      />
    </p>
    <p>
      <input
        type="password"
        name="password-confirm"
        placeholder="Confirm password..."
        class="input input-bordered w-full"
        required
      />
    </p>
    <p class="flex items-center gap-6 mt-6">
      <button class="btn btn-primary">Sign Up</button>
      or
      <a href="/login" class="link">Log In</a>
    </p>
  </form>

  {#if form}
    <section class="my-8">
      <h3>Form data:</h3>
      <pre>{JSON.stringify(form, null, 2)}</pre>
    </section>
  {/if}
</section>

<style>
  html,
  body {
    height: 100%; /* Makes sure that the body takes at least the full height of the viewport */
    margin: 0; /* Removes default margin */
  }
  body {
    display: flex;
    flex-direction: column; /* Stacks content vertically */
  }
  .content {
    flex: 1 0 auto; /* Flex-grow, flex-shrink, flex-basis - This pushes the footer down */
  }
  footer {
    flex-shrink: 0; /* Prevents footer from shrinking */
  }
</style> -->
<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { session } from "$lib/stores/session";
  import debug from "debug";
  import type { ActionData } from "./$types";

  const log = debug("app:routes:signup:page.svelte");
  export let form: ActionData;
</script>

<div
  class="min-h-screen bg-black text-white font-mono p-8 flex flex-col items-center justify-center"
>
  <main class="w-full max-w-md">
    <header class="mb-12 text-center">
      <h1 class="text-2xl font-light">SIGN UP</h1>
      <p class="text-sm text-gray-500">Create your account</p>
    </header>

    <form
      class="space-y-6"
      method="POST"
      use:enhance={() =>
        async ({ result }) => {
          log("form result:", result);
          await applyAction(result);
          if (result.type === "success") {
            const user = result.data?.user;
            if (user) $session.user = user;
            await goto("/dashboard");
          }
        }}
    >
      {#if form?.error}
        <div class="bg-red-500 text-white p-3 text-sm">
          {form.error}
        </div>
      {/if}

      <div>
        <label for="name" class="block text-sm font-medium mb-2">NAME</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="Your Name"
          class="w-full p-2 bg-black border border-white text-white focus:outline-none focus:border-green-400"
          required
          value={form?.name ?? ""}
        />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium mb-2">EMAIL</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Your Email"
          class="w-full p-2 bg-black border border-white text-white focus:outline-none focus:border-green-400"
          required
          value={form?.email ?? ""}
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium mb-2"
          >PASSWORD</label
        >
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Your Password"
          class="w-full p-2 bg-black border border-white text-white focus:outline-none focus:border-green-400"
          required
        />
      </div>

      <div>
        <label for="password-confirm" class="block text-sm font-medium mb-2"
          >CONFIRM PASSWORD</label
        >
        <input
          id="password-confirm"
          type="password"
          name="password-confirm"
          placeholder="Confirm Your Password"
          class="w-full p-2 bg-black border border-white text-white focus:outline-none focus:border-green-400"
          required
        />
      </div>

      <div>
        <button
          type="submit"
          class="w-full border border-white p-2 hover:bg-white hover:text-black transition-colors duration-300"
        >
          SIGN UP
        </button>
      </div>

      <div class="text-center text-sm">
        <span class="text-gray-500">Already have an account?</span>
        <a href="/login" class="text-green-400 hover:underline ml-1">LOGIN</a>
      </div>
    </form>

    {#if form}
      <section class="mt-12">
        <h3 class="text-xl font-bold mb-4 text-green-400">Form data:</h3>
        <pre
          class="bg-gray-800 p-4 rounded-md overflow-x-auto text-xs">{JSON.stringify(
            form,
            null,
            2
          )}</pre>
      </section>
    {/if}
  </main>

  <footer class="mt-12 text-center text-xs text-gray-500">
    <p>© 2024 ENERGY TRADING MVP | ALL RIGHTS RESERVED</p>
  </footer>
</div>

<style>
  :global(body) {
    background-color: black;
  }
</style>
