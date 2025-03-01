// Fetch Pokémon Data
function fetchPokemon() {
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => response.json())
        .then(data => displayPokemon(data))
        .catch(error => console.error("Pokémon not found", error));
}

// Display Pokémon
function displayPokemon(data) {
    const container = document.getElementById('pokemonContainer');
    container.innerHTML = `
        <div class="pokemon-card">
            <h3>${data.name.toUpperCase()}</h3>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p>Type: ${data.types.map(type => type.type.name).join(', ')}</p>
            <p>HP: ${data.stats[0].base_stat}</p>
            <p>Attack: ${data.stats[1].base_stat}</p>
            <p>Defense: ${data.stats[2].base_stat}</p>
            <button onclick="saveToTeam('${data.name}', '${data.sprites.front_default}')">Add to Team</button>
        </div>
    `;
}

// Compare Pokémon
function comparePokemon() {
    const poke1 = document.getElementById('pokemon1').value.toLowerCase();
    const poke2 = document.getElementById('pokemon2').value.toLowerCase();

    Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${poke1}`).then(res => res.json()),
        fetch(`https://pokeapi.co/api/v2/pokemon/${poke2}`).then(res => res.json())
    ])
        .then(([data1, data2]) => {
            document.getElementById('comparisonResult').innerHTML = `
            <div class="pokemon-card">
                <h3>${data1.name.toUpperCase()}</h3>
                <img src="${data1.sprites.front_default}">
                <p>Attack: ${data1.stats[1].base_stat}</p>
            </div>
            <div class="pokemon-card">
                <h3>${data2.name.toUpperCase()}</h3>
                <img src="${data2.sprites.front_default}">
                <p>Attack: ${data2.stats[1].base_stat}</p>
            </div>
            <h2>${data1.stats[1].base_stat > data2.stats[1].base_stat ? data1.name.toUpperCase() + " Wins!" : data2.name.toUpperCase() + " Wins!"}</h2>
        `;
        })
        .catch(error => console.error("Pokémon not found", error));
}

// Save to Team (Local Storage)
function saveToTeam(name, img) {
    let team = JSON.parse(localStorage.getItem("pokemonTeam")) || [];
    if (!team.find(pokemon => pokemon.name === name)) {
        team.push({ name, img });
        localStorage.setItem("pokemonTeam", JSON.stringify(team));
        displayTeam();
    }
}

// Display Saved Pokémon Team
function displayTeam() {
    let team = JSON.parse(localStorage.getItem("pokemonTeam")) || [];
    document.getElementById("teamList").innerHTML = team.map(pokemon => `
        <li>
            <img src="${pokemon.img}" width="50">
            ${pokemon.name.toUpperCase()}
            <button onclick="removeFromTeam('${pokemon.name}')">❌</button>
        </li>
    `).join('');
}

// Remove Pokémon from Team
function removeFromTeam(name) {
    let team = JSON.parse(localStorage.getItem("pokemonTeam")) || [];
    team = team.filter(pokemon => pokemon.name !== name);
    localStorage.setItem("pokemonTeam", JSON.stringify(team));
    displayTeam();
}

// Display team on page load
window.onload = displayTeam;
