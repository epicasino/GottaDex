import { Dispatch } from 'react';
import {
  iEvSpread,
  iPokedexVariables,
  iPokemon,
  iPokemonForms,
  iUserDataDashUpdate,
} from '../components/dashboard/types';
import {
  ApolloCache,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
} from '@apollo/client';

export const updatePokemon = async ({
  e,
  pokemonEv,
  setPokemonEv,
  selectedPokemonInfo,
  pokemonNature,
  caughtTypes,
  pokemonForms,
  femaleCaughtTypes,
  updatePokedex,
  setPokemonSaved,
}: {
  e: React.FormEvent<HTMLFormElement>;
  pokemonEv: iEvSpread;
  setPokemonEv: Dispatch<React.SetStateAction<iEvSpread>>;
  selectedPokemonInfo: iPokemon;
  pokemonNature: string;
  caughtTypes: {
    caught: boolean;
    hiddenAbilityCaught: boolean;
    perfectIV: boolean;
    shinyCaught: boolean;
  };
  pokemonForms: iPokemonForms[];
  femaleCaughtTypes: {
    femaleCaught: boolean;
    femaleHiddenAbilityCaught: boolean;
    femalePerfectIV: boolean;
    femaleShinyCaught: boolean;
  };
  // Yeah, I have no idea how to type check this one.
  updatePokedex: (
    options?:
      | MutationFunctionOptions<
          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          any,
          OperationVariables,
          DefaultContext,
          // eslint-disable-next-line  @typescript-eslint/no-explicit-any
          ApolloCache<any>
        >
      | undefined
  ) => Promise<iUserDataDashUpdate>;
  setPokemonSaved: Dispatch<React.SetStateAction<boolean>>;
}) => {
  e.preventDefault();

  const evSum = Object.values(pokemonEv).reduce(
    (a, b) => (Number.isNaN(b) ? a : a + b),
    0
  );

  // Runs only if evSum is less than 510.
  if (evSum <= 510) {
    // I think there's a better way of doing this?
    const parsedPokemonEv: iEvSpread = {
      hp: Number.isNaN(pokemonEv.hp) ? 0 : pokemonEv.hp,
      defense: Number.isNaN(pokemonEv.defense) ? 0 : pokemonEv.defense,
      attack: Number.isNaN(pokemonEv.attack) ? 0 : pokemonEv.attack,
      spAtk: Number.isNaN(pokemonEv.spAtk) ? 0 : pokemonEv.spAtk,
      spDef: Number.isNaN(pokemonEv.spDef) ? 0 : pokemonEv.spDef,
      speed: Number.isNaN(pokemonEv.speed) ? 0 : pokemonEv.speed,
    };

    // console.log(parsedPokemonEv);
    setPokemonEv(parsedPokemonEv);

    // console.log(pokemonForms);

    try {
      let pokedexVariables: iPokedexVariables = {
        pokedexNum: selectedPokemonInfo.pokedexNum,
        nature: pokemonNature,
        caught: caughtTypes.caught,
        perfectIV: caughtTypes.perfectIV,
        evSpread: parsedPokemonEv,
        forms: pokemonForms,
      };

      // if pokemon has a hidden ability- attach hidden ability property from state
      if (selectedPokemonInfo.hiddenAbility !== null) {
        pokedexVariables = {
          ...pokedexVariables,
          hiddenAbilityCaught: caughtTypes.hiddenAbilityCaught,
        };
      }

      // if pokemon has a shiny sprite link- attach shinyCaught property from state
      if (selectedPokemonInfo.shinySprite !== null) {
        pokedexVariables = {
          ...pokedexVariables,
          shinyCaught: caughtTypes.shinyCaught,
        };
      }
      // if pokemone has a gender difference, attach femaleCaught properties from state
      if (selectedPokemonInfo.genderDifference) {
        pokedexVariables = {
          ...pokedexVariables,
          femaleCaught: femaleCaughtTypes.femaleCaught,
          femaleHiddenAbilityCaught:
            femaleCaughtTypes.femaleHiddenAbilityCaught,
          femalePerfectIV: femaleCaughtTypes.femalePerfectIV,
        };
        if (selectedPokemonInfo.femaleShinySprite !== null) {
          pokedexVariables = {
            ...pokedexVariables,
            femaleShinyCaught: femaleCaughtTypes.femaleShinyCaught,
          };
        }
      }

      // console.log(pokedexVariables);

      const { data } = await updatePokedex({
        variables: {
          pokedex: pokedexVariables,
        },
      });

      if (data.updatePokedex) {
        setPokemonSaved(true);
      }
    } catch (err) {
      console.error(err);
    }
  }
};
