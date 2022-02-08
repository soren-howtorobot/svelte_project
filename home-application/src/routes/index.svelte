<script>
    "use strict";
    let count = 0;
    
    $: doubled = count * 2;
    
	function handleClick() {
		count += 1;
	}
   </script>
<svelte:head>
    <title>Welcome!</title>
</svelte:head>



<section class=" bg-gradient-to-b from-slate-400 rounded-t-md to-slate-300 p-10">
    <h1 class=" text-4xl">Introduction</h1>
    <h3 class=" my-2 text-2xl">Welcome to my home page!</h3>
    <p>
       This is my home page made with Svelte, my favorite framework! <br>
    </p>
</section>
<section class="bg-gradient-to-b from-slate-300 to-slate-200 p-10 h-[10000px]">
    <h2 class=" text-4xl">Test Area</h2> <br>
    <button on:click={handleClick} class=" border border-slate-700 p-4 bg-slate-600 text-white rounded-2xl  ">
	    Clicked {count} {count === 1 ? 'time' : 'times'} * 2 = {doubled}
    </button>
   
</section>
