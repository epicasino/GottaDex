export interface iMatchedItem {
  pokemonName: string;
  pokedexNum: number;
  sprite: string;
  shinySprite?: string | null;
  shinyCaught?: boolean;
  femaleSprite?: string | null;
  femaleCaught?: boolean;
  femaleHiddenAbilityCaught?: boolean;
  femalePerfectIV?: boolean;
  femaleShinySprite?: string | null;
  femaleShinyCaught?: boolean;
  genderDifference: boolean;
  caught: boolean;
  hiddenAbilityCaught?: boolean;
  perfectIV: boolean;
  hiddenAbility: string;
  nature: string;
  notes: string;
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
  shinySprite?: string | null;
  shinyCaught?: boolean;
  caught: boolean;
  hiddenAbilityCaught?: boolean;
  perfectIV: boolean;
  hiddenAbility?: string;
}
