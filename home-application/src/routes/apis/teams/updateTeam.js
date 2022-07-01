import { prisma } from "$lib/db"
export const patch = async( {request} ) => {
    const request_data = await request.json();    
        
    const updateObject = await prisma.team.update({
        where:{
            id:parseInt(request_data.team.id)
        },
        data:{
            team_name: request_data.team.team_name,
            pokemons:{
                set:request_data.team.pokemons.map(e => {return {id:parseInt(e.id)}})
            }
        }
    });
    
    return{
        status:200,
        body:{
            message:'temp'
        }
    }
}