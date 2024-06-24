const { User } = require("../models");
const { AuthenticationError, signToken } = require("../utils/auth");
const pokedexJSON = require("../utils/json/pokedex.json");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id });
        return userData;
      }

      throw AuthenticationError;
    },
    user: async (parent, { username, userId }, context) => {
      if (userId) {
        return await User.findById(userId);
      }
      if (username) {
        return await User.findOne({ username });
      }
    },
    pokemon: async (parent, { userId, pokedexNum }, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return user.pokemon[pokedexNum - 1];
      }
      if (userId) {
        const user = await User.findOne({ _id: userId }).select(
          "-__v -password"
        );

        return user.pokemon[pokedexNum - 1];
      }
    },
  },
  Mutation: {
    login: async (parent, { username, password }, context) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPass = await user.isCorrectPassword(password);

      if (!correctPass) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    register: async (parent, { username, password }, context) => {
      // console.log(pokedexJSON);
      const user = await User.create({
        username,
        password,
        pokemon: pokedexJSON,
      });

      // console.log(user);

      const token = signToken(user);

      return { token, user };
    },
    updatePokedex: async (parent, { pokedex }, context) => {
      const pokemonIdIndex = pokedex.pokedexNum - 1;
      if (context.user) {
        try {
          const updatedPokedex = await User.findByIdAndUpdate(
            context.user._id,
            {
              // look over closely. evSpread may not bring desireable results.
              $set: {
                "pokemon.$[pokedex].caught": pokedex.caught,
                "pokemon.$[pokedex].shinyCaught": pokedex.shinyCaught,
                "pokemon.$[pokedex].perfectIV": pokedex.perfectIV,
                "pokemon.$[pokedex].hiddenAbilityCaught":
                  pokedex.hiddenAbilityCaught,
                "pokemon.$[pokedex].femaleCaught": pokedex.femaleCaught,
                "pokemon.$[pokedex].femaleHiddenAbilityCaught":
                  pokedex.femaleHiddenAbilityCaught,
                "pokemon.$[pokedex].femalePerfectIV": pokedex.femalePerfectIV,
                "pokemon.$[pokedex].femaleShinyCaught":
                  pokedex.femaleShinyCaught,
                "pokemon.$[pokedex].nature": pokedex.nature,
                "pokemon.$[pokedex].evSpread": {
                  hp: pokedex.evSpread.hp,
                  attack: pokedex.evSpread.attack,
                  defense: pokedex.evSpread.defense,
                  spAtk: pokedex.evSpread.spAtk,
                  spDef: pokedex.evSpread.spDef,
                  speed: pokedex.evSpread.speed,
                },
                "pokemon.$[pokedex].forms": pokedex.forms,
              },
            },
            {
              arrayFilters: [
                {
                  "pokedex.pokedexNum": pokedex.pokedexNum,
                },
              ],
              new: true,
            }
          );
          return updatedPokedex.pokemon[pokemonIdIndex];
        } catch (err) {
          console.log(err);
        }
      } else if (pokedex.userId) {
        // console.log(pokedex.userId);
        try {
          const pokemonIdIndex = pokedex.pokedexNum - 1;

          const updatedPokedex = await User.findByIdAndUpdate(
            pokedex.userId,
            {
              // look over closely. evSpread may not bring desireable results.
              $set: {
                "pokemon.$[pokedex].perfectIV": pokedex.perfectIV,
                "pokemon.$[pokedex].nature": pokedex.nature,
                "pokemon.$[pokedex].evSpread.hp": pokedex.evSpread.hp,
                "pokemon.$[pokedex].evSpread.attack": pokedex.evSpread.attack,
                "pokemon.$[pokedex].evSpread.defense": pokedex.evSpread.defense,
                "pokemon.$[pokedex].evSpread.spAtk": pokedex.evSpread.spAtk,
                "pokemon.$[pokedex].evSpread.spDef": pokedex.evSpread.spDef,
                "pokemon.$[pokedex].evSpread.speed": pokedex.evSpread.speed,
              },
            },
            {
              arrayFilters: [
                {
                  "pokedex.pokedexNum": pokedex.pokedexNum,
                },
              ],
              new: true,
            }
          );
          return updatedPokedex.pokemon[pokemonIdIndex];
        } catch (err) {
          console.log(err);
        }
      }
    },
    removeUser: async (parent, { userId }) => {
      const user = await User.findByIdAndDelete(userId);

      if (user) {
        return user;
      }
    },
  },
};

module.exports = resolvers;
