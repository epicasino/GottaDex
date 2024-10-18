'use client';
import { iPokemon } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';

export default function PokemonCard({ pokemon }: { pokemon: iPokemon }) {
  return (
    <Link
      className={`relative w-20 h-24 md:w-48 md:h-48 flex flex-col items-center justify-center rounded-md transition ${colorText(
        pokemon
      )}`}
      href={`/dashboard/?showModal=true&pokemonId=${pokemon.id}`}
      scroll={false}
    >
      <h5 className={`tinyFont text-zinc-50 text-sm md:text-base`}>
        {/* capitalizes first letter */}
        {pokemon.pokemonName.charAt(0).toLocaleUpperCase() +
          pokemon.pokemonName.replace(/-/g, ' ').slice(1)}
      </h5>
      <Image
        src={pokemonCardImg(pokemon) || ''}
        className="w-auto h-3/5"
        height={0}
        width={0}
        alt={`${pokemon.pokemonName} sprite`}
        unoptimized
      />
      <p className="tinyFont text-zinc-50 text-sm md:text-base">
        #{pokemon.id}
      </p>
      <input type="checkbox" className="absolute top-2 left-2 multi-select" />
    </Link>
  );
}

function pokemonCardImg(pokemon: iPokemon) {
  if (pokemon.genderDifference) {
    if (pokemon.shinyCaught && pokemon.femaleShinyCaught) {
      return pokemon.shinySprite;
    }
    if (pokemon.shinyCaught) {
      return pokemon.shinySprite;
    }
    if (pokemon.femaleShinyCaught) {
      return pokemon.femaleShinySprite;
    }
  } else {
    if (pokemon.shinyCaught) return pokemon.shinySprite;
  }
  if (
    pokemon.forms.some((form) => {
      return form.shinyCaught;
    })
  ) {
    return pokemon.forms[
      pokemon.forms.findIndex((form) => {
        return form.shinyCaught;
      })
    ].shinySprite;
  }
  return pokemon.sprite;
}

function colorText(pokemon: iPokemon) {
  // perfect IV
  if (
    pokemon.forms.length > 0 &&
    pokemon.forms.every((form) => {
      return form.perfectIV;
    })
  ) {
    if (pokemon.genderDifference) {
      if (pokemon.perfectIV && pokemon.femalePerfectIV)
        return 'bg-yellow-400 hover:bg-yellow-500/50';
    } else {
      if (pokemon.perfectIV) return 'bg-yellow-400 hover:bg-yellow-500/50';
    }
  } else if (pokemon.forms.length === 0) {
    if (pokemon.genderDifference) {
      if (pokemon.perfectIV && pokemon.femalePerfectIV)
        return 'bg-yellow-400 hover:bg-yellow-500/50';
    } else {
      if (pokemon.perfectIV) return 'bg-yellow-400 hover:bg-yellow-500/50';
    }
  }
  // caught
  if (
    pokemon.genderDifference &&
    (pokemon.caught ||
      pokemon.femaleCaught ||
      pokemon.forms.some((form) => {
        return form.caught ? true : false;
      })) &&
    !(
      pokemon.hiddenAbilityCaught ||
      pokemon.perfectIV ||
      pokemon.femaleHiddenAbilityCaught ||
      pokemon.femalePerfectIV ||
      pokemon.forms.some((form) => {
        return form.perfectIV || form.hiddenAbilityCaught ? true : false;
      })
    )
  ) {
    return 'bg-zinc-200/50 hover:bg-zinc-300/25';
  }
  if (
    !pokemon.genderDifference &&
    (pokemon.caught ||
      pokemon.forms.some((form) => {
        return form.caught ? true : false;
      })) &&
    !(
      pokemon.hiddenAbilityCaught ||
      pokemon.perfectIV ||
      pokemon.forms.some((form) => {
        return form.perfectIV || form.hiddenAbilityCaught ? true : false;
      })
    )
  ) {
    return 'bg-zinc-200/50 hover:bg-zinc-300/25';
  }
  // in progress
  if (
    pokemon.caught ||
    pokemon.femaleCaught ||
    pokemon.hiddenAbilityCaught ||
    pokemon.perfectIV ||
    pokemon.femaleHiddenAbilityCaught ||
    pokemon.femalePerfectIV ||
    pokemon.forms.some((form) => {
      return form.hiddenAbilityCaught || form.perfectIV ? true : false;
    })
  ) {
    return 'bg-green-600 hover:bg-green-700/50';
  }
  // NEW: uncaught
  return 'bg-zinc-800 hover:bg-zinc-700/50';
}
