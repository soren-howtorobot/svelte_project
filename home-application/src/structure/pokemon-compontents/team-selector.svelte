<script>
    import { popStore } from "../../stores/popstore.js";
    import { teamStoreWriteable } from "../../stores/teamStore.js";
    export let monFromCard;
    let multipleInserts = false;
    const addToTeam = (i) => {
        
        if(monFromCard == ""){
            return alert('How did you open this with no pokemon?');
        }
        $teamStoreWriteable[i].pokemons = [...$teamStoreWriteable[i].pokemons,monFromCard];
        if(!multipleInserts){
            storeUpdate();
            return
        }
    }
    const storeUpdate = () => {
        popStore.update(e => e = !e);
    }
    $:console.log(multipleInserts);
</script>
    {#if $popStore}
        <div class="wrapper">
            <div on:click={()=>{storeUpdate()}} class="background bg-black h-full cursor-pointer w-full absolute flex justify-center items-center opacity-50"></div>
            <div class="modal-content rounded-lg">
                <h1 class=" relative text-center text-2xl mt-4 pb-4 border-b border-slate-900">Which team to add to? <i on:click={()=>{storeUpdate()}} class=" cursor-pointer absolute right-5 hover:text-red-600 transition fas fa-times-circle"></i></h1>
                <div class="teamcontainer">
                    <div class="introArea">
                        <div class="checkforMultiple">
                            <p class="text-center mt-4 flex items-center justify-center">Want to add your pokemon to more teams? <input class="ml-2" type="checkbox" bind:checked="{multipleInserts}" name="" id=""></p>
                        </div>
                    </div>
                    <div class=" overflow-y-scroll max-h-60">
                        {#each $teamStoreWriteable as team,i}
                        <div class="teamWrapper flex row items-center  m-5 border border-black ">
                            <div on:click={()=>{addToTeam(i)}} class="addToTeamBtn h-16 w-10 flex items-center justify-center border border-black mx-4 hover:bg-green-100 transition cursor-pointer rounded">
                                <i class="fas fa-plus"></i>
                            </div>
                            <div class="teamContainerWrapper">
                                <p>{team.teamName}</p>
                                <div class="mons grid-cols-3">
                                    {#each team.pokemons as mon}
                                        <div class="monWrapper">
                                            <img src={mon.img} alt={mon.name}>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
    {/if}
    

<style>
   .wrapper{
       width:100vw;
       height: 100vh;
       position: fixed;
       top: 0;
       left: 0;
       display: flex;
       align-items: center;
       justify-content: center;
       z-index: 30;
   }
   .modal-content{
       z-index: 40;
       width: 600px;
       height: 400px;
       background-color: white;
   }
</style>