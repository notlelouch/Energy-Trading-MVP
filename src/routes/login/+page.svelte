<script>
    /** @type {import('./$types').ActionData} */
export let form;

function myFunction() {
    if(form?.success){
        alert("Login Successful. Your Balance is " + form?.balance);
    } else if(form?.success == false){
        alert("Login Failed");
    }
    else{
        alert('Enter the Details ')
    }
}
</script>

<div
    class="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-6"
>
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
        <h2 class="text-3xl font-bold mb-6 text-center text-blue-600">
            Login
        </h2>
        <form method="POST" action="?/login">
            <div class="mb-5">
                <label
                    for="email"
                    class="block text-sm font-medium text-gray-700">Email</label
                >
                <input
                    type="email"
                    id="email"
                    name="email"
                    class="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div class="mb-5">
                <label
                    for="password"
                    class="block text-sm font-medium text-gray-700"
                    >Password</label
                >
                <input
                    type="password"
                    id="password"
                    name="password"
                    class="mt-2 block w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <button
                type="submit"
                class="bg-blue-600 text-white py-3 rounded-lg w-full font-semibold hover:bg-blue-700 transition duration-300"
                on:click={myFunction}
                >Login</button
            >
        </form>
        <!-- {#if form?.success}
        <!-- this message is ephemeral; it exists because the page was rendered in
               response to a form submission. it will vanish if the user reloads -->
        <!-- <p class="pt-2">Logged in. Balance is {form?.balance} </p>
      {/if} -->
    </div>
</div>


