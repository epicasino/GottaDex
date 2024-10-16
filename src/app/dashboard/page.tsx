'use server';
import { iUser, SearchParamProps } from '@/types/types';
import prisma from '../../../prisma/db';
import PokemonCard from '@/components/dashboard/PokemonCard';
import PokemonModal from '../../components/dashboard/modal/PokemonModal';

export default async function Page({ searchParams }: SearchParamProps) {
  const showModal = searchParams?.showModal;
  const pokemonId = searchParams?.pokemonId;

  const userData = await prisma.user.findFirst({
    include: {
      pokedex: {
        include: {
          forms: true,
        },
      },
    },
  });
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
    <main className={`${showModal && 'no-doc-scroll'}`}>
      {showModal && <PokemonModal pokemonId={pokemonId} />}
      <Header userData={userData} />
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

  // useEffect(() => {
  //   const caught = userData.pokemon.filter((pokemonEntry) => {
  //     if (
  //       (pokemonEntry.forms.length > 0 &&
  //         pokemonEntry.perfectIV &&
  //         pokemonEntry.forms.every((form) => form.perfectIV === true)) ||
  //       (!pokemonEntry.forms.length && pokemonEntry.perfectIV)
  //     ) {
  //       return true;
  //     } else return false;
  //   }).length;
  //   setPokemonCaught(caught);
  // }, [userData.pokemon, setPokemonCaught]);

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
