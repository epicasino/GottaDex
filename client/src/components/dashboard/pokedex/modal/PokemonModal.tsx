import { Dispatch, useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_POKEDEX } from '../../../../utils/mutations';
import { iPokemon } from '../../types';
import ModalSprites from './pokemonInfo/ModalSprites';
import ModalEvSpread from './pokemonInfo/ModalEvSpread';
import ModalNature from './pokemonInfo/ModalNature';
import ModalHidden from './pokemonInfo/ModalHidden';
import ModalForms from './pokemonInfo/ModalForms';
import ModalCatchTypes from './pokemonInfo/ModalCatchTypes';
import { updatePokemon } from '../../../../utils/updatePokemon';
import { modifyForms } from '../../../../utils/modifyForms';
import ModalLocation from './pokemonInfo/ModalLocation';
import ModalNotes from './pokemonInfo/ModalNotes';

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
  const [pokemonNotes, setPokemonNotes] = useState(selectedPokemonInfo.notes);
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
  const [pokemonForms, setPokemonForms] = useState(
    modifyForms(selectedPokemonInfo.forms)
  );

  const [pokemonSaved, setPokemonSaved] = useState(false);

  const [updatePokedex] = useMutation(UPDATE_POKEDEX);

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
            updatePokemon({
              e,
              pokemonEv,
              setPokemonEv,
              selectedPokemonInfo,
              pokemonNature,
              caughtTypes,
              pokemonForms,
              femaleCaughtTypes,
              pokemonNotes,
              // Yeah, I have no idea how to type check this one.
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              updatePokedex,
              setPokemonSaved,
            });
          }}
        >
          {/* nature Dropdown */}
          <ModalNature
            pokemonNature={pokemonNature}
            setPokemonNature={setPokemonNature}
          />
          {/* notes Dropdown */}
          <ModalNotes pokemonNotes={pokemonNotes} setPokemonNotes={setPokemonNotes}/>
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
          <ModalLocation
            pokemonLocation={selectedPokemonInfo.pokemonLocation}
          />
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
