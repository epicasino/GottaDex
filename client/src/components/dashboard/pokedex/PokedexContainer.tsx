import { Dispatch } from 'react';
import { iPokemon } from '../types';
import SearchBar from '../searchbar/SearchBar';
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

  // console.log(pokemonList);

  return (
    <>
      <SearchBar pokemon={pokemon} setPokemonList={setPokemonList} />
      <div className="w-full min-h-screen p-8 flex flex-wrap justify-center gap-5 content-start">
        {pokemonList.map((pokemonEntry) => (
          <PokemonCard
            pokemon={pokemonEntry}
            setShowModal={setShowModal}
            setSelectedPokemon={setSelectedPokemon}
            key={pokemonEntry.pokedexNum}
          />
        ))}
      </div>
    </>
  );
}

export default PokedexContainer;
