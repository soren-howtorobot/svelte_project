<script context="module">
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
        return {
            status:200,
            props:{
                teamData:data
            }
        }
    }
</script>
<script>
    export let teamData;
</script>
<h1>Welcome! </h1>
<p>Here are your teams:</p>
{#each teamData.userTeams as team}
    {team.team_name}
{/each}