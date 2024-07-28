<!-- <script lang="ts">
	import { applyAction, enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import { session } from "$lib/stores/session";
	import { faWarning } from "@fortawesome/free-solid-svg-icons";
	import debug from "debug";
	import Fa from "svelte-fa";
	import type { ActionData } from "./$types";

	const log = debug("app:routes:login:page.svelte");

	export let form: ActionData;

	$: log("form:", form);
</script>

<section class="max-w-sm mx-auto">
	<div class="prose">
		<h1 class="">Log In</h1>
		<p>
			Use email <code>a@b.com</code> and password <code>asdfasdf</code> to login.
		</p>
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
				autocomplete="email"
				autocorrect="off"
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
				autocomplete="current-password"
				type="password"
				name="password"
				placeholder="Password..."
				class="input input-bordered w-full"
				required
			/>
		</p>
		<p class="flex items-center gap-6 mt-6">
			<button class="btn btn-primary">Log In</button>
			or
			<a href="/signup" class="link">Sign Up</a>
		</p>
	</form>

	{#if form}
		<section class="my-12 prose">
			<h3>Form data:</h3>
			<pre>{JSON.stringify(form, null, 2)}</pre>
		</section>
	{/if}
</section> -->
<script lang="ts">
  import { applyAction, enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { session } from "$lib/stores/session";
  import debug from "debug";
  import type { ActionData } from "./$types";

  const log = debug("app:routes:login:page.svelte");
  export let form: ActionData;
  $: log("form:", form);
</script>

<div
  class="min-h-screen bg-black text-white font-mono p-8 flex flex-col items-center justify-center"
>
  <main class="w-full max-w-md">
    <header class="mb-12 text-center">
      <h1 class="text-2xl font-light">LOGIN</h1>
      <p class="text-sm text-gray-500">Access your account</p>
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
        <label for="email" class="block text-sm font-medium mb-2">EMAIL</label>
        <input
          id="email"
          autocomplete="email"
          autocorrect="off"
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
          autocomplete="current-password"
          type="password"
          name="password"
          placeholder="Your Password"
          class="w-full p-2 bg-black border border-white text-white focus:outline-none focus:border-green-400"
          required
        />
      </div>

      <div>
        <button
          type="submit"
          class="w-full border border-white p-2 hover:bg-white hover:text-black transition-colors duration-300"
        >
          LOGIN
        </button>
      </div>

      <div class="text-center text-sm">
        <span class="text-gray-500">Don't have an account?</span>
        <a href="/signup" class="text-green-400 hover:underline ml-1">SIGN UP</a
        >
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
