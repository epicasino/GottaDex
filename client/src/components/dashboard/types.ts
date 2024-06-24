export interface iUserDataDash {
  _id: string;
  username: string;
  progress: number;
  pokemon: [iPokemon];
}

export interface iPokemon {
  pokemonName: string;
  pokedexNum: number;
  sprite: string;
  shinySprite: string;
  shinyCaught: boolean;
  femaleSprite: string;
  femaleCaught: boolean;
  femaleHiddenAbilityCaught: boolean;
  femalePerfectIV: boolean;
  femaleShinySprite: string;
  femaleShinyCaught: boolean;
  genderDifference: boolean;
  caught: boolean;
  hiddenAbilityCaught: boolean;
  perfectIV: boolean;
  hiddenAbility: string;
  nature: string;
  pokemonLocation: iPokemonLocation;
  evSpread: iEvSpread;
  forms: Array<iPokemonForms>;
}

export interface iPokemonLocation {
  swordShield: boolean;
  swordShieldIsle: boolean;
  swordShieldCrown: boolean;
  diamondPearl: boolean;
  arceus: boolean;
  scarletViolet: boolean;
  scarletVioletKita: boolean;
  scarletVioletBlue: boolean;
}

export interface iEvSpread {
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;
}

export interface iPokemonForms {
  formName: string;
  sprite: string;
  shinySprite: string;
  shinyCaught?: boolean;
  caught: boolean;
  hiddenAbilityCaught?: boolean;
  perfectIV: boolean;
  hiddenAbility?: string;
}

export interface iPokedexVariables {
  pokedexNum: number;
  nature: string;
  caught: boolean;
  hiddenAbilityCaught?: boolean;
  perfectIV: boolean;
  shinyCaught?: boolean;
  femaleCaught?: boolean;
  femaleHiddenAbilityCaught?: boolean;
  femalePerfectIV?: boolean;
  femaleShinyCaught?: boolean;
  evSpread: iEvSpread;
  forms?: iPokemonForms[];
}
