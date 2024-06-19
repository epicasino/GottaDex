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
      className={`w-48 h-48 flex flex-col items-center justify-center rounded-md transition ${
        pokemon.perfectIV && pokemon.forms.length === 0
          ? 'bg-yellow-400 hover:bg-yellow-500/50'
          : pokemon.perfectIV && pokemon.forms.every((form) => form.perfectIV)
          ? 'bg-yellow-400 hover:bg-yellow-500/50'
          : pokemon.perfectIV && !pokemon.forms.every((form) => form.perfectIV)
          ? 'bg-green-600 hover:bg-green-700/50'
          : 'bg-zinc-800 hover:bg-zinc-700/50'
      }`}
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
