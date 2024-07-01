const { User } = require("../models");
const pokedexJSON = require("./json/pokedex.json");

module.exports = {
  updatePokedex: async function () {
    const users = await User.find();
    for (i = 0; i < users.length; i++) {
      const user = users[i];
      const updatedUser = await User.findByIdAndUpdate(
        user,
        {
          pokemon: pokedexJSON,
        },
        { new: true }
      );
      console.log(updatedUser.pokemon[12]);
    }
    console.log("Updated Users Pokedex");
  },
};
