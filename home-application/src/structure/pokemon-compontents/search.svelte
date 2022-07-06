<script>
	import { pokemonStoreWriteable,fetchMons } from './../../stores/pokemonStore.js';
    
    let searchString = "";
    const searchInDB = async () => {
        if(searchString == ""){
            fetchMons()
            return
        }
        const conn = await fetch('/apis/pokemons/searchMon', {
            method: 'POST',
            body: JSON.stringify({ searchString })
	    });
        const data = await conn.json();
        $pokemonStoreWriteable = $pokemonStoreWriteable.filter( e => !e.search)
        $pokemonStoreWriteable = [{
                search:true,
                generation:`Search results for ${searchString}`,
                pokemons: data.search_results.map(x => {
				    return {
                        name: x.name,
                        id: x.id,
                        img: `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${x.name}.png`
                        }
                    }
                )
            },...$pokemonStoreWriteable];
    }
</script>

<div class="searchBlock bg-white w-fit">
    <form class=" flex p-4 rounded flex-col" on:submit={(e)=>{
            e.preventDefault();
            searchInDB();
        }}>
        <label for="searchField">Search here for specific pokemon!</label>
        <input bind:value={searchString} class=" mt-4 w-44 border-b border-black bg-transparent focus:outline-none" id="searchField" placeholder="Golurk" type="text">
    </form>
    

</div>