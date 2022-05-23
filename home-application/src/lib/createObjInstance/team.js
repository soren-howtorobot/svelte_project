import {getName} from '$lib/teamNameGenerator/coolTeamNameGenerator.js'
export const createTeam = () =>{
    return {
        teamName: getName(),
        pokemons:[]
    }
}