<script>
	import { session } from '$app/stores';
    console.log($session);
    export let removeFromTeam;
    export let i;
    export let team;
    export let updateTeam;
    let editReady = false;
    let newTeamName = team.teamName;  
    let loading = false;


    const saveTeam = async() => {
        const conn = await fetch('/endpoints/saveTeam',{
            method:'POST',
            body:JSON.stringify({
                team,
                id:$session.payload.user_id,
            })
        });
        const returnData = await conn.json();
        console.log(returnData);
    }
    
</script>

<div class="teamWrapper-container relative p-4 mb-4 bg-slate-100 rounded ">
    {#if !editReady}
        <p on:click={()=>{editReady = !editReady}} class=" cursor-pointer group mb-2">Team Name: <span class=" font-extrabold text-black">{team.teamName}</span><i class=" group-hover:text-green-300 ml-2 transition fas fa-pencil-alt"></i></p>
        {#if $session?.payload}
            <i on:click={saveTeam} class=" absolute right-4 top-4 text-2xl cursor-pointer hover:text-green-300 transition hover:scale-110 fas fa-save"></i>
        {/if}
    {:else}
    <form on:submit={
        (e)=>{
            e.preventDefault();
            updateTeam(i,newTeamName);
            editReady = !editReady;
        }
    }>
        <input bind:value={newTeamName} class="newName mb-2 border-b focus:outline-none border-black bg-slate-100" type="text"> <i on:click={()=>{updateTeam(i,newTeamName);editReady = !editReady}} class="fas fa-check"></i>
    </form>
    {/if}
    <div class="teamWrapper-mons mx-auto flex flex-wrap w-3/4 place-items-end over-x-scroll bg-slate-500">
        {#each team.pokemons as mon}
            <div class="monWrapper w-16 m-2 rounded h-16 flex items-center justify-center relative bg-slate-200 ">
                <i
                    on:click={removeFromTeam(mon,i)}
                    class=" hover:text-black transition cursor-pointer absolute top-2 rounded left-2 text-red-600 fas fa-times"
                />
                <img
                class="h-full w-full"
                    src="https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/{mon.name}.png"
                    alt="pokemon icon"
                />
            </div>
        {/each}
    </div>
</div>