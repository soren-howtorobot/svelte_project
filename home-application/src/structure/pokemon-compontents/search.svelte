<script>
    let searchString = "";
    const searchInDB = async () => {
        const conn = await fetch('/endpoints/searchMon', {
            method: 'POST',
            body: JSON.stringify({ searchString })
	    });
        const data = await conn.json();
        console.log(data);
        
    }
</script>

<div class="searchBlock bg-white w-fit">
    <form class=" flex p-4 rounded flex-col" on:submit={(e)=>{
        e.preventDefault();
        searchInDB();
    }}>
        <label for="searchField">Search here for specific pokemon!</label>
        <input bind:value={searchString} class=" mt-4 w-44 border-b border-black bg-transparent focus:outline-none" id="searchField" placeholder="Golurk" type="text">
    </form>
    

</div>