<script>
    import { onMount } from "svelte";
    import { fly } from 'svelte/transition';
    export let statBlob;
    export let timer;
    let bar;
    onMount(()=>{
        setTimeout(() => {
            bar.style.width = statBlob.base_stat + 'px';
        }, timer*100);
    });
    
</script>
<div class="statContainer">
   <p class=" max-w-fit capitalize">{statBlob.stat.name}</p>
   <div style="width:0px" in:fly = {{ y: -20 }} bind:this={bar} class="statBar bg-red-500 transition ">{statBlob.base_stat}</div>
</div>
<style>

</style>