<script>
  let scroll;
  let totalHeight;
  
</script>
<svelte:window bind:innerHeight={totalHeight} bind:scrollY={scroll}/>
<div class="topNav {scroll > 0 ? 'placedRight':'placedTop'} flex-col">
    <i class="fas fa-ghost text-6xl my-10"></i>
    <nav>
        <ul class="flex items-center gap-10">
            <a href="/">Home</a>
            <a href="/discussion">Discussion</a>
            <a href="/faq">FAQ</a>
            <a href="/user">Login / logout</a>
        </ul>
    </nav>
</div>

<style>
    .topNav{
        transition:0.3s;
    }
    .placedRight{
        position: sticky;
        display: flex;
        top: 20px;
        width: 100px;
        left: 90%;
        right: 10px;
        
        justify-content: center;
        align-items: center;
       
    }
    .placedRight ul{
        flex-direction: column;
    }
    .placedTop{
        height: 200px;
        
        right: 0;
        position: sticky;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>