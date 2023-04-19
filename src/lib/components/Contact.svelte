<script>
	import { onMount } from 'svelte';
	import defaultPicture from '../images/th.jpg';
	import { users, getUsers } from '../store/usersStore';
	import { user } from '../store/userStore';
	import { afterUpdate,beforeUpdate } from 'svelte';
	import { discussions ,getDiscussions} from '../store/discussionsStore';
	

	onMount(async () => {
		await getUsers();
		await getDiscussions()
		console.log($discussions)
	});
	
  


   
  

		
	

</script>

<div class="flex flex-col w-2/5 border-r-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
	<!-- user list -->
	{#if $users && $user}
		<ul>
			
			{#each $users.filter((usere) => $user.friends.includes(usere.id)) as friend}

				<a
					href="/chat/{JSON.stringify({ name: friend.name, id: friend.id })}"
					class="cursor-pointer text-gray-600"
				>
					<li
						class="flex flex-row py-4 px-2 hover:bg-blue-50 rounded-[10px] justify-center items-center border-b-2"
					>
						<div class="w-1/4">
							<img
								src={friend.img ? friend.img : defaultPicture}
								alt="userimg"
								class="object-cover h-12 w-12 rounded-full"
							/>
						</div>
						<div class="w-full">
							<div class="text-lg font-semibold">{friend.name}</div>
							<span class="text-gray-500">Pick me at 9:00 Am</span>
						</div>
					</li>
				</a>
				{:else}
				<h1 class="mt-10">Start Adding a New Friends</h1>
				<p class="text-center">😀</p>
			{/each}
		</ul>

		
	{/if}

                
	<!-- end user list -->
</div>
