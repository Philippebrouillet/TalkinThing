<script>
	import { getUsers } from '../lib/store/usersStore';
	import chaticon from '../lib/images/chaticon.jpg';
	
	import ConnectForm from '../lib/components/ConnectForm.svelte';
	import './styles.css';
	import { addNewUser } from '../lib/store/usersStore';
	import { connect, toggleForm,connected} from '../lib/store/userStore';
	import { onMount} from 'svelte';
	import RegisterForm from '../lib/components/RegisterForm.svelte';

	import Header from '../lib/components/Header.svelte';
	import Contact from '../lib/components/Contact.svelte';

	

	onMount(async () => {
		await getUsers();
		
	});
	
  let error = ''

	let userTryingToConnect = { email: '', password: '' };
	let newUser = { email: '', password: '', name: '' };

	async  function handleConnect() {
		
		await connect(userTryingToConnect);
		userTryingToConnect = { email: '', password: '' };
	  
			if ($connected===false)
			{
				
				error = 'Incorrect Email or Password'
			}
		
	}
	function handleAddNewUser() {
		if (newUser.email.length > 0 && newUser.password.length > 0 && newUser.name.length > 0) {
			addNewUser(newUser);
			newUser = { email: '', password: '', name: '' };
			toggleForm.set('signIn');
		} else {
			alert('Please fill all fields');
		}
	}
</script>

{#if $connected === false}
	<div class="h-screen flex">
		<div
		 
			class="hidden sm:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center"
		>
			<div>
				<div class="flex">
					<h1 class="text-white font-bold text-4xl font-sans">TalkinThing</h1>
					<img class="w-6 h-6 rounded-full" src={chaticon} alt="" />
				</div>

				<p class="text-white mt-1">Stay Connected with your Friends</p>
				<div class="border w-[250px]" />
			</div>
		</div>
		{#if $toggleForm === 'signIn'}
			<ConnectForm {toggleForm} {userTryingToConnect} {error} {handleConnect} />
		{:else if $toggleForm === 'signUp'}
			<RegisterForm {handleAddNewUser} {newUser} {toggleForm} />
		{/if}
	</div>
{:else}
	<div class="app">
		<!-- This is an example component -->
		<div class="container mx-auto shadow-lg rounded-full max-w-[800px] ">
			<!-- header -->
			<Header  />
			<!-- end header -->
			
			<div class="flex flex-row justify-between bg-white rounded-2xl max-h-[600px]">
				<!-- contact list -->
				<Contact />
				<main>
					<slot />
				</main>
			</div>
		</div>
	</div>
{/if}

<style>
	.app {
		display: flex;
		align-items: center;
		min-height: 100vh;
	}

	main {
		flex: 1;
	}
</style>
