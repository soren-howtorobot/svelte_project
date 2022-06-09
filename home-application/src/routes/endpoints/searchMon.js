import { prisma } from '$lib/db'
export async function post({request}) {
    const incomming_data = await request.json();
    console.log(incomming_data.searchString.toLowerCase());
    const search_results = await prisma.Pokemon.findMany({
        where:{
            name: {
                search: 'bulb'
            },
        },
    });
    console.log(search_results);
    return {
        body: { search_results }
    };
	
}
