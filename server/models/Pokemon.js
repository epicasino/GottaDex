const { Schema } = require("mongoose");

const pokemonLocationSchema = new Schema({
  swordShield: {
    type: Boolean,
    required: true,
  },
  swordShieldIsle: {
    type: Boolean,
    required: true,
  },
  swordShieldCrown: {
    type: Boolean,
    required: true,
  },
  diamondPearl: {
    type: Boolean,
    required: true,
  },
  arceus: {
    type: Boolean,
    required: true,
  },
  scarletViolet: {
    type: Boolean,
    required: true,
  },
  scarletVioletKita: {
    type: Boolean,
    required: true,
  },
  scarletVioletBlue: {
    type: Boolean,
    required: true,
  },
});

const pokemonFormSchema = new Schema({
  formName: {
    type: String,
    required: true,
  },
  sprite: {
    type: String,
    required: true,
  },
  perfectIV: {
    type: Boolean,
    required: true,
  },
  hiddenAbility: {
    type: String,
  },
});

const evSpreadSchema = new Schema({
  hp: {
    type: Number,
    default: 0,
  },
  attack: {
    type: Number,
    default: 0,
  },
  defense: {
    type: Number,
    default: 0,
  },
  spAtk: {
    type: Number,
    default: 0,
  },
  spDef: {
    type: Number,
    default: 0,
  },
  speed: {
    type: Number,
    default: 0,
  },
});

const pokemonSchema = new Schema({
  pokemonName: {
    type: String,
    required: true,
  },
  pokedexNum: {
    type: Number,
    required: true,
  },
  sprite: {
    type: String,
    required: true,
  },
  femaleSprite: {
    type: String,
  },
  perfectIV: {
    type: Boolean,
    required: true,
  },
  hiddenAbility: {
    type: String,
  },
  nature: {
    type: String,
  },
  genderDifference: {
    type: Boolean,
    required: true,
  },
  pokemonLocation: {
    type: pokemonLocationSchema,
  },
  evSpread: {
    type: evSpreadSchema,
  },
  forms: [pokemonFormSchema],
});

module.exports = pokemonSchema;
