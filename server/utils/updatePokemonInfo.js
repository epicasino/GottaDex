const pokemonJSON = require("./json/pokedex.json");
const fs = require("fs");

function updatePokedex() {
  let updatedPokedex = [];

  for (pokeI = 0; pokeI < pokemonJSON.length; pokeI++) {
    let pokemon = pokemonJSON[pokeI];

    if (pokemon.pokemonName === "zarude") {
      // console.log("Zarude");
      pokemon.forms[0].sprite = pokemon.sprite;
      pokemon.forms[0].shinySprite = pokemon.shinySprite;
      updatedPokedex.push(pokemon);
    } else {
      // checks if pokemon has any of these abilities && gets rid of their hidden ability property and hidden ability caught properties
      if (
        /protosynthesis|quark-drive|tablets-of-ruin|sword-of-ruin|hadron-engine|orichalcum-pulse/.test(
          pokemon.hiddenAbility
        )
      ) {
        pokemon.hiddenAbility = "";
        delete pokemon.hiddenAbilityCaught;
        // console.log(pokemon.pokemonName);
        if (pokemon.genderDifference) {
          delete pokemon.femaleHiddenAbilityCaught;
        }
      }

      // pokeapi doesnt have accurate information, female shiny sprite is null despite having a very big gender difference.
      if (pokemon.pokedexNum === 916) {
        // console.log(pokemon.pokemonName);
        pokemon.femaleShinySprite = pokemon.shinySprite;
      }

      // for the pokemon that didn't have any pokemon locations but appeared in crown tundra
      if (
        (pokemon.pokedexNum >= 785 && pokemon.pokedexNum <= 801) ||
        (pokemon.pokedexNum >= 803 && pokemon.pokedexNum <= 806)
      ) {
        // console.log(pokemon.pokemonName);
        pokemon.pokemonLocation.swordShieldCrown = true;
      }

      if (
        pokemon.pokedexNum === 802 ||
        (pokemon.pokedexNum >= 807 && pokemon.pokedexNum <= 809)
      ) {
        // console.log(pokemon.pokemonName);
        pokemon.pokemonLocation.swordShield = true;
      }

      if (pokemon.pokedexNum >= 13 && pokemon.pokedexNum <= 22) {
        // console.log(pokemon.pokemonName);
        pokemon.pokemonLocation.diamondPearl = true;
      }

      updatedPokedex.push(pokemon);
    }
  }

  const stringifiedPokedex = JSON.stringify(updatedPokedex);

  fs.writeFile("./utils/json/pokedex.json", stringifiedPokedex, (err, res) =>
    err ? console.log(err) : console.log("Done!")
  );
}

updatePokedex();
