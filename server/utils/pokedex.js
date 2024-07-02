const { User } = require("../models");
const pokedexJSON = require("./json/pokedex.json");

module.exports = {
  updatePokedex: async function () {
    const users = await User.find();
    for (i = 0; i < users.length; i++) {
      const user = users[i];
      let pokedex = user.pokemon;

      pokedex.forEach((pokemon, index) => {
        pokemon.pokemonLocation = pokedexJSON[index].pokemonLocation;
      });

      console.log(pokedex[12]);

      const updatedUser = await User.findByIdAndUpdate(
        user,
        {
          pokemon: pokedex,
        },
        { new: true }
      );
      // console.log(updatedUser.pokemon[12]);
    }
    console.log("Updated Users Pokedex");
  },
};
