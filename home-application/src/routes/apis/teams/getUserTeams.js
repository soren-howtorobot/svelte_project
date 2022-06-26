import { prisma } from '$lib/db'
import * as cookie from 'cookie';
export async function post( {request} ){
    const request_data = await request.json();
    const userTeams = await prisma.team.findMany({
        where:{
            trainer_id: parseInt(request_data.user_id)
        },
        include:{
            pokemons:true
        }
    }); 
    if(userTeams){
        return{
            status: 200,
            body:{
                userTeams
            }
        }
    }
    return{
        status:204,
        body: {message:'No teams yet! Go to pokedex to add'}
    }
}