'use client';
import React, { useState } from 'react';
import {
  ModalSprites,
  ModalCatchTypes,
  ModalEvSpread,
  ModalForms,
  ModalHidden,
  ModalLocation,
  ModalNature,
  ModalNotes,
} from './pokemonInfo';

import Link from 'next/link';

import { iPokemon } from '@/types/types';
import { updatePokemon } from '@/db/actions/pokemonActions/submitModalForm';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function PokemonModalForm({ pokemon }: { pokemon: iPokemon }) {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submitForm(formData: FormData) {
    try {
      setLoading(true);
      setTimeout(async () => {
        const res = await updatePokemon(formData);
        if (res?.message === 'Success!') {
          setSuccess(true);
          setLoading(false);
        }
      }, 2000);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div
      className={`fixed top-0 h-screen w-full bg-zinc-950/50 flex justify-center items-center z-50`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          router.replace('/dashboard');
        }
      }}
    >
      <article
        className={`bg-zinc-950 md:w-1/2 h-[80vh] overflow-scroll md:overflow-auto p-5 tinyFont rounded-md text-slate-50 overflow-y-scroll ${
          success
            ? 'transition ease-in shadow-glow shadow-green-500 p-4'
            : 'transition ease-out shadow-none'
        }`}
        // ${pokemonSaved && 'border-green-500 p-4 border-4'}
      >
        {/* pokemon name & pokedex num */}
        <header className="flex justify-between px-5">
          <div className="flex flex-col">
            <h2 className="text-2xl md:text-4xl">
              {pokemon.pokemonName.charAt(0).toLocaleUpperCase() +
                pokemon.pokemonName.replace(/-/g, ' ').slice(1)}
            </h2>
          </div>
          <h2 className="text-2xl md:text-4xl pb-4">#{pokemon.id}</h2>
        </header>
        <section>
          {/* pokemon's sprite(s) */}
          <ModalSprites pokemon={pokemon} />
          {/* hidden ability */}
          <ModalHidden pokemon={pokemon} />
        </section>
        <form className="flex flex-col" action={submitForm}>
          <input type="hidden" name="pokemon" value={JSON.stringify(pokemon)} />
          <input
            type="hidden"
            name="pokemon-forms-id"
            value={JSON.stringify(
              pokemon.forms.map((form) => {
                return { id: form.id };
              })
            )}
          />
          {/* nature Dropdown */}
          <ModalNature pokemonNature={pokemon.nature!} />
          {/* notes Dropdown */}
          <ModalNotes pokemonNotes={pokemon.notes || ''} />
          {/* Catch Types */}
          <ModalCatchTypes pokemon={pokemon} />
          {/* evSpread */}
          <ModalEvSpread pokemonEvSpread={pokemon.evSpread!} />
          {/* forms */}
          {pokemon.forms.length > 0 && (
            <ModalForms pokemonForms={pokemon.forms} />
          )}
          {/* Pokemon Locations */}
          <ModalLocation pokemonLocation={pokemon.pokemonLocation!} />
          {/* submit button */}
          <button className="transition hover:bg-zinc-800 duration-300 rounded-md text-2xl bg-zinc-900 py-1 px-4 self-center mt-5 flex flex-row gap-2 items-center justify-center">
            {loading && (
              <Image
                src={'/svg/pokeball.svg'}
                height={0}
                width={0}
                className="h-5 w-auto animate-spin"
                alt="Pokeball"
                unoptimized
              />
            )}
            Save
          </button>
          <Link
            href={'/dashboard'}
            className="transition hover:bg-zinc-800 duration-300 rounded-md text-2xl bg-zinc-900 py-1 px-4 w-20 self-center mt-5"
          >
            Close
          </Link>
        </form>
      </article>
    </div>
  );
}
