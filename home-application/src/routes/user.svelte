<script context="module">
    
    export const load = ({ session }) => {
        if(Object.keys(session).length !== 0){
            return{
                status:302,
                redirect:'/dashboard'
            }
        }
        return {}
    }
</script>
<script>
    let inputUserName = ""    
    let inputPassword = ""    
    let validated = false;
    $: validated = validateInput(inputPassword,inputUserName);
    
    const validateInput = (pass,usr) => {
        let usrPattern = /^[a-z0-9]{8,20}$/i;
        let passPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,30}$/
        if(usrPattern.test(usr) && passPattern.test(pass)){
            return true;
        } else{
            return false
        }
    }
    const sendToLoginEP = async() => {
        const conn = await fetch('/apis/login', {
            method: 'POST',
            body: JSON.stringify({ inputUserName,inputPassword })
	    });
        const data = await conn.json();
        console.log(data);
        if (data.searchStatus) {
            window.location = "/dashboard";
        }

    }

</script>

<div class="login">
    <form class=" flex flex-col gap-4 " on:submit|preventDefault={validated ? sendToLoginEP:''}>
        <label for=""> <p>Username: </p>
            <input bind:value={inputUserName} name="username" autocomplete="off" class="px-2 pb-0 focus:outline-none text-black border-b-slate-400 border-b-2 border-b-solid" placeholder="..." type="text">
        </label>
        <label for=""> <p>Password: </p>
            <input bind:value={inputPassword} name="password" class=" px-2 pb-0 focus:outline-none text-black border-b-slate-400 border-b-2 border-b-solid" placeholder="..."type="password">
        </label>
        {#if validated}
            <input class=" transition-all cursor-pointer w-16 h-10 border-slate-200 hover:border-indigo-300 border-solid border-2"  type="submit" value="Login">
        {/if}
    </form>
</div>
<div class="register">
    
</div>