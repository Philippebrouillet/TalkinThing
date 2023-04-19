<script>
	import { afterUpdate, onMount } from 'svelte';
	import { getDiscussions, discussions, sendMessage } from '../store/discussionsStore';
	import { user } from '../store/userStore';
	import defaultPicture from '../images/th.jpg';
	import { beforeUpdate } from 'svelte';

	export let userToChat;
	let newMessage = { id: '', text: '' };
	let connectedUserId;
	if ($user) {
		connectedUserId = $user.id;
	}
	let messagesContainer;
	let scroll = false;

	function updateScroll(non) {
		console.log(non)
		if(!non) {return }
		if (messagesContainer) {
			messagesContainer.scrollTop = messagesContainer.scrollHeight;
		}
	}
	beforeUpdate(() => {
		if (scroll === true) {
			updateScroll();
			scroll = false;
		}
		updateScroll()
		updateScroll(false)
	});

	onMount(async () => {
		await getDiscussions();
	});
	afterUpdate(async () => {
		await getDiscussions();
	});

	const addNewMessage = async () => {
		await sendMessage(connectedUserId, userToChat, newMessage);
		newMessage.text = '';
		$discussions = $discussions;
		scroll = true;
	};
	function handleKeyDown(event) {
   console.log(event)
  }
</script>

{#if $discussions}
	{#each $discussions.filter((discussion) => {
		if (discussion && typeof discussion.id === 'string') {
			return discussion.id.includes(userToChat.id + connectedUserId) || discussion.id.includes(connectedUserId + userToChat.id);
		}
		return false
	}) as discussion}
		<div class="w-full px-5 flex flex-col justify-between h-[595px]">
			<div
				class="flex flex-col mt-5 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300"
				bind:this={messagesContainer}
			>
				{#each discussion.messages as message}
					{#if message.id === userToChat.id}
						<div class="flex justify-start mb-4">
							<img src={userToChat.img? userToChat.img:defaultPicture} class="object-cover h-8 w-8 rounded-full" alt="" />
							<div class="flex-col flex">
								<div
									class="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
								>
									{message.text}
								</div>
								<span class="text-sm self-start"
									>{new Date(message.timestamp).toLocaleString()}</span
								>
							</div>
						</div>
					{:else if message.id === connectedUserId}
						<div class="flex justify-end mb-4">
							<div class="flex flex-col">
								<div
									class="mr-2 py-3 px-4 max-w-[100px] sm:max-w-[150px] md:max-w-[200px] lg:max-w-[300px] bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
									style="word-wrap: break-word; white-space: pre-line;"
								>
									{message.text}
								</div>
								<span class="text-sm self-end">{new Date(message.timestamp).toLocaleString()}</span>
							</div>
							<img src={$user.img?$user.img:defaultPicture} class="object-cover h-8 w-8 rounded-full" alt="" />
						</div>
					{/if}
				{/each}
			</div>
			<div class="py-1 relative flex">
				<input
					bind:value={newMessage.text}
					class="w-full bg-gray-300 py-5 px-3 rounded-xl"
					type="text"
					placeholder="type your message here..."
				/>
				<img
					on:click={newMessage.text.length !== 0 ? addNewMessage : null}
					on:keypress={addNewMessage}
					class="w-8 h-8 absolute right-2 bottom-3 rounded-full cursor-pointer active:scale-105"
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbZATIhh6ebxwuEx2ssKC2-L1C2LYTJWFXVA&usqp=CAU"
					alt=""
				/>
			</div>
		</div>
	{:else}
		<div class="w-full px-5 flex flex-col hy justify-between h-[590px]">
			<img
				class="w-[100px] self-end mb-[-100px] mt-2 rounded-2xl min-h-[100px] object-cover"
				src={userToChat.img ? userToChat.img : defaultPicture}
				alt="imguser"
			/>
			<h1>Start New Chat With {userToChat.name}</h1>

			<div class="relative mb-1">
				<input
					bind:value={newMessage.text}
					class="w-full bg-gray-300 py-5 px-3 rounded-xl"
					type="text"
					placeholder="type your message here..."
					
				/>
				<img
					on:click={newMessage.text.length !== 0 ? addNewMessage : null}
					on:keydown={(e)=>console.log(e)}
					class="w-8 h-8 absolute right-2 bottom-2 rounded-full cursor-pointer active:scale-105"
					src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbZATIhh6ebxwuEx2ssKC2-L1C2LYTJWFXVA&usqp=CAU"
					alt=""
				/>
			</div>
		</div>
	{/each}
{/if}
