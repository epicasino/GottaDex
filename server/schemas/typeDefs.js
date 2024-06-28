const typeDefs = `
  type User {
    _id: ID
    username: String!
    password: String!
    progress: Int
    pokemon: [Pokemon]
  }
  type Pokemon {
    pokemonName: String!
    pokedexNum: Int!
    sprite: String!
    shinySprite: String
    shinyCaught: Boolean
    femaleSprite: String
    femaleCaught: Boolean
    femaleHiddenAbilityCaught: Boolean
    femalePerfectIV: Boolean
    femaleShinySprite: String
    femaleShinyCaught: Boolean
    genderDifference: Boolean!
    caught: Boolean!
    perfectIV: Boolean!
    hiddenAbility: String
    hiddenAbilityCaught: Boolean
    nature: String
    pokemonLocation: PokemonLocation
    evSpread: EvSpread
    forms: [Form]
    notes: String
  }
  input PokemonInput {
    userId: String
    pokedexNum: Int!
    nature: String
    caught: Boolean
    hiddenAbilityCaught: Boolean
    perfectIV: Boolean
    shinyCaught: Boolean
    femaleCaught: Boolean
    femaleHiddenAbilityCaught: Boolean
    femalePerfectIV: Boolean
    femaleShinyCaught: Boolean
    evSpread: EvSpreadInput
    forms: [FormInput]
    notes: String
  }
  type PokemonLocation {
    swordShield: Boolean!
    swordShieldIsle: Boolean!
    swordShieldCrown: Boolean!
    diamondPearl: Boolean!
    arceus: Boolean!
    scarletViolet: Boolean!
    scarletVioletKita: Boolean!
    scarletVioletBlue: Boolean!
  }
  type EvSpread {
    hp: Int
    attack: Int
    defense: Int
    spAtk: Int
    spDef: Int
    speed: Int
  }
  input EvSpreadInput {
    hp: Int
    attack: Int
    defense: Int
    spAtk: Int
    spDef: Int
    speed: Int
  }
  type Form {
    formName: String!
    sprite: String!
    shinySprite: String
    caught: Boolean!
    hiddenAbilityCaught: Boolean
    shinyCaught: Boolean
    perfectIV: Boolean!
    hiddenAbility: String
  }
  input FormInput {
    formName: String
    sprite: String
    shinySprite: String
    caught: Boolean
    hiddenAbilityCaught: Boolean
    shinyCaught: Boolean
    perfectIV: Boolean
    hiddenAbility: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    user(username: String, userId: String): User
    me: User
    pokemon(userId: String, pokedexNum: Int): Pokemon
  }
  type Mutation {
    login(username: String!, password: String!): Auth
    register(username: String!, password: String!): Auth
    removeUser(userId: String!): User
    updatePokedex(pokedex: PokemonInput): Pokemon
  }
`;

module.exports = typeDefs;
