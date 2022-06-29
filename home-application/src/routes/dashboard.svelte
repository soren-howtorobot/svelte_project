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
    console.log(teamData);
    const updateTeam = (index,newTeamName) => {
        teamData[index].team_name = newTeamName;
    }
    const removeFromTeam = () => {
        
    }
    const saveTeam = () => {
        
    }
</script>
<h1 class="text-center">Welcome {$session.payload.user_fname} {$session.payload.user_lname}!</h1>
<p class="text-center">Here are your teams:</p>
<div class="teamsWrapper grid grid-cols-2">
    {#each teamData as team,i}    
        <TeamBlock {saveTeam} {removeFromTeam} {updateTeam} {team} {i}/>
    {/each}
</div>