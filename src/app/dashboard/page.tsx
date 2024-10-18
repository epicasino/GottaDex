'use server';
import { iUser, SearchParamProps } from '@/types/types';
import prisma from '../../../prisma/db';
import PokemonCard from '@/app/dashboard/components/PokemonCard';
import PokemonModal from './components/modal/PokemonModal';
import SearchBar from './components/search/SearchBar';

export default async function Page({ searchParams }: SearchParamProps) {
  const showModal = searchParams?.showModal;
  const pokemonId = searchParams?.pokemonId;
  const query = searchParams?.query;
  const userData = await prisma.user.findFirst({
    include: {
      pokedex: {
        include: {
          forms: true,
        },
      },
    },
  });
  const pokedexData = query
    ? isNaN(parseInt(query))
      ? await prisma.pokemon.findMany({
          where: {
            pokemonName: {
              startsWith: `%${query}%`,
            },
          },

          include: {
            forms: true,
            evSpread: true,
            pokemonLocation: true,
          },
        })
      : await prisma.pokemon.findMany({
          where: {
            id: parseInt(query),
          },

          include: {
            forms: true,
            evSpread: true,
            pokemonLocation: true,
          },
        })
    : await prisma.pokemon.findMany({
        include: {
          forms: true,
          evSpread: true,
          pokemonLocation: true,
        },
      });
  // console.log(typeof query);
  // console.log(pokedexData);

  return (
    <main className={`${showModal && 'no-doc-scroll'}`}>
      {showModal && <PokemonModal pokemonId={pokemonId} />}
      <Header userData={userData} />
      <SearchBar />
      <section className="flex flex-row flex-wrap gap-5 justify-center px-16">
        {pokedexData.map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.id} />
        ))}
      </section>
    </main>
  );
}

function Header({ userData }: { userData: iUser | null }) {
  return (
    <header className="text-neutral-50 tinyFont p-5 md:p-10 mt-[5vh] flex flex-col items-center">
      <h1 className="text-5xl mb-5">Hello, {userData?.username}!</h1>
      <PokemonCaughtCounter userData={userData} />
    </header>
  );
}

function PokemonCaughtCounter({ userData }: { userData: iUser | null }) {
  const pokemonCaught = userData?.pokedex.filter((pokemonEntry) => {
    if (
      (pokemonEntry.forms.length > 0 &&
        pokemonEntry.perfectIV &&
        pokemonEntry.forms.every((form) => form.perfectIV === true)) ||
      (!pokemonEntry.forms.length && pokemonEntry.perfectIV)
    ) {
      return true;
    } else return false;
  }).length;

  return (
    <h4
      className={`text-2xl md:text-4xl underline ${
        pokemonCaught === userData?.pokedex.length && 'text-yellow-500'
      }`}
    >
      {pokemonCaught === userData?.pokedex.length
        ? `All`
        : `${pokemonCaught} / ${userData?.pokedex.length}`}{' '}
      {'Pokemon Caught!'}
    </h4>
  );
}

{
  /* <div className={`flex flex-col gap-2 tinyFont text-zinc-50`}>
  {!filterButtonClicked && 'hidden'}
  <h5 className="text-center border-b-zinc-50 border-b-2 text-2xl">Hide</h5>
  <div className="flex flex-row gap-5">
    <label>
      Uncaught?
      <input type="checkbox" />
    </label>
    <label>
      In Progress?
      <input type="checkbox" />
    </label>
    <label>
      PerfectIV?
      <input type="checkbox" />
    </label>
    <label>
      Shiny?
      <input type="checkbox" />
    </label>
  </div>
</div>; */
}
