<script>
    export let mons;
    $:console.log(mons)
	import { pokemonStoreWriteable, fetchMons } from '../../../stores/pokemonStore.js';
	import Card from '../../../../structure/pokemon-compontents/card.svelte';
	import TeamViewer from '../../../../structure/pokemon-compontents/teamViewer.svelte';
	import TeamSelector from '../../../../structure/pokemon-compontents/team-selector.svelte';

	let searchWord = '';
	let selectedGen = '';
	let filtered = [];
	$: selectedGen != '' ? fetchMons(selectedGen) : fetchMons(1);
	$: {
		if (searchWord != '') {
			filtered = $pokemonStoreWriteable.filter((mon) =>
				mon.name.includes(searchWord.toLowerCase())
			);
		} else {
			filtered = [...$pokemonStoreWriteable];
		}
	}

	const rotateAll = () => {
		if (!document.querySelector('.firstLayer.rotated')) return;
		document.querySelector('.firstLayer.rotated').classList.remove('rotated');
	};
	let monFromCard = '';
	const selectedMon = (event) => {
		monFromCard = event.detail.mon;
	};
</script>

<svelte:head>
	<title>Pokédex</title>
</svelte:head>
<TeamViewer />
<TeamSelector {monFromCard} />
<div class=" w-4/5 grid  sm:grid-cols-2 lg:grid-cols-4  md:grid-cols-3 m-auto">
	<div class="searchField m-2 col-span-4 ">
		<select class=" text-black p-2 rounded w-52 my-4" bind:value={selectedGen}>
			<option value="">Select a generation:</option>
			{#each Array(8) as gen, i}
				<option value={i + 1}> Generation {i + 1}</option>
			{/each}
		</select>
		<label for="filterMons"
			><p>Want to find a specific pokemon? Search here!</p>
			<input
				bind:value={searchWord}
				class=" text-black p-2 rounded w-52 mb-4"
				type="text"
				name="filterMons"
				id="filterMons"
				placeholder="Golurk"
			/>
		</label>
	</div>
	{#each filtered as mon}
		<Card on:selectedMon={selectedMon} {rotateAll} {mon} />
	{/each}
</div>
