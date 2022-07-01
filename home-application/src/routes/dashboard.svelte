<script context="module">
	
	import { format } from '$lib/commonJS/teamFormatter.js';
    import TeamBlock from '../structure/pokemon-compontents/teamComps/team-block.svelte';
    
   export const load = async ({ session }) => {
        if(Object.keys(session).length == 0){
            return{
                status:302,
                redirect:'/user'
            }
        }
        const conn = await fetch('http://127.0.0.1:3000/apis/teams/getUserTeams',{
            method:'POST',
            body:JSON.stringify({user_id:session.payload.user_id})
        });
        const data = await conn.json();
        format(data);
        return {
            status:200,
            props:{
                teamData:data.userTeams
            }
        }
    }
</script>
<script>
    import { session } from '$app/stores';
    export let teamData;
    const updateTeamName = (index,newTeamName) => {
        teamData[index].team_name = newTeamName;
        saveTeam(teamData[index])
    }
    const removeFromTeam = async(mon,index) => {
		const dataArr = teamData[index].pokemons.filter(x => x.id != mon.id);
		if(!dataArr.length){
            deleteTeam(teamData[index])
			teamData = teamData.filter( (team,i) => index != i );
			return
		}
        teamData[index].pokemons = dataArr;
        saveTeam(teamData[index])
    } 
    const deleteTeam = async(team) => {
        const conn =  await fetch('/apis/teams/deleteUserTeam',{
            method:'DELETE',
            body:JSON.stringify({user_id:$session.payload.user_id,team})
        });
        
        if(conn.ok && conn.status == 202){
            teamData = teamData.filter(val => val.id != team.id);
        }
    }
    const saveTeam = async (team) => {
        const conn = await fetch('/apis/teams/updateTeam',{
            method:'PATCH',
            body:JSON.stringify({user_id:$session.payload.user_id,team})
        });
        const data = await conn.json();
        if(conn.ok && conn.status == 202){
            //TODO: notify with message
        }
    }
</script>
<h1 class="text-center">Welcome {$session.payload.user_fname} {$session.payload.user_lname}!</h1>
<p class="text-center">Here are your teams:</p>
<div class="teamsWrapper grid grid-cols-2 gap-2">
    {#each teamData as team,i}    
        <TeamBlock {deleteTeam} {saveTeam} {removeFromTeam} {updateTeamName} {team} {i}/>
    {/each}
</div>