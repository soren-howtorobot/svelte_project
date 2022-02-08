<script>
    async function connectToDB(){
        const res = await fetch('http://localhost:8080/getUser');
        const data = await res.text();
        	if (data) {
			return data;
		} else {
			throw new Error(data);
		}
    }
    let context = connectToDB();
   
    
</script>
<svelte:head>
    <title>About</title>
</svelte:head>
<div>
    {#await context}
	    <p>...waiting</p>
    {:then context}
	    <p>{context}</p>
    {:catch error}
        <p>
            There have been a server error, please try again later 
            <br>
            {error}
        </p>
    {/await}
</div>