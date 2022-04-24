import { writable } from "svelte/store";

export const pokemonStoreWriteable = writable([]);

const fetchMons = async (limit,offset) => {
    const conn = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await conn.json();
    const loadedPokemon = data.results.map((data, index) => {
		const whiteListed = ['normal','plant','altered','land','incarnate','standard','aria','ordinary','red','shield','average','male','50','solo','midday','disguised','baile','full','amped','ice','single'];
		let name = data.name;
		if (data.name.indexOf('-') != -1 && whiteListed.includes(data.name.split('-')[1])) {
			name = data.name.split('-')[0];
		} 
			return {
				name: name,
				id: offset + index + 1,
				img: `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${name}.png`
			};
		});
   pokemonStoreWriteable.set(loadedPokemon);
}
export const getGen = (gen) => {
	switch (gen) {
		case 1:
			fetchMons(151, 0);
			break;
		case 2:
			fetchMons(100, 151);
			break;
		case 3:
			fetchMons(135,251)
			break;
		case 4:
			fetchMons(108,386)
			break;
		case 5:
			fetchMons(155,494)
			break;
		case 6:
			fetchMons(72,649)
			break;
		case 7:
			fetchMons(88,721)
			break;
		case 8:
			fetchMons(89,809)
			break;
	}
}
