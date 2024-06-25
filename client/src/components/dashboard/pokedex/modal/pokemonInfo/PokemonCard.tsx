import { Dispatch } from 'react';
import { iPokemon } from '../../../types';

export default function PokemonCard({
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

  // 'bg-green-600 hover:bg-green-700/50' in progress
  // 'bg-yellow-400 hover:bg-yellow-500/50' completed
  // 'bg-zinc-800 hover:bg-zinc-700/50' default

  return (
    <div
      className={`w-20 h-24 md:w-48 md:h-48 flex flex-col items-center justify-center rounded-md transition ${colorText(
        pokemon
      )}`}
      onClick={handleCardClick}
    >
      <h5 className="tinyFont text-zinc-50 text-sm md:text-base">
        {/* capitalizes first letter */}
        {pokemon.pokemonName.charAt(0).toLocaleUpperCase() +
          pokemon.pokemonName.replace(/-/g, ' ').slice(1)}
      </h5>
      <img src={pokemonCardImg(pokemon)} className="h-3/5" />
      <p className="tinyFont text-zinc-50 text-sm md:text-base">
        #{pokemon.pokedexNum}
      </p>
    </div>
  );
}

function pokemonCardImg(pokemon: iPokemon) {
  if (pokemon.genderDifference) {
    return pokemon.shinyCaught && pokemon.femaleShinyCaught
      ? pokemon.shinySprite
      : pokemon.sprite;
  }
  return pokemon.shinyCaught ? pokemon.shinySprite : pokemon.sprite;
}

function colorText(pokemon: iPokemon) {
  return (pokemon.perfectIV &&
    pokemon.femalePerfectIV &&
    pokemon.forms.every((form) => {
      return form.perfectIV ? true : false;
    })) ||
    (pokemon.perfectIV &&
      pokemon.forms.every((form) => {
        return form.perfectIV ? true : false;
      })) ||
    (pokemon.caught &&
      pokemon.hiddenAbilityCaught &&
      pokemon.perfectIV &&
      pokemon.femaleCaught &&
      pokemon.femaleHiddenAbilityCaught &&
      pokemon.femalePerfectIV &&
      pokemon.forms.length !== 0) ||
    (pokemon.caught &&
      pokemon.hiddenAbilityCaught &&
      pokemon.perfectIV &&
      pokemon.forms.length !== 0)
    ? 'bg-yellow-400 hover:bg-yellow-500/50'
    : pokemon.caught ||
      pokemon.hiddenAbilityCaught ||
      pokemon.perfectIV ||
      pokemon.femaleCaught ||
      pokemon.femaleHiddenAbilityCaught ||
      pokemon.femalePerfectIV ||
      pokemon.forms.some((form) => {
        return form.caught || form.hiddenAbilityCaught ? true : false;
      })
    ? 'bg-green-600 hover:bg-green-700/50'
    : 'bg-zinc-800 hover:bg-zinc-700/50';
}
