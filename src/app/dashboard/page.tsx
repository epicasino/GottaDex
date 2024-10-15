'use server';
import PokemonCard from '@/components/dashboard/PokemonCard';
import prisma from '../../../prisma/db';

export default async function Page() {
  const userData = await prisma.user.findFirst();
  const pokedexData = await prisma.pokemon.findMany({
    include: {
      forms: true,
      evSpread: true,
      pokemonLocation: true,
    },
  });

  // console.log(userData);
  // console.log(pokedexData);

  return (
    <main>
      <section className="flex flex-row flex-wrap gap-5 justify-center px-16">
        {pokedexData.map((pokemon) => (
          <PokemonCard pokemon={pokemon} />
        ))}
      </section>
    </main>
  );
}
