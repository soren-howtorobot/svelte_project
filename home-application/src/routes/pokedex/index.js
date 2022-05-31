import { prisma } from '$lib/db';

export async function get({ params }) {
  // `params.id` comes from [id].js
    const mons = await prisma.Pokemon.findMany({
        where: {
            generation: 1
        }
    });
    console.log(mons);
  if (mons) {
    return {
      body: { mons }
    };
  }
 
  return {
    status: 404
  };
}