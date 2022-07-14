<script>
	import { pokemonStoreWriteable } from '/src/stores/pokemonStore.js';
	import Card from "$lib/pokemonComps/card.svelte"
	import TeamViewer from '$lib/teamComps/teamViewer.svelte';
	import TeamSelector from '$lib/teamComps/team-selector.svelte';
	import SearchField from '$lib/pokemonComps/search.svelte';
	
	const rotateAll = () => {
		if (!document.querySelector('.firstLayer.rotated')) return;
		document.querySelector('.firstLayer.rotated').classList.remove('rotated');
	};
	let monFromCard = '';
	let newMonAdded=false;
	const selectedMon = (event) => {
		monFromCard = event.detail.mon;
	};
	const flipMon = () => {
		newMonAdded = false;
	}
</script>

<svelte:head>
	<title>Pokédex</title>
</svelte:head>
<SearchField />
<TeamViewer on:updateNotice={flipMon} {newMonAdded} />
<TeamSelector on:updateNotice={()=>{newMonAdded = true}} {monFromCard} />
<div class="mainWrapper">
	<div class="monArea">
		{#each $pokemonStoreWriteable as gen}
			<div id="GEN_{gen.generation}" class="genWrapper my-12">
				<h2 class=" text-xl mb-2">{#if !gen.search}
					Generation:
				{/if}{gen.generation}</h2>
				<div class="pokemonArea grid gap-4 grid-cols-5">
					
						{#each gen.pokemons as mon}	
							<Card on:noticeNew={()=>{newMonAdded = true}} on:selectedMon={selectedMon} {rotateAll} {mon} />
						{:else}
								<p class="col-span-5">No pokemons found</p>
						{/each}
					
					
				</div>
			</div>
		{/each}
	</div>
</div>
