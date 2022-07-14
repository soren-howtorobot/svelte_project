/* import { prisma } from '$lib/db';

export const get = async () => {
    const allMons = await prisma.pokemon.findMany();
    const allType = await prisma.type.findMany();
    allMons.forEach(mon => {
        getAnUpdate(mon,allType)
    });


    return {
        staus:200,
        body:{
            allMons,allType
        }
    }
};
const getAnUpdate = async(mon,localTypes) => {
    const conn = await fetch(`https://pokeapi.co/api/v2/pokemon/${mon.id}`);
    const data = await conn.json();
    console.log(data);
    const connectArr = data.types.map(t => {
       return {id:localTypes.find(e => {
        if(e.name.toLowerCase() == t.type.name){
            return e.id
        }
       }).id}
    });
    const updateObj = await prisma.pokemon.update({
        where:{
            id:parseInt(mon.id)
        },
        data:{
            type:{
                connect: connectArr
            }
        }
    })
}
 */