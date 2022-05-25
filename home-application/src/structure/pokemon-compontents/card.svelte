<script>

    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
	export let mon;
    export let rotateAll;
    import { popStore } from '../../stores/popstore.js';
    import { teamStoreWriteable } from '../../stores/teamStore.js';
    import { createTeam } from '$lib/createObjInstance/team.js';
    let rotated;
    const addToTeam = (mon) => {
        if(!$teamStoreWriteable.length){
            const teamToAdd = createTeam();
            teamToAdd.pokemons.push(mon);
            $teamStoreWriteable = [...$teamStoreWriteable, teamToAdd];
            return
        }
        dispatch('selectedMon', { mon });
        popStore.update( e => e = !e);
        
    }
    
    
</script>
<div class="wrapper relative h-36 m-2 p-4 ">
    <div on:click={()=>{rotateAll();rotated = !rotated}} class:rotated class=" firstLayer shadow-2xl z-20 absolute top-0 left-0 group hover:bg-blue-300 w-full h-full transition cursor-pointer flex flex-col bg-slate-300  rounded-sm items-center border-black border-2 justify-center">
        <h2 class=" group-hover:text-black">	
            #{mon.id}: <span class=" capitalize">{mon.name}</span>
        </h2>
        <img class="w-32 object-cover pointer-events-none" src={mon.img} alt={mon.name} />
    </div>
    <div class="secondLayer absolute top-0 z-10 bg-slate-300 rounded-sm w-1/2 grid grid-rows-2 grid-cols-1 justify-center items-center justify-items-center right-0 h-full">
        <a href="/pokemons/{mon.id}" class=" w-4/5 h-4/5 flex justify-center items-center">
            <div class="box w-full h-full flex justify-center items-center">
                <i class="fas fa-book-open"></i>
            </div>
        </a>
        <div on:click={addToTeam(mon)} class="box w-4/5 h-4/5 flex justify-center items-center">
            <i class="fas fa-plus"></i>
        </div>
    </div>
</div>
<style>
    .rotated{
        transform: translateX(-50%);
    }
    .box{
        border: solid 2px black;
        border-radius: 8px;
        box-sizing: border-box;
        color: rgb(19, 80, 100);
        transition: 0.3s;
        cursor: pointer;
    }
    .box i{
        font-size: 1.5em;
    }
    .box:hover{
        color: rgb(64, 64, 248);
    }

</style>
