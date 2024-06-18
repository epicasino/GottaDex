import { Dispatch } from 'react';
import { iPokemon } from '../types';

function PokemonCard({
  pokemon,
  setShowModal,
  setSelectedPokemon,
}: {
  pokemon: iPokemon;
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
  setSelectedPokemon: Dispatch<React.SetStateAction<number>>;
}) {
  const handleCardClick = () => {
    setShowModal(true);
    setSelectedPokemon(pokemon.pokedexNum - 1);
  };

  return (
    <div
      className="w-32 h-32 bg-zinc-800 flex flex-col items-center justify-center rounded-md transition hover:bg-zinc-700/50"
      onClick={handleCardClick}
    >
      <h5 className="tinyFont text-zinc-50">
        {/* capitalizes first letter */}
        {pokemon.pokemonName.charAt(0).toLocaleUpperCase() +
          pokemon.pokemonName.replace(/-/g, ' ').slice(1)}
      </h5>
      <img src={pokemon.sprite} className="h-3/5" />
      <p className="tinyFont text-zinc-50">#{pokemon.pokedexNum}</p>
    </div>
  );
}

function PokedexContainer({
  pokemon,
  setShowModal,
  setSelectedPokemon,
}: {
  pokemon: [iPokemon];
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
  setSelectedPokemon: Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="w-full min-h-screen p-8 flex flex-wrap justify-center gap-5">
      {pokemon.map((pokemonEntry) => (
        <PokemonCard
          pokemon={pokemonEntry}
          setShowModal={setShowModal}
          setSelectedPokemon={setSelectedPokemon}
          key={pokemonEntry.pokedexNum}
        />
      ))}
    </div>
  );
}

export default PokedexContainer;
