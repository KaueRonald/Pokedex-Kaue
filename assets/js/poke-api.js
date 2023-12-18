
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.order
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default


    pokeDetail.stats.forEach(stat => {
        switch (stat.stat.name) {
            case "hp":
                pokemon.hp = stat.base_stat;
                break;
            case "attack":
                pokemon.atk = stat.base_stat;
                break;
            case "defense":
                pokemon.def = stat.base_stat;
                break;
            case "special-attack":
                pokemon.satk = stat.base_stat;
                break;
            case "special-defense":
                pokemon.sdef = stat.base_stat;
                break;
            case "speed":
                pokemon.spd = stat.base_stat;
                break;
            default:
                break;
        }
    });

    pokemon.weight = pokeDetail.weight
    pokemon.height = pokeDetail.height
    pokemon.id = pokeDetail.id


    return pokemon
}

pokeApi.getPokemonById = (pokemonId) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;

    return fetch(url)
        .then((response) => response.json())
        .then((pokeDetail) => convertPokeApiDetailToPokemon(pokeDetail));
};

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then((convertPokeApiDetailToPokemon))
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonsDetails) => pokemonsDetails)
}
