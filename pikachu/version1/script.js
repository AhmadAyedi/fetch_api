function fetchPokemon() {
    let pokemonName = document.getElementById("pokemonName").value.toLowerCase();
    let imageElement = document.getElementById("pokemonImage");
    let errorElement = document.getElementById("error");

    if (pokemonName === "") {
        errorElement.textContent = "Please enter a Pokémon name!";
        imageElement.style.display = "none";
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon not found!");
            }
            return response.json();
        })
        .then(data => {
            let imageUrl = data.sprites.front_default;
            imageElement.src = imageUrl;
            imageElement.style.display = "block"; // Show the image
            errorElement.textContent = ""; // Clear any errors
        })
        .catch(error => {
            errorElement.textContent = "Pokémon not found!";
            imageElement.style.display = "none";
        });
}
