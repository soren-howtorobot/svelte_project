<script>
    export let min = '';
    export let max = '';
    export let label = '';
    let value = '';
    let confirmValue = '';
    let state = 'default';
    let confirmState = 'default';
    let errors = [];

    $:{
        if(value != ''){
            errors = [];
            if(value.length < min){
                errors = [...errors,`${label} is too short`]
            }
            if(value.length > max){
                errors = [...errors,`${label} is too long`]
            }


        }
        else{
            errors = [];
            state = 'default'
        }
    }
</script>
<label for="" class="border border-slate-800 p-4 rounded-lg my-4">
    <p class="text-lg">{label}</p>
    <input type="password" class="px-2 pb-0 {state} focus:outline-none text-black border-b-slate-400 border-b-2 border-b-solid"
    bind:value={value}
    >
    <div class="rules border border-black p-4 mt-2 text-sm">
        <p class="mb-2">Password <i>must</i> follow these criteria:</p>
        <p>Must be longer than {min} characters</p>
        <p>Must be shorter than {max} characters</p>
        <p>Must have a capitalized character</p>
        <p>Must have a special character</p>
    </div>
</label>

<label for="" class="border border-slate-800 p-4 rounded-lg my-4">
    <p class="text-lg">Confirm {label}</p>
    <input type="password" class="px-2 pb-0 {confirmState} focus:outline-none text-black border-b-slate-400 border-b-2 border-b-solid"
    bind:value={confirmValue}
    >
</label>
{#each errors as error}
    <p class="text-red-600 ml-4">{error}</p>
{/each}
<style>

    .valid{
        border-color: rgb(10, 153, 3);
    }
    .invalid{
        border-color: rgb(252, 81, 81);
    }
</style>