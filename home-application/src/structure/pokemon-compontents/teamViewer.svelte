<script>
    import { teamStoreWriteable } from '../../stores/teamStore.js';
    
    
</script>

<div class="teamViewer p-5 fixed top-1/4 right-10 border-2 border-black border-solid">
    <p>Current teams:</p>
    {#each $teamStoreWriteable as mon}
        <div class="monWrapper">
            				

            <img src = 'https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/{mon}.png' alt="pokemon icon">
        </div>
    {/each}
</div>