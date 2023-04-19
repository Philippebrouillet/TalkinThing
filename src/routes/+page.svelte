<script>

	import { user} from '../lib/store/userStore';

	
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex flex-col justify-center rounded-lg items-center h-[100%] bg-gray-100 p-2">
	<div class="max-w-md px-6 py-7 bg-white rounded-lg shadow-lg border border-gray-200">
		<h1 class="text-3xl font-bold text-gray-900 mb-2 underline">Welcome back</h1>
		<p  class="text-lg text-gray-700 uppercase text-center mb-6">{$user?$user.name:null}</p>
		<p class="text-lg text-gray-700 mb-2">Start chat with Friends</p>
		<p class="text-md text-gray-700 mb-3">Connect with your friends and stay in touch with the latest news and updates. Our platform makes it easy to chat, share photos, and stay connected with the people you care about.</p>
		
	</div>
</section>


<style>
	

	
</style>
