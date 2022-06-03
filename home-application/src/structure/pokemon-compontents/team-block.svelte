<script>
    export let removeFromTeam;
    export let i;
    export let team;
    export let updateTeam;
    let editReady = false;
    let newTeamName = "";  
    
</script>

<div class="teamWrapper-container p-4 bg-slate-100 rounded ">
    {#if !editReady}
        <p class=" mb-2">Team Name: <br><span>{team.teamName}</span><i on:click={()=>{editReady = !editReady}} class=" ml-2 cursor-pointer hover:text-green-300 transition fas fa-pencil-alt"></i></p>
    {:else}
    <form on:submit={
        (e)=>{
            e.preventDefault();
            updateTeam(i,newTeamName);editReady = !editReady
        }
    } action="">
        <input bind:value={newTeamName} type="text"> <i on:click={()=>{updateTeam(i,newTeamName);editReady = !editReady}} class="fas fa-check"></i>
    </form>
    {/if}
    <div class="teamnWrapper-mons grid grid-cols-2 gap-5">
        {#each team.pokemons as mon}
            <div class="monWrapper flex items-center justify-center relative bg-slate-200 p-4">
                <i
                    on:click={removeFromTeam(mon,i)}
                    class=" hover:text-black transition cursor-pointer absolute top-2 rounded left-2 text-red-600 fas fa-times"
                />
                <img
                    src="https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/{mon.name}.png"
                    alt="pokemon icon"
                />
            </div>
        {/each}
    </div>
</div>