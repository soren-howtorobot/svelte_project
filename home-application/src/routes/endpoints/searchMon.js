import { prisma } from '$lib/db'
export async function post({request}) {
    const incomming_data = await request.json();
    const search_results = await prisma.Pokemon.findMany({
        where:{
            name: {
                contains: incomming_data.searchString.toLowerCase()
            },
        },
    });
    if(search_results){
        return {
            body: { search_results }
        };
    }else{
        return {
            body:{
                message:'No Mons found'
            }
        }
    }
	
}
