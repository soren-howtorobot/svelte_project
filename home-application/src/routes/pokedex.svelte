<script>
    import { pokemonStoreWriteable, getGen } from "../stores/pokemonStore.js";
    import Card from "../structure/monData/card.svelte";
    import { teamStoreWriteable } from '../stores/teamStore.js';
    const addToTeam = (monID) => {
        $teamStoreWriteable = [...$teamStoreWriteable,monID];
    }
    let searchWord = '';
    let selectedGen = '';
    let filtered = [];
    $:selectedGen != '' ? getGen(selectedGen) : getGen(1);
    $:{
        console.log($teamStoreWriteable);
        if (searchWord != '') {
            filtered = $pokemonStoreWriteable.filter( mon => mon.name.includes(searchWord.toLowerCase()));
        }else{
            filtered = [ ... $pokemonStoreWriteable];
        }
    }
    

</script>
<svelte:head>
    <title>Pokédex</title>
</svelte:head>
<div class=" w-4/5 grid  sm:grid-cols-2 lg:grid-cols-4  md:grid-cols-3 m-auto" >
    <div class="searchField m-2 col-span-4 ">
        <select class=" text-black p-2 rounded w-52 my-4" bind:value={selectedGen}>
            <option value="">Select a generation:</option>
            {#each Array(8) as gen,i}
                 <option value="{i+1}"> Generation {i+1}</option>
            {/each}
        </select>
        <label for="filterMons"><p>Wanna find a specific pokemon? Search here!</p>
            <input bind:value="{searchWord}" class=" text-black p-2 rounded w-52 mb-4" type="text" name="filterMons" id="filterMons" placeholder="Golurk">
        </label>
    </div>
    {#each filtered as mon}
         <Card add={addToTeam} mon={mon}/>
    {/each}
</div>