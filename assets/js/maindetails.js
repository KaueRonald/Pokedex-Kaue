const detailsCard = document.getElementById('detailsCard');
const limit = 10;
let offset = 0;

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const pokemonId = params.get('id');
    
    console.log('pokemonId:', pokemonId);

    loadPokemonStats(pokemonId);
});

function loadPokemonStats(pokemonId) {
    pokeApi.getPokemonById(pokemonId).then((pokemon) => {
        const newHtml = `
        <img class="pokeimage" src="./assets/public/pokemon-removebg-preview.png" alt="pokemonname">
            <div class="pokecolor ${pokemon.type}">
                <img class="pokeimage"
                    src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
            <div class="pokemon">

                <div class="name_number">
                    <span class="name">${pokemon.name}</span>
                    <span class="number">#${pokemon.id}</span>
                </div>

                <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}" >${type}</li>`).join('')}
                </ol>

                <div class="pokeimc">
                    <span class="weight">Peso: ${pokemon.weight / 10}kg</span>
                    <span class="height">Altura: ${pokemon.height}0cm </span>
                </div>

                <span class="stats">status: </span>
                <ol class="statsList">
                    <li>HP: ${pokemon.hp}</li>
                    <li>attack: ${pokemon.atk}</li>
                    <li>defense: ${pokemon.def}</li>
                    <li>special-attack: ${pokemon.satk}</li>
                    <li>special-defense: ${pokemon.sdef}</li>
                    <li>speed: ${pokemon.spd}</li>
                </ol>

            </div>
        `;
        detailsCard.innerHTML += newHtml;
    })
}
