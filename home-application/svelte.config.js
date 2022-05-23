import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		target: '#svelte',
		files: {
			lib: 'src/lib',
		}
	}
};

export default config;
