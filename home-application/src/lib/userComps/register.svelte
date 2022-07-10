<script>
    import Inputfield from "$lib/utilityComps/inputField.svelte";
    import UserNameField from "$lib/utilityComps/userNameField.svelte";
    import PasswordField from "$lib/utilityComps/passwordField.svelte";
	const sendRegister = async () => {};
</script>

<form class=" ml-4 flex flex-col gap-4 " on:submit|preventDefault={sendRegister}>
	<Inputfield label={'Firstname'} min={1} max={30} />
	<Inputfield label={'Lastname'} min={1} max={30} />
    <UserNameField label={'Username'} min={8} max={50} />
    <PasswordField label={'Password'} min={8} max={50} />
</form>

<style>
    
</style>