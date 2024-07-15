import { Dispatch, useEffect, useState } from 'react';
import {
  ApolloCache,
  ApolloQueryResult,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
} from '@apollo/client';
import { useMutation } from '@apollo/client';
import { UPDATE_POKEDEX } from '../../../../../utils/mutations';
import {
  iMultiSelectVariables,
  iPokedexVariables,
  iPokemon,
  iUserDataDashUpdate,
} from '../../../types';

export default function MultiSelect({
  selectPokemonArr,
  setSelectedPokemonArr,
  refetch,
  pokemon,
}: {
  selectPokemonArr: number[];
  setSelectedPokemonArr: Dispatch<React.SetStateAction<number[]>>;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
    // eslint-disable-next-line
  ) => Promise<ApolloQueryResult<any>>;
  pokemon: iPokemon[];
}) {
  const [caughtTypes, setCaughtTypes] = useState({
    caught: false,
    hiddenAbilityCaught: false,
    perfectIV: false,
    shinyCaught: false,
  });
  const [updateSuccess, setUpdateSucess] = useState(false);
  const [updatePokedex] = useMutation(UPDATE_POKEDEX);

  useEffect(() => {
    if (updateSuccess) {
      setTimeout(() => {
        setSelectedPokemonArr([]);
      }, 2500);
    }
  }, [updateSuccess, setSelectedPokemonArr]);

  return (
    <div
      className={`fixed bottom-0 h-[5vh] w-full flex justify-between items-center px-3 z-50 bg-zinc-900 tinyFont text-zinc-50 ${
        updateSuccess && `border-green-500 p-4 border-4`
      }`}
    >
      <div className="flex flex-row gap-4">
        <label className="flex">
          Caught?
          <input
            type="checkbox"
            checked={caughtTypes.caught}
            onChange={() =>
              setCaughtTypes({
                ...caughtTypes,
                caught: !caughtTypes.caught,
              })
            }
          />
        </label>
        <label className="flex">
          Caught w/ Hidden Ability?
          <input
            type="checkbox"
            checked={caughtTypes.hiddenAbilityCaught}
            onChange={() =>
              setCaughtTypes({
                ...caughtTypes,
                hiddenAbilityCaught: !caughtTypes.hiddenAbilityCaught,
              })
            }
          />
        </label>
        <label className="flex">
          Caught PerfectIV?
          <input
            type="checkbox"
            checked={caughtTypes.perfectIV}
            onChange={() =>
              setCaughtTypes({
                ...caughtTypes,
                perfectIV: !caughtTypes.perfectIV,
              })
            }
          />
        </label>
        <label className="flex">
          Caught Shiny?
          <input
            type="checkbox"
            checked={caughtTypes.shinyCaught}
            onChange={() =>
              setCaughtTypes({
                ...caughtTypes,
                shinyCaught: !caughtTypes.shinyCaught,
              })
            }
          />
        </label>
      </div>
      <button
        type="button"
        className="bg-zinc-950/50 px-3 rounded-md transition hover:bg-zinc-950/75"
        onClick={() => {
          handleMultiselectClick({
            caughtTypes,
            selectPokemonArr,
            refetch,
            updatePokedex,
            pokemon,
            setUpdateSucess,
          });
        }}
      >
        Update
      </button>
    </div>
  );
}

async function handleMultiselectClick({
  caughtTypes,
  selectPokemonArr,
  refetch,
  updatePokedex,
  pokemon,
  setUpdateSucess,
}: {
  caughtTypes: {
    caught: boolean;
    hiddenAbilityCaught: boolean;
    perfectIV: boolean;
    shinyCaught: boolean;
  };
  selectPokemonArr: number[];
  refetch: (
    variables?: Partial<OperationVariables> | undefined
    // eslint-disable-next-line
  ) => Promise<ApolloQueryResult<any>>;
  updatePokedex: (
    options?:
      | MutationFunctionOptions<
          // eslint-disable-next-line
          any,
          OperationVariables,
          DefaultContext,
          // eslint-disable-next-line
          ApolloCache<any>
        >
      | undefined
  ) => Promise<iUserDataDashUpdate>;
  pokemon: iPokemon[];
  setUpdateSucess: Dispatch<React.SetStateAction<boolean>>;
}) {
  try {
    for (let i = 0; i < selectPokemonArr.length; i++) {
      // console.log(pokemon[selectPokemonArr[i]]);
      let pokedexVariables: iPokedexVariables = {
        pokedexNum: selectPokemonArr[i],
        caught: caughtTypes.caught,
        perfectIV: caughtTypes.perfectIV,
        nature: pokemon[selectPokemonArr[i]].nature,
        evSpread: pokemon[selectPokemonArr[i]].evSpread,
        forms: pokemon[selectPokemonArr[i]].forms,
        notes: pokemon[selectPokemonArr[i]].notes,
      };
      if (pokemon[selectPokemonArr[i]].hiddenAbility !== null) {
        pokedexVariables = {
          ...pokedexVariables,
          hiddenAbilityCaught: caughtTypes.hiddenAbilityCaught,
        };
      }
      // console.log(pokedexVariables);
      const { data } = await updatePokedex({
        variables: { pokedex: pokedexVariables },
      });
      // console.log(data);
      if (data?.updatePokedex) {
        // console.log(data.updatePokedex);
      } else throw 'No Data Returned';
    }
    refetch();
    setUpdateSucess(true);
  } catch (err) {
    console.error(err);
  }
}
