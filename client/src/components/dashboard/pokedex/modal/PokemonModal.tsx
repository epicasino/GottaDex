import { PokedexModalSprites } from './pokemonInfo/ModalSprites';
import { Dispatch, useState } from 'react';
import { iPokemon } from '../../types';
import PokedexModalEvSpread from './pokemonInfo/ModalEvSpread';
import PokedexModalNature from './pokemonInfo/ModalNature';
import PokemonModalHidden from './pokemonInfo/ModalHidden';

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
  const [pokemonEv, setPokemonEv] = useState(selectedPokemonInfo.evSpread);

  return (
    <div
      className="fixed h-screen w-full bg-zinc-950/50 flex justify-center items-center"
      onClick={(e) => {
        e.target === e.currentTarget && setShowModal(false);
      }}
    >
      <article className="bg-zinc-950 w-2/4 tinyFont rounded-md p-5 text-slate-50">
        {/* pokemon name & pokedex num */}
        <header className="flex justify-between px-5">
          <h2 className="text-4xl pb-4">
            {selectedPokemonInfo.pokemonName.charAt(0).toLocaleUpperCase() +
              selectedPokemonInfo.pokemonName.replace(/-/g, ' ').slice(1)}
          </h2>
          <h2 className="text-4xl pb-4">#{selectedPokemonInfo.pokedexNum}</h2>
        </header>
        <section>
          {/* pokemon's sprite(s) */}
          <PokedexModalSprites selectedPokemonInfo={selectedPokemonInfo} />
          {/* hidden ability */}
          <PokemonModalHidden selectedPokemonInfo={selectedPokemonInfo} />
        </section>
        <form className="flex flex-col">
          {/* Nature Dropdown */}
          <PokedexModalNature
            pokemonNature={pokemonNature}
            setPokemonNature={setPokemonNature}
          />
          {/* evSpread */}
          <PokedexModalEvSpread
            pokemonEv={pokemonEv}
            setPokemonEv={setPokemonEv}
          />
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
