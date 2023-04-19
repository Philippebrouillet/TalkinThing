<script>
	import { afterUpdate } from 'svelte';

	import Chat from '../../../lib/components/Chat.svelte';
	export let data;
	let userToChat;
	afterUpdate(() => {
		userToChat = data.users.find((user) => user.id === data.id);
	});
</script>

{#if userToChat}


	<Chat {userToChat}/>
{/if}

<style>
</style>
