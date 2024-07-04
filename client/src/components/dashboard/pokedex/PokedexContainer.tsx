import { Dispatch, useEffect } from 'react';
import { iPokemon } from '../types';
import SearchBar from '../../searchbar/SearchBar';
import { useState } from 'react';
import PokemonCard from './modal/pokemonInfo/PokemonCard';

function PokedexContainer({
  pokemon,
  setShowModal,
  setSelectedPokemon,
}: {
  pokemon: iPokemon[];
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
  setSelectedPokemon: Dispatch<React.SetStateAction<number>>;
}) {
  const [pokemonList, setPokemonList] = useState(pokemon);
  const [selectPokemonArr, setSelectPokemonArr] = useState<number[]>([]);
  const [showSelectMenu, setShowSelectMenu] = useState(false);

  // console.log(pokemonList)
  // TODO: create multi-select menu component
  useEffect(() => {
    if (selectPokemonArr.length > 0) {
      setShowSelectMenu(true);
    } else {
      setShowSelectMenu(false);
    }
  }, [selectPokemonArr, setShowSelectMenu, showSelectMenu]);

  return (
    <>
      <SearchBar
        pokemon={pokemon}
        pokemonList={pokemonList}
        setPokemonList={setPokemonList}
      />
      <div className="w-full min-h-screen p-8 flex flex-wrap justify-center gap-5 content-start">
        {pokemonList.map((pokemonEntry) => (
          <PokemonCard
            pokemon={pokemonEntry}
            setShowModal={setShowModal}
            setSelectedPokemon={setSelectedPokemon}
            key={pokemonEntry.pokedexNum}
            selectPokemonArr={selectPokemonArr}
            setSelectPokemonArr={setSelectPokemonArr}
          />
        ))}
      </div>
    </>
  );
}

export default PokedexContainer;
