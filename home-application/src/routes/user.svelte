<script context="module">
	export const load = ({ session }) => {
		if (Object.keys(session).length !== 0) {
			return {
				status: 302,
				redirect: '/dashboard'
			};
		}
		return {};
	};
</script>

<script>
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	let inputUserName = '';
	let inputPassword = '';
	let validated = false;

	let switcher = 'login';

	$: validated = validateInput(inputPassword, inputUserName);
	let leftValue = tweened(0,{
		duration: 300,
		easing: cubicOut
	});
	let registerUserObj = {
		user_name:'',
		user_password:'', 
		user_fName:'',    
		user_lName:'',    
	}
	let confirmPasswordValue = '';
	const validateInput = (pass, usr) => {
		let usrPattern = /^[a-z0-9]{8,20}$/i;
		let passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,30}$/;
		if (usrPattern.test(usr) && passPattern.test(pass)) {
			return true;
		} else {
			return false;
		}
	};
	const sendToLoginEP = async () => {
		const conn = await fetch('/apis/auth/login', {
			method: 'POST',
			body: JSON.stringify({ inputUserName, inputPassword })
		});
		const data = await conn.json();
		console.log(data);
		if (data.searchStatus) {
			window.location = '/dashboard';
		}
	};
	const switchMode = () => {

		if(switcher == 'login') {
			switcher = 'register'
			leftValue.set(50)
		}else{
			switcher = 'login';
			leftValue.set(0)
		} 
		
	}
	
</script>
<p
	class="mb-10 text-center cursor-pointer"
	on:click={() => {
		if(switcher == 'register'){
			switcher = 'login';
		}else{
			switcher = 'register';
		}
	}}
>
	{switcher == 'login' ? 'Don\'t have a user? Create one now!' : 'Or would you rather login?'}
</p>
<div class="switcher flex flex-row mx-auto w-fit  cursor-pointer relative rounded-lg overflow-hidden border border-slate-500 mb-5" on:click="{switchMode}">
	<div style='left: {$leftValue}%' class="backgroundElement absolute w-1/2 z-0 h-full bg-cyan-300 border-slate-500" ></div>
	<p class="z-20 w-1/2 inline-flex justify-center px-4 py-2 text-lg pointer-events-none">Login</p>
	<p class="z-20 w-1/2 inline-flex justify-center px-4 py-2 text-lg pointer-events-none">Register</p>
</div>

<div class="loginWrapper w-4/5 mx-auto border border-slate-200 bg-white p-20 shadow-lg rounded-lg">
	<p class=" text-2xl mb-5 capitalize">{switcher}</p>

	<form class=" ml-4 flex flex-col gap-4 " on:submit|preventDefault={validated && switcher=='login' ? sendToLoginEP : ''}>
		
		{#if switcher == 'login'}
			<label for="">
				<p>Username:</p>
				<input
					
					name="username"
					autocomplete="off"
					class="px-2 pb-0 focus:outline-none text-black border-b-slate-400 border-b-2 border-b-solid"
					type="text"
				/>
			</label>
			<label for="">
				<p>Password:</p>
				<input
					
					name="password"
					class=" px-2 pb-0 focus:outline-none text-black border-b-slate-400 border-b-2 border-b-solid"
					type="password"
				/>
			</label>
			{#if validated}
				<input
					class=" transition-all cursor-pointer w-16 h-10 border-slate-200 hover:border-indigo-300 border-solid border-2"
					type="submit"
					value="Login"
				/>
			{/if}
		{:else}
			<label for="">
				<p>Your Firstname</p>
				<input
					bind:value={registerUserObj.user_fName}
					name="user_fName"	
					autocomplete="off"
					class="px-2 pb-0 focus:outline-none text-black border-b-slate-400 border-b-2 border-b-solid"
					type="text"
				/>
			</label>
			<label for="">
				<p>Your Lastname</p>
				<input
					bind:value={registerUserObj.user_lName}
					name="user_lName"
					autocomplete="off"
					class="px-2 pb-0 focus:outline-none text-black border-b-slate-400 border-b-2 border-b-solid"
					type="text"
				/>
			</label>
			<label for="">
				<p>Username:</p>
				<p>( Must be between 8 and 20 characters long )</p>
				<input
					bind:value={registerUserObj.user_name}
					name="user_name"
					autocomplete="off"
					class="px-2 pb-0 focus:outline-none text-black border-b-slate-400 border-b-2 border-b-solid"
					type="text"
				/>
			</label>
			<label for="">
				<p>Password:</p>
				<p>Must meet these criteria:</p>
				
					<p>Between 8 and 30 characters</p>
					<p>One capitalized character</p>
					<p>One special character</p>
				
				<input
					bind:value={registerUserObj.user_password}
					name="password"
					class=" px-2 pb-0 focus:outline-none text-black border-b-slate-400 border-b-2 border-b-solid"
					type="password"
				/>
			</label>
			<label for="">
				<p>Confirm Password:</p>
				<input
					bind:value={confirmPasswordValue}
					name="password"
					class=" px-2 pb-0 focus:outline-none text-black border-b-slate-400 border-b-2 border-b-solid"
					type="password"
				/>
			</label>
		{/if}
	</form>
</div>