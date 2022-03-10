<script>
    export let mon;
    
</script>

<a href="pokemons/{mon.id}">
    <div 
    class=" relative group hover:bg-blue-300 transition cursor-pointer h-36 flex flex-col bg-slate-700 m-2 p-4 rounded-sm items-center justify-center"
>
             <h2 class = " group-hover:text-black absolute top-2">#{mon.id}: <span class=" capitalize">{mon.name}</span></h2>
             <img class = " w-32 object-cover" src="{mon.img}" alt="{mon.name}">
</div>
</a>