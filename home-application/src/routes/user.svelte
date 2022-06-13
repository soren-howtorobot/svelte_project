<script>
let inputUserName = ""    
let inputPassword = ""    
let authenticated = false;
$:{
    authenticated = validateInput(inputPassword,inputUserName);
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
            <input class=" transition-all cursor-pointer w-16 h-10 border-slate-200 hover:border-indigo-300 border-solid border-2" type="submit" value="Login"><!-- content here -->
        {/if}
    </form>
</div>