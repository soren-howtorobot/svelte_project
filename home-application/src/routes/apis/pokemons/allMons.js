import { prisma } from '$lib/db'

export async function get() {
	
	const returnData = [
		await prisma.Pokemon.findMany({
			where:{
				generation: 1
			},
			include:{
				type:true
			}
		}),
		await prisma.Pokemon.findMany({
			where:{
				generation: 2
			},
			include:{
				type:true
			}
		}),
		await prisma.Pokemon.findMany({
			where:{
				generation: 3,
			},
			include:{
				type:true
			}
		}),
		await prisma.Pokemon.findMany({
			where:{
				generation: 4
			},
			include:{
				type:true
			}
		}),
		await prisma.Pokemon.findMany({
			where:{
				generation: 5
			},
			include:{
				type:true
			}
		}),await prisma.Pokemon.findMany({
			where:{
				generation: 6
			},
			include:{
				type:true
			}
		}),await prisma.Pokemon.findMany({
			where:{
				generation: 7
			},
			include:{
				type:true
			}
		}),
		await prisma.Pokemon.findMany({
			where:{
				generation: 8
			},
			include:{
				type:true
			}
		})
	];
	
	return {
		body: { returnData }
	};
	
}
