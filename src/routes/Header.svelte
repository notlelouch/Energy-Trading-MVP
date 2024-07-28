<!-- <script lang="ts">
  import { session } from "$lib/stores/session";
  import {
    faBars,
    faChartLine,
    faCog,
    faHeart,
    faRocket,
    faUser,
    faSignIn,
    faSignOut,
  } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";
  import "../app.postcss";

  $: menu_items = $session?.user
    ? [
        {
          href: "/dashboard",
          icon: faChartLine,
          label: "Dashboard",
        },
        {
          href: "/profile",
          icon: faUser,
          label: "Profile",
          reload: true,
        },
        {
          href: "/settings",
          icon: faCog,
          label: "Settings",
        },
        {
          href: "/logout",
          icon: faSignOut,
          label: "Log Out",
          reload: true,
        },
      ]
    : [
        {
          href: "/login",
          icon: faSignIn,
          label: "Log In",
        },
        {
          href: "/signup",
          icon: faHeart,
          label: "Sign Up",
        },
      ];
</script>

<header class="bg-gray-900 px-4 py-2">
  <div class="max-w-screen-lg mx-auto flex items-center justify-between">
    <a href="/" class="flex items-center text-white text-xl font-semibold">
      <Fa icon={faRocket} class="mr-2" />
      Energy Trading MVP
    </a>

         <nav class="dropdown dropdown-end ml-auto">
      <button tabindex="0" class="btn btn-ghost gap-3" aria-haspopup="true" aria-expanded="false">
        <Fa icon={faBars} />
        Menu
      </button>
      <ul
        tabindex="0"
        class="dropdown-content menu p-2 shadow-md bg-base-200 rounded-box w-52 "
      >
        {#each menu_items as item}
          <li>
            <a
              href={item.href}
              data-sveltekit-reload={item.reload ? "" : "off"}
            >
              <Fa icon={item.icon} />
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>
</header> -->
<script lang="ts">
  import { session } from "$lib/stores/session";
  import { onMount } from "svelte";
  import {
    faBars,
    faChartLine,
    faCog,
    faHeart,
    faRocket,
    faUser,
    faSignIn,
    faSignOut,
  } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";
  import { fade } from "svelte/transition";

  let isMenuOpen = false;
  let menuButton: HTMLButtonElement;
  let menuList: HTMLUListElement;

  $: menu_items = $session?.user
    ? [
        {
          href: "/dashboard",
          icon: faChartLine,
          label: "DASHBOARD",
        },
        {
          href: "/profile",
          icon: faUser,
          label: "PROFILE",
          reload: true,
        },
        // {
        //   href: "/settings",
        //   icon: faCog,
        //   label: "SETTINGS",
        // },
        {
          href: "/logout",
          icon: faSignOut,
          label: "LOG OUT",
          reload: true,
        },
      ]
    : [
        {
          href: "/login",
          icon: faSignIn,
          label: "LOG IN",
        },
        {
          href: "/signup",
          icon: faHeart,
          label: "SIGN UP",
        },
      ];

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function closeMenu() {
    isMenuOpen = false;
  }

  function handleClickOutside(event: MouseEvent) {
    if (
      isMenuOpen &&
      menuList &&
      !menuList.contains(event.target as Node) &&
      !menuButton.contains(event.target as Node)
    ) {
      closeMenu();
    }
  }

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });
</script>

<header class="bg-black text-white font-mono p-4">
  <div class="max-w-screen-lg mx-auto flex items-center justify-between">
    <a href="/" class="flex items-center text-white text-xl">
      <Fa icon={faRocket} class="mr-2" />
      <span class="font-light">ENERGY TRADING HUB</span>
    </a>

    <nav class="relative">
      <button
        bind:this={menuButton}
        on:click={toggleMenu}
        class="border border-white p-2 hover:bg-white hover:text-black transition-colors duration-300"
        aria-haspopup="true"
        aria-expanded={isMenuOpen}
      >
        <Fa icon={faBars} />
      </button>

      {#if isMenuOpen}
        <ul
          bind:this={menuList}
          transition:fade={{ duration: 200 }}
          class="absolute right-0 mt-2 w-48 bg-black border border-white"
        >
          {#each menu_items as item}
            <li>
              <a
                href={item.href}
                data-sveltekit-reload={item.reload ? "" : "off"}
                class="block p-3 hover:bg-white hover:text-black transition-colors duration-300"
                on:click={closeMenu}
              >
                <Fa icon={item.icon} class="mr-2" />
                <span class="text-sm">{item.label}</span>
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    </nav>
  </div>
</header>

<style>
  :global(body) {
    background-color: black;
    color: white;
  }
</style>
