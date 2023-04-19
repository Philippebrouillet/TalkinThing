<script>
	export let newUser;
	export let handleAddNewUser;
	export let toggleForm;
</script>

<div class="flex w-[100%] sm:w-1/2 justify-center items-center bg-white">
	<form class="bg-white" on:submit={handleAddNewUser}>
		<h1 class="text-gray-800 font-bold text-2xl mb-5">Register</h1>

		<div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
			<input
				bind:value={newUser.name}
				class="pl-2 outline-none border-none"
				type="text"
				name=""
				id=""
				autocomplete="name"
				placeholder="- Name"
			/>
		</div>
		<div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 text-gray-400"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
				/>
			</svg>
			<input
				bind:value={newUser.email}
				class="pl-2 outline-none border-none"
				type="email"
				autocomplete="email"
				name=""
				id="emailRegistr"
				placeholder="Email Address"
			/>
		</div>
		<div class="flex items-center border-2 py-2 px-3 rounded-2xl">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 text-gray-400"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
					clip-rule="evenodd"
				/>
			</svg>
			<input
				bind:value={newUser.password}
				class="pl-2 outline-none border-none"
				type="password"
				name=""
				autocomplete="current-password"
				id="passwordRegistr"
				placeholder="Password"
			/>
		</div>
		<button
			type="submit"
			class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
			>Register</button
		>
		<div class="flex flex-col gap-1 mt-2">
			<span
				on:click={() => toggleForm.set('signIn')}
				on:keypress={() => toggleForm.set('signIn')}
				class="text-sm ml-2 hover:text-blue-500 cursor-pointer">You have account ?</span
			>
		</div>
	</form>
</div>
