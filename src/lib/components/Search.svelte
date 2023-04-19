<script>
	import { onMount, afterUpdate } from 'svelte';
	import { users, getUsers } from '../store/usersStore';
	import { addFriend, user } from '../store/userStore';
	import defaultPicture from '../images/th.jpg';

	let searchQuery = '';
	let searchResults = [];
	let showPopup = false;
	let id;
	onMount(async () => {
		await getUsers();
	});
	const togglePopUp = (userId) => {
		
		showPopup = !showPopup;
		console.log(showPopup)
		id = userId;
		searchQuery = '';
	};
	const addToFriends = async (emailToAdd) => {
		await addFriend(emailToAdd, $user.email), (showPopup = false);
	};

	afterUpdate(() => {
		searchResults = $users.filter((user) => {
			const normalizedSearchQuery = searchQuery
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '');
			const normalizedUserName = user.name
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '');
			return normalizedUserName.includes(normalizedSearchQuery);
		});
	
	});
</script>

<div class="w-1/2 relative">
	<input
		type="text"
		name="search"
		id="search"
		placeholder="SEARCH"
		class="rounded-2xl bg-gray-100 py-3 px-5 w-full text-sm"
		bind:value={searchQuery}
	/>
	{#if searchQuery.length > 0}
		<button
			on:click={() => (searchQuery = '')}
			class="absolute top-0 right-0 mr-2 mt-2 text-gray-500 hover:text-gray-600 focus:outline-none"
		>
			<svg class="w-7 h-7 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M12.828 12.828a1 1 0 1 1-1.414 1.414L10 11.414l-1.414 1.414a1 1 0 1 1-1.414-1.414L8.586 10l-1.414-1.414a1 1 0 1 1 1.414-1.414L10 8.586l1.414-1.414a1 1 0 0 1 1.414 1.414L11.414 10l1.414 1.414z"
				/>
			</svg>
		</button>
	{/if}

	{#if searchQuery.length > 0 && $user}
		<div class="absolute z-50 mt-2 bg-white border border-gray-300 rounded-lg shadow-md w-full">
			<ul>
				{#each searchResults.filter((usere) => usere.id !== $user.id && !$user.friends.includes(usere.id)) as user}
					<li
						class="px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-2 border active:scale-105"
						on:click={togglePopUp(user.id)}
						on:keypress={togglePopUp(id)}
					>
						<img
							class="w-10 rounded-full"
							src={user.img ? user.img : defaultPicture}
							alt="imguser"
						/>
						<p class="mt-2 underline">{user.name}</p>
						<span class="ml-auto text-gray-400 hover:text-gray-600 transition-colors mt-3">
							<i class="fas fa-plus" />
						</span>
					</li>
				{/each}
			</ul>
			
		</div>
	{/if}
</div>
{#if showPopup === true}
				{#each $users.filter((user) => user.id === id) as user}
					<div class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
						<div class="bg-white rounded-md p-6">
							<p class="text-gray-800 text-lg font-semibold mb-4">Do you want add {user.name}</p>
							<div class="flex justify-center">
								<button
									class="bg-red-500 text-white px-4 py-2 rounded-md mr-2 active:scale-105"
									on:click={addToFriends(user.email)}>Add</button
								>
								<button
									class="bg-gray-300 text-gray-800 px-4 py-2 rounded-md active:scale-105"
									on:click={togglePopUp}>Cancel</button
								>
							</div>
						</div>
					</div>
				{/each}
			{/if}

<style>
</style>
