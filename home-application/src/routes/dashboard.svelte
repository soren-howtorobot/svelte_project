<script context="module">

   export const load = async ({ session }) => {
        if(Object.keys(session).length == 0){
            return{
                status:302,
                redirect:'/user'
            }
        }
        const conn = fetch('/apis/teams/getUserTeam',{
            method:'POST',
            body: JSON.stringify({})
        });
        return {}
    }
</script>