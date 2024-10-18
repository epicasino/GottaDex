'use server';

import prisma from '../../../../../prisma/db';
import PokemonModalForm from './PokemonModalForm';

export default async function PokemonModal({
  pokemonId,
}: {
  pokemonId?: string;
}) {
  const pokemon = await prisma.pokemon.findFirst({
    where: { id: parseInt(pokemonId ? pokemonId : '') },
    include: { forms: true, evSpread: true, pokemonLocation: true },
  });

  return pokemon !== null && <PokemonModalForm pokemon={pokemon} />;
}

// hp: Int;
// attack: Int;
// defense: Int;
// spAtk: Int;
// spDef: Int;
// speed: Int;
