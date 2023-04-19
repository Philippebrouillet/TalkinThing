<script>
	import chaticon from '../images/chaticon.jpg';
	import Search from './Search.svelte';
	import { user , connected} from '../store/userStore';

	let showPopup = false;
	const disconnect = () => {
			$connected = false;
	};
	const togglePopup = () => {
    showPopup = !showPopup;
	console.log(showPopup)
  };
</script>

<div class="px-5 py-5 flex justify-between items-center bg-white border-b-2 rounded-2xl">
	<div class="flex gap-0">
		<div class="font-semibold text-2xl">TalkinThing</div>
		<img class="w-6 h-6 rounded-full" src={chaticon} alt="" />
	</div>
	<Search />

	{#if showPopup===true}
	<div  class="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
		<div class="bg-white rounded-md p-6">
		  <p class="text-gray-800 text-lg font-semibold mb-4">Do you want to disconnect?</p>
		  <div class="flex justify-center">
			<button class="bg-red-500 text-white px-4 py-2 rounded-md mr-2 active:scale-105" on:click={disconnect}>Disconnect</button>
			<button class="bg-gray-300 text-gray-800 px-4 py-2 rounded-md active:scale-105"  on:click={togglePopup}>Cancel</button>
		  </div>
		</div>
	  </div>

	  {/if}
	<div class="flex items-center gap-3">
		<i class=" fa fa-power-off mt-1 cursor-pointer active:scale-105"  on:click={togglePopup}/>
		<div
			class="h-12 w-12 p-2 bg-orange-300 rounded-full text-white font-semibold flex items-center justify-center"
		>
			{$user ? $user.name.substring(0, 2).toUpperCase() : null}
		</div>
	</div>
</div>

<style>
	
  </style>