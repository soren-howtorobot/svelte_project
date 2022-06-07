<script>
	import { pokemonStoreWriteable } from '../stores/pokemonStore.js';
	import Card from "../structure/pokemon-compontents/card.svelte"
	import TeamViewer from '../structure/pokemon-compontents/teamViewer.svelte';
	import TeamSelector from '../structure/pokemon-compontents/team-selector.svelte';
	
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
<TeamViewer on:updateNotice={flipMon} {newMonAdded} />
<TeamSelector on:updateNotice={()=>{newMonAdded = true}} {monFromCard} />
<div class="mainWrapper">
	<div class="monArea">
		{#each $pokemonStoreWriteable as gen}
			<div class="genWrapper my-12">
				<h2 class=" text-xl mb-2">Generation {gen.generation}</h2>
				<div class="pokemonArea grid gap-4 grid-cols-5">
					{#each gen.pokemons as mon}	
						<Card on:noticeNew={()=>{newMonAdded = true}} on:selectedMon={selectedMon} {rotateAll} {mon} />
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
