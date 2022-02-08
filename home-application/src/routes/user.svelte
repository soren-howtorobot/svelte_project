<script>
let inputUserName = "Soer145a"    
let inputPassword = "Sbx98hfg!"    
let authenticated;
let promise = "";
$:{
    authenticated = validateInput(inputPassword,inputUserName);
    console.log(authenticated);
}

function validateInput(pass,usr){
    let usrPattern = /^[a-z0-9]{8,20}$/i;
    let passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,30}$/
    if(usrPattern.test(usr) && passPattern.test(pass)){
        return true;
    } else{
        return false
    }
    
}
function sendDataToNode(){
    promise = doPost().then((data)=>{return data});
    console.log(promise);
    
}
async function doPost () {
		const res = await fetch('http://localhost:8080/verify-login', {
			method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({
                username:inputUserName,
                password:inputPassword
            })
        });
        const data = await res.json();

		if (res.ok) {
            console.log(data);
			return data;
		} else {
            console.log(data.errors);
			throw data.errors;
		}
}

</script>

<div class="login">
    <form class=" flex flex-col gap-4 " action="" on:submit|preventDefault>
    <label for=""> <p>Username: </p>
        <input bind:value={inputUserName} name="username" autocomplete="off" class="px-2 pb-0 focus:outline-none text-black border-b-slate-400 border-b-2 border-b-solid" placeholder="..." type="text">
    </label>
    <label for=""> <p>Password:</p>
        <input bind:value={inputPassword} name="password" class=" px-2 pb-0 focus:outline-none text-black border-b-slate-400 border-b-2 border-b-solid" placeholder="..."type="password">
    </label>
    {#if authenticated}
         <input class=" transition-all cursor-pointer w-16 h-10 border-slate-200 hover:border-indigo-300 border-solid border-2" type="submit" on:click="{sendDataToNode}" value="Login"><!-- content here -->
    {/if}
        
    </form>
</div>
{#await promise}
	<p>...waiting</p>	
{:catch error}
    <p>Hey, those input does not match requirements!</p>
    {#each error as err}
        <p style="color:red">ERROR - {err.value} - {err.msg}</p>
    {/each}
	
{/await}