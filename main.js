let POKEMONS = {};
const poke_container = document.getElementById('poke_container');
const pokemons_number = 151;
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#dfb7ff',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#f0dbff',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
};

const fetchPokemons = async () => {
    poke_container.innerHTML = "";
    for (let i = 1; i <= pokemons_number; i++) {
        elt = await getPokemon(i);
        POKEMONS[elt.name] = elt
    }
}

const getPokemon = async (id) => {
    const url =`https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    return pokemon;
}

const createPokemonCard = (pokemons, filter = "") => {
    const { id, name, types } = pokemons;
    let filters = name;
    if (filter.includes("t:")) {
        filter = filter.replace('t:','');
        filters = types[0].type.name
    }
    if (filter.includes("d:")) {
        filter = filter.replace('d:','');
        filters = id.toString();
    }
    if (!filters.includes(filter)) return;
    //console.log(name, filter)
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');
    const type = types[0].type.name;
    const color = colors[type];

    pokemonEl.style.backgroundColor = color;

    const pokeInnerHTML = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png" alt="${name}" /
        >
    </div>
    <div class="info">
        <span class="number">${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span>${type}</span></
        small>
    </div>
    `;
    pokemonEl.innerHTML = pokeInnerHTML;
    poke_container.appendChild(pokemonEl)

}

const loopPokemon = (filter = "") => {
    poke_container.innerHTML = "";
    Object.values(POKEMONS).map(poke => createPokemonCard(poke,filter));
}

const start = async () => {
    await fetchPokemons();
    loopPokemon();
}
start();
document.querySelector('#searchbar').oninput = async (v) => loopPokemon(v.target.value);