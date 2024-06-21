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
    femaleSprite: String
    genderDifference: Boolean!
    perfectIV: Boolean!
    hiddenAbility: String
    nature: String
    pokemonLocation: PokemonLocation
    evSpread: EvSpread
    forms: [Form]
  }
  input PokemonInput {
    userId: String
    pokedexNum: Int!
    nature: String
    perfectIV: Boolean
    evSpread: EvSpreadInput
    forms: [FormInput]
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
    perfectIV: Boolean!
    hiddenAbility: String
  }
  input FormInput {
    formName: String
    perfectIV: Boolean
    sprite: String
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
