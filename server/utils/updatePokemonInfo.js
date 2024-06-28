const pokemonJSON = require("./json/pokedex.json");
const fs = require("fs");

function updatePokedex() {
  let updatedPokedex = [];

  for (pokeI = 0; pokeI < pokemonJSON.length; pokeI++) {
    let pokemon = pokemonJSON[pokeI];

    if (pokemon.pokemonName === "zarude") {
      console.log("Zarude");
      pokemon.forms[0].sprite = pokemon.sprite;
      pokemon.forms[0].shinySprite = pokemon.shinySprite;
      updatedPokedex.push(pokemon);
    } else {
      updatedPokedex.push(pokemon);
    }
  }

  const stringifiedPokedex = JSON.stringify(updatedPokedex);

  fs.writeFile("./utils/json/pokedex.json", stringifiedPokedex, (err, res) =>
    err ? console.log(err) : console.log("Done!")
  );
}

updatePokedex();
