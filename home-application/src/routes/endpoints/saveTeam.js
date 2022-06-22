import {prisma} from '$lib/db';

export async function post( {request} ){
    const request_data = await request.json();
    console.log(request_data);
    const createdTeam = await prisma.users.update({
        where:{
            id: parseInt(request_data.id)
        },
        data:{
            teams:{
                create:{
                    team_name: request_data.team.teamName,
                    pokemons: {
                        connect:request_data.team.pokemons.map(e => {return {id:e.id}}),
                    },
                    

                }
            }
        }
    });
    console.log(createdTeam);
    return{
        status:200,
        body:{
            message:'request_data'
        }
    }
}