<script>

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
	export let mon;
    export let rotateAll;
    import { popStore } from '../../stores/popstore.js';
    import { teamStoreWriteable } from '../../stores/teamStore.js';
    import { createTeam } from '$lib/createObjInstance/team.js';
    
    const addToTeam = (mon) => {
        
        if(!$teamStoreWriteable.length){
            dispatch('noticeNew',{});
            const teamToAdd = createTeam();
            teamToAdd.pokemons.push(mon);
            $teamStoreWriteable = [...$teamStoreWriteable, teamToAdd];
            return
        }
        dispatch('selectedMon', { mon });
        popStore.update( e => e = !e);
        
    }
    let rotated = false;
    
</script>
<div class="wrapper relative  aspect-square ">
    <div on:click={()=>{rotateAll();rotated = !rotated}} class:rotated class=" firstLayer shadow-2xl z-20 absolute top-0 left-0 group hover:bg-blue-200 hover:scale-105 w-full h-full transition ease-in-out cursor-pointer flex flex-col bg-slate-300  rounded-sm items-center border-black border-2 justify-center">
        <h2 class=" group-hover:text-black">	
            #{mon.id}: <span class=" capitalize">{mon.name}</span>
        </h2>
        <img class="w-32 object-cover pointer-events-none" src={mon.img} alt={mon.name} />
    </div>
    <div class="secondLayer absolute top-0 z-10 bg-slate-50 rounded-sm w-1/2 grid grid-rows-2 grid-cols-1 justify-center items-center justify-items-center right-0 h-full">
        <a href="/pokemons/{mon.id}" class=" w-4/5 h-4/5 flex border-2 group border-black justify-center items-center">
            <div class="box group group-hover:-translate-y-1 transition w-full h-full flex justify-center items-center">
                <i class="fas fa-book-open text-2xl transition group-hover:text-green-300"></i>
            </div>
        </a>
        <div on:click={addToTeam(mon)} class="box group w-4/5 h-4/5 flex border-2 cursor-pointer border-black justify-center items-center">
            <i class="fas fa-plus transition text-2xl group-hover:rotate-90 group-hover:text-green-300"></i>
        </div>
    </div>
</div>
<style>
    .rotated{
        transform: translateX(-50%);
    }
    
</style>
