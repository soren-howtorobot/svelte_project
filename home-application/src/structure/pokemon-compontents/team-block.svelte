<script>
    export let removeFromTeam;
    export let i;
    export let team;
    export let updateTeam;
    let editReady = false;
    let newTeamName = "";  
    
</script>

<div class="teamWrapper-container">
    {#if !editReady}
    <p class=" text-center mb-2">Team Name: <br><span>{team.teamName}</span><i on:click={()=>{editReady = !editReady}} class=" ml-2 fas fa-pencil-alt"></i></p>
    {:else}
        <input bind:value={newTeamName} type="text"> <i on:click={()=>{updateTeam(i,newTeamName);editReady = !editReady}} class="fas fa-check"></i>
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