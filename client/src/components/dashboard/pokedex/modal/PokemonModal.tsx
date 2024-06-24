import { Dispatch, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_POKEDEX } from '../../../../utils/mutations';
import { iEvSpread, iPokedexVariables, iPokemon } from '../../types';
import ModalSprites from './pokemonInfo/ModalSprites';
import ModalEvSpread from './pokemonInfo/ModalEvSpread';
import ModalNature from './pokemonInfo/ModalNature';
import ModalHidden from './pokemonInfo/ModalHidden';
import ModalForms from './pokemonInfo/ModalForms';
import ModalCatchTypes from './pokemonInfo/ModalCatchTypes';

function PokemonModal({
  setShowModal,
  selectedPokemonInfo,
}: {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
  selectedPokemonInfo: iPokemon;
}) {
  const [pokemonNature, setPokemonNature] = useState(
    selectedPokemonInfo.nature
  );
  const [caughtTypes, setCaughtTypes] = useState({
    caught: selectedPokemonInfo.caught,
    hiddenAbilityCaught: selectedPokemonInfo.hiddenAbilityCaught,
    perfectIV: selectedPokemonInfo.perfectIV,
    shinyCaught: selectedPokemonInfo.shinyCaught,
  });
  const [femaleCaughtTypes, setFemaleCaughtTypes] = useState({
    femaleCaught: selectedPokemonInfo.femaleCaught,
    femaleHiddenAbilityCaught: selectedPokemonInfo.femaleHiddenAbilityCaught,
    femalePerfectIV: selectedPokemonInfo.femalePerfectIV,
    femaleShinyCaught: selectedPokemonInfo.femaleShinyCaught,
  });
  const [pokemonEv, setPokemonEv] = useState(selectedPokemonInfo.evSpread);
  const [pokemonForms, setPokemonForms] = useState(selectedPokemonInfo.forms);

  const [pokemonSaved, setPokemonSaved] = useState(false);

  const [updatePokedex] = useMutation(UPDATE_POKEDEX);

  const updatePokemon = async (e: React.FormEvent<HTMLFormElement>) => {
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

      try {
        let pokedexVariables: iPokedexVariables = {
          pokedexNum: selectedPokemonInfo.pokedexNum,
          nature: pokemonNature,
          caught: caughtTypes.caught,
          perfectIV: caughtTypes.perfectIV,
          evSpread: parsedPokemonEv,
          // forms: [...pokemonForms],
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

  return (
    <div
      className="fixed h-screen w-full bg-zinc-950/50 flex justify-center items-center"
      onClick={(e) => {
        e.target === e.currentTarget && setShowModal(false);
      }}
    >
      <article
        className={`bg-zinc-950 md:w-1/2 h-[80vh] overflow-scroll md:overflow-auto p-5 tinyFont rounded-md text-slate-50 ${
          pokemonSaved && 'border-green-500 p-4 border-4'
        }`}
      >
        {/* pokemon name & pokedex num */}
        <header className="flex justify-between px-5">
          <div className="flex flex-col">
            <h2 className="text-2xl md:text-4xl">
              {selectedPokemonInfo.pokemonName.charAt(0).toLocaleUpperCase() +
                selectedPokemonInfo.pokemonName.replace(/-/g, ' ').slice(1)}
            </h2>
          </div>
          <h2 className="text-2xl md:text-4xl pb-4">
            #{selectedPokemonInfo.pokedexNum}
          </h2>
        </header>
        <section>
          {/* pokemon's sprite(s) */}
          <ModalSprites selectedPokemonInfo={selectedPokemonInfo} />
          {/* hidden ability */}
          <ModalHidden selectedPokemonInfo={selectedPokemonInfo} />
        </section>
        <form
          className="flex flex-col"
          onSubmit={(e) => {
            updatePokemon(e);
          }}
        >
          {/* nature Dropdown */}
          <ModalNature
            pokemonNature={pokemonNature}
            setPokemonNature={setPokemonNature}
          />
          {/* Catch Types */}
          <ModalCatchTypes
            pokemon={selectedPokemonInfo}
            caughtTypes={caughtTypes}
            setCaughtTypes={setCaughtTypes}
            femaleCaughtTypes={femaleCaughtTypes}
            setFemaleCaughtTypes={setFemaleCaughtTypes}
          />
          {/* evSpread */}
          <ModalEvSpread pokemonEv={pokemonEv} setPokemonEv={setPokemonEv} />
          {/* forms */}
          {selectedPokemonInfo.forms.length !== 0 && (
            <ModalForms
              pokemonForms={pokemonForms}
              setPokemonForms={setPokemonForms}
            />
          )}
          {/* submit button */}
          <button
            type="submit"
            className="transition hover:bg-zinc-800 duration-300 rounded-md text-2xl bg-zinc-900 py-1 px-4 w-20 self-center mt-5"
          >
            Save
          </button>
        </form>
      </article>
    </div>
  );
}

export default PokemonModal;

// hp: Int;
// attack: Int;
// defense: Int;
// spAtk: Int;
// spDef: Int;
// speed: Int;
