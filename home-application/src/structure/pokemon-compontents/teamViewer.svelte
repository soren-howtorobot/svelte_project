<script>
	import { teamStoreWriteable } from '/src/stores/teamStore.js';
	import {createTeam} from '$lib/createObjInstance/team.js'
	import TeamBlock from './team-block.svelte';
	export const removeFromTeam = (mon,i) => {
		const dataArr = $teamStoreWriteable[i].pokemons.filter((e) => e.id != mon.id);
		$teamStoreWriteable[i].pokemons = dataArr;
	};
	export const addTeam = () => {
		$teamStoreWriteable = [...$teamStoreWriteable, createTeam()];
	}
	export const updateTeam = (index,newName) => {
		$teamStoreWriteable[index].teamName = newName;
    }
</script>

{#if $teamStoreWriteable.length != 0}
	<div class="teamViewer p-5  w-44 fixed top-1/4 right-4  border-2 rounded border-black border-solid">
		<p>Current teams:</p>
		<div class="addTeam" >
			<p>Add another team <i on:click = {addTeam} class=" cursor-pointer fas fa-plus"></i></p>
		</div>
		<div class="teamWrapper ">
			{#each $teamStoreWriteable as team,i}
				<TeamBlock {team} {i} {removeFromTeam} {updateTeam}/>
			{/each}
		</div>
	</div>
{/if}
