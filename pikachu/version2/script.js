function fetchPokemon() {
    let pokemonName = document.getElementById("pokemonName").value.toLowerCase();
    let imageElement = document.getElementById("pokemonImage");
    let errorElement = document.getElementById("error");
    let loadingElement = document.getElementById("loading");

    if (pokemonName === "") {
        errorElement.textContent = "Please enter a Pokémon name!";
        imageElement.style.display = "none";
        loadingElement.style.display = "none";
        return;
    }

    loadingElement.style.display = "block"; // Show loading text
    imageElement.style.display = "none"; // Hide image

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon not found!");
            }
            return response.json();
        })
        .then(data => {
            let imageUrl = data.sprites.front_default;
            let pokeID = data.id;
            let pokeType = data.types.map(type => type.type.name).join(", ");
            let pokeExp = data.base_experience;

            imageElement.src = imageUrl;
            imageElement.style.display = "block";
            errorElement.textContent = "";

            document.getElementById("pokemonID").textContent = `ID: ${pokeID}`;
            document.getElementById("pokemonType").textContent = `Type: ${pokeType}`;
            document.getElementById("pokemonExp").textContent = `Base XP: ${pokeExp}`;
        })
        .catch(error => {
            errorElement.textContent = "Pokémon not found!";
            imageElement.style.display = "none";
        })
        .finally(() => {
            loadingElement.style.display = "none"; // Hide loading text
        });
}

// Trigger search when user presses Enter
document.getElementById("pokemonName").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        fetchPokemon();
    }
});

// Show a random Pokémon on page load
window.onload = function () {
    let randomPokemon = Math.floor(Math.random() * 151) + 1; // Get a random Pokémon (1-151)
    document.getElementById("pokemonName").value = randomPokemon;
    fetchPokemon();
};
