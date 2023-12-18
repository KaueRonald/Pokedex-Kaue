const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMore');

const maxRecords = 493
const limit = 100;
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}" >
        <a class="linkDetails" href="detalhe.html?id=${pokemon.id}" id="pokemon-${pokemon.id}">
            <span class="name"> ${pokemon.name}</span>
            <span class="number">#${pokemon.id}</span>
            

            <div class="detail">
              <ol class="types">
                  ${pokemon.types.map((type) => `<li class="type ${type}" >${type}</li>`).join('')}
             </ol>

             <img src="${pokemon.photo}"
             alt="${pokemon.name}">
            </div>
        </a>
        </li>
      `).join('');
        pokemonList.innerHTML += newHtml;
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtdRecordNextPage = offset + limit;

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }

})