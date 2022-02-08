module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily:{
				'outfit':['Outfit','sans-serif'],
				'roboto':['Roboto','sans-serif'],
				
			}
		}
	},
	options: {
        safelist: [/(from|via|to|border|bg|text)-(.*)-(\\d{1}0{1,2})/]
    },
	plugins: []
};
