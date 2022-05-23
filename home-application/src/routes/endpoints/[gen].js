import { prisma } from '$lib/db'

export async function get({ params }) {
	const pokemon_gen = await prisma.Pokemon.findMany({
		where: {
			generation: parseInt(params.gen)
		}
	});

	if (pokemon_gen) {
		return {
			body: { pokemon_gen }
		};
	}

	/* return {
    status: 404
  }; */
	return {
		status: 200,
		body: {
			message: 'Hi mom!'
		}
	};
}
