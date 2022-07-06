import { prisma } from '$lib/db'

export async function get() {
	
	const returnData = [
		await prisma.Pokemon.findMany({
			where:{
				generation: 1
			}
		}),
		await prisma.Pokemon.findMany({
			where:{
				generation: 2
			}
		}),
		await prisma.Pokemon.findMany({
			where:{
				generation: 3
			}
		}),
		await prisma.Pokemon.findMany({
			where:{
				generation: 4
			}
		}),
		await prisma.Pokemon.findMany({
			where:{
				generation: 5
			}
		}),await prisma.Pokemon.findMany({
			where:{
				generation: 6
			}
		}),await prisma.Pokemon.findMany({
			where:{
				generation: 7
			}
		}),
		await prisma.Pokemon.findMany({
			where:{
				generation: 8
			}
		})
	];
	
	return {
		body: { returnData }
	};
	
}
