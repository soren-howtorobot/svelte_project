import { writable } from "svelte/store";
export const pokemonStoreWriteable = writable([]);


export const fetchMons = async() =>{
	const conn = await fetch(
		`http://127.0.0.1:3000/endpoints/allMons`
	);
	const preData = await conn.json();
	const arr = preData.returnData.map(e => {
		return {
			generation: e[0].generation,
			pokemons: e.map(x => {
				return {
					name: x.name,
					id: x.id,
					img: `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${x.name}.png`
				};
			})
		}
	});
	
	pokemonStoreWriteable.set(arr);
}

fetchMons()
/* const fetchMons = async (limit,offset,gen) => {
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
		stashMons(loadedPokemon,gen)
   pokemonStoreWriteable.set(loadedPokemon,gen);
}
export const getGen = (gen) => {
	switch (gen) {
		case 1:
			fetchMons(151, 0,gen);
			break;
		case 2:
			fetchMons(100, 151, gen);
			break;
		case 3:
			fetchMons(135, 251, gen);
			break;
		case 4:
			fetchMons(108, 386, gen);
			break;
		case 5:
			fetchMons(155, 494, gen);
			break;
		case 6:
			fetchMons(72, 649, gen);
			break;
		case 7:
			fetchMons(88, 721, gen);
			break;
		case 8:
			fetchMons(89, 809, gen);
			break;
	}
}
const stashMons = async (monData, gen) => {
	const conn = await fetch('http://localhost:8080/pokemons/stashMons', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ monData, gen })
	});
	const data = await conn.json();
	console.log(data);
};  */