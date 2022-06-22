<script>
	import { teamStoreWriteable } from '/src/stores/teamStore.js';
	import { createEventDispatcher } from 'svelte';
	import {createTeam} from '$lib/createObjInstance/team.js'
	import TeamBlock from './team-block.svelte';
	const dispatch = createEventDispatcher();

	export let newMonAdded;
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
	const ejectEvent = () => {
		dispatch('updateNotice', { variable: !newMonAdded });
	}
	
	let extended = false;
</script>

{#if $teamStoreWriteable.length != 0}

	<div class:extended class="teamViewer p-5 transition fixed top-1/4 right-4 bg-slate-300  border-2 rounded border-black border-solid">
		<div on:click={()=>{extended=!extended; ejectEvent()}} class="teamViewerLabel cursor-pointer rounded-l bg-slate-300 absolute group -left-10 w-10 border-t-2 border-b-2 border-l-2 border-r-0 border-black border-solid flex py-2 items-center justify-center ">
			<i class:newMonAdded class=" label text-xl group-hover:-translate-x-1 transition fas fa-arrow-circle-left"></i>
		</div>
		<p class=" text-lg mb-4">Current teams:</p>
		
		<div class="teamWrapper h-60 overflow-x-scroll ">
			{#each $teamStoreWriteable as team,i}
				<TeamBlock {team} {i} {removeFromTeam} {updateTeam}/>
			{/each}
		</div>
		<div class="addTeam w-fit mt-4">
			<p class=" cursor-pointer transition group" on:click = {addTeam} >Add another team <i  class=" transition group-hover:rotate-90 group-hover:text-green-300 cursor-pointer fas fa-plus"></i></p>
		</div>
	</div>
{/if}
<style>
	
	.extended div i.label{
		transform: rotate(180deg);
	}
	.teamViewer{
		width: 400px;
		transform: translateX(416px);
		z-index: 40;
	}
	.extended{
		transform:translateX(10px);
	}
	.newMonAdded{
		
		animation-name: notice;
  		animation-duration: 1s;
		animation-iteration-count: infinite;
	}
	@keyframes notice {
		0% {
			transform: scale(1.1);
			color: rgba(122, 221, 92,1);
			
		}
		50% {
			transform: scale(1);
			color: rgb(53, 95, 40);

		}
		100%{
			transform: scale(1.1);
			color: rgba(122, 221, 92,1);


		}
	}
</style>