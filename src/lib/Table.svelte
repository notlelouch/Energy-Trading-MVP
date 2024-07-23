<script>
    import Modal from "./Modal.svelte";
    let showModal = false;
    let editableUser = { id: null, name: "", email: "" };
    export let names;
    export let form;

    const handleUpdate = (data) => {
        showModal = true;
        editableUser = { ...data };
        console.log(editableUser);
    };
</script>

<div
    class="mt-10 pt-10 w-full max-w-xl p-5 mx-auto rounded-lg shadow-xl dark:bg-white/10 bg-white/30 ring-1 ring-gray-900/5 backdrop-blur-lg"
>
    <div class="flex items-center justify-between mb-4">
        <div class="space-y-1">
            <h2 class="text-xl font-semibold">List of Users</h2>
            <p class="text-sm text-gray-500">Fetched {names.length} users</p>
        </div>
    </div>
    <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-yellow-500">
            <tr>
                <th
                    class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >Name</th
                >
                <th
                    class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >Email</th
                >
                <th
                    class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                    >Actions</th
                >
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
            {#each names as user (user.id)}
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <form
                            method="POST"
                            action="/profile?/delete"
                            class="inline-block"
                        >
                            <input type="hidden" name="id" value={user.id} />
                            <button type="submit">
                                <img
                                    class="w-7 inline hover:bg-gray-200 rounded-md p-1"
                                    src="./trash-can.svg"
                                    alt="delete"
                                />
                            </button>
                        </form>
                        <form method="GET" class="inline-block ml-4">
                            <button
                                type="submit"
                                on:click={() => handleUpdate(user)}
                            >
                                <img
                                    class="w-7 inline hover:bg-gray-200 rounded-md p-1"
                                    src="./edit-icon.png"
                                    alt="update"
                                />
                            </button>
                        </form>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<Modal bind:showModal>
    <h2 slot="header" class="font-semibold text-lg">Update Data</h2>
    <form method="POST" action="?/update">
        <div class="flex flex-wrap -mx-3 mb-2 mt-4">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-city"
                >
                    Name
                </label>
                <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="name"
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    bind:value={editableUser.name}
                />
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-city"
                >
                    Email
                </label>
                <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="email"
                    type="text"
                    placeholder="Enter email"
                    name="email"
                    bind:value={editableUser.email}
                />
            </div>
            <input type="hidden" name="id" value={editableUser.id} />
            <button
                type="submit"
                class="bg-yellow-500 hover:bg-blue-700 text-white font-bold mt-5 ml-2 px-2 rounded"
            >
                Update Applicant
            </button>
        </div>
    </form>
    {#if form?.success}
        <!-- this message is ephemeral; it exists because the page was rendered in
	   response to a form submission. it will vanish if the user reloads -->
        <p class="pt-2 text-green-600 font-semibold">Applicant Updated!</p>
    {/if}
</Modal>
