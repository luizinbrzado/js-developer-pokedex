const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const filterByTypeButton = document.getElementById('filterByTypeButton');
const filterTypeInput = document.getElementById('filterTypeInput');
const maxRecords = 151;
const limit = 10;
let offset = 0;
let currentTypeFilter = '';

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadFilteredPokemon(typeFilter) {
    pokeApi.getPokemons()
        .then((pokemons = []) => {
            const filteredPokemons = typeFilter
                ? pokemons.filter((pokemon) => pokemon.types.includes(typeFilter))
                : pokemons;

            const newHtml = filteredPokemons.map(convertPokemonToLi).join('');
            pokemonList.innerHTML = newHtml;
        })
        .catch((error) => {
            console.error('Error loading Pokémon:', error);
        });
}

loadFilteredPokemon(offset, limit);

filterByTypeButton.addEventListener('click', () => {
    const typeFilter = filterTypeInput.value.toLowerCase();
    pokemonList.innerHTML = '';
    loadFilteredPokemon(typeFilter);
});

filterTypeInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const typeFilter = filterTypeInput.value.toLowerCase();
        pokemonList.innerHTML = '';
        loadFilteredPokemon(typeFilter);
    }
});
