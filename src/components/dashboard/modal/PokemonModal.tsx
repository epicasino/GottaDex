'use server';

import prisma from '../../../../prisma/db';
import ModalSprites from './pokemonInfo/ModalSprites';
import Link from 'next/link';
import ModalHidden from './pokemonInfo/ModalHidden';
import ModalNature from './pokemonInfo/ModalNature';
import ModalNotes from './pokemonInfo/ModalNotes';
import ModalCatchTypes from './pokemonInfo/ModalCatchTypes';
import ModalEvSpread from './pokemonInfo/evSpread/ModalEvSpread';
import ModalForms from './pokemonInfo/ModalForms';
import ModalLocation from './pokemonInfo/ModalLocation';
import { submitModalForm } from '@/db/actions/pokemonActions/submitModalForm';

export default async function PokemonModal({
  pokemonId,
}: {
  pokemonId?: string | null;
}) {
  const pokemon = await prisma.pokemon.findFirst({
    where: { id: parseInt(pokemonId ? pokemonId : '') },
    include: { forms: true, evSpread: true, pokemonLocation: true },
  });

  // console.log(pokemon);

  return (
    pokemon !== null && (
      <div
        className={`fixed top-0 h-screen w-full bg-zinc-950/50 flex justify-center items-center z-50`}
      >
        <article
          className={`bg-zinc-950 md:w-1/2 h-[80vh] overflow-scroll md:overflow-auto p-5 tinyFont rounded-md text-slate-50 overflow-y-scroll`}
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
          <form className="flex flex-col" action={submitModalForm}>
            <input
              type="hidden"
              name="pokemon"
              value={JSON.stringify(pokemon)}
            />
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
            <ModalNature pokemonNature={pokemon.nature} />
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
            <button className="transition hover:bg-zinc-800 duration-300 rounded-md text-2xl bg-zinc-900 py-1 px-4 w-20 self-center mt-5">
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
    )
  );
}

// hp: Int;
// attack: Int;
// defense: Int;
// spAtk: Int;
// spDef: Int;
// speed: Int;
