export interface User {
  id: string;
  username: string;
  progress: number;
  pokedex: iPokemon[];
}

export interface iPokemon {
  id: number;
  pokemonName: string;
  sprite: string;
  femaleSprite?: string | null;
  shinySprite?: string | null;
  femaleShinySprite?: string | null;
  caught: boolean;
  femaleCaught?: boolean | null;
  shinyCaught?: boolean | null;
  femaleShinyCaught?: boolean | null;
  perfectIV: boolean;
  femalePerfectIV?: boolean | null;
  hiddenAbility?: string | null;
  hiddenAbilityCaught?: boolean | null;
  femaleHiddenAbilityCaught?: boolean | null;
  nature?: string | null;
  genderDifference: boolean;
  notes?: string | null;
  pokemonLocation?: iPokemonLocation | null;
  forms: iPokemonForm[];
  evSpread?: iEvSpread | null;
  userId: string;
  user?: User | null;
}

export interface iPokemonLocation {
  id: number;
  swordShield: boolean;
  swordShieldIsle: boolean;
  swordShieldCrown: boolean;
  diamondPearl: boolean;
  arceus: boolean;
  scarletViolet: boolean;
  scarletVioletKita: boolean;
  scarletVioletBlue: boolean;
  pokemonId: number;
}

export interface iPokemonForm {
  id: number;
  formName: string;
  sprite: string;
  caught?: boolean | null;
  shinySprite?: string | null;
  shinyCaught?: boolean | null;
  perfectIV: boolean;
  hiddenAbility?: string | null;
  hiddenAbilityCaught?: boolean | null;
  pokemonId: number;
}

export interface iEvSpread {
  id: number;
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;
  pokemonId: number;
}
