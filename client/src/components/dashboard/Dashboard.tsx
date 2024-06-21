import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { useEffect, useState } from 'react';
import { iUserDataDash } from './types';
import PokedexContainer from './pokedex/PokedexContainer';
import PokemonModal from './pokedex/modal/PokemonModal';

function Dashboard() {
  // { fetchPolicy: 'network-only' }
  const { loading, data, refetch } = useQuery(QUERY_ME);

  const userData: iUserDataDash = data?.me;
  const [showModal, setShowModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(0);
  const [refetched, setRefetched] = useState(false);

  // Locks user scrolling in dashboard when modal is showing
  useEffect(() => {
    showModal
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset');
  }, [showModal]);

  useEffect(() => {
    // console.log(refetched);
    if (!showModal) {
      if (!refetched) {
        refetch();
        // console.log('refetched');
        return setRefetched(true);
      }
    }
    if (showModal) {
      if (refetched) {
        return setRefetched(false);
      }
    }
  }, [showModal, refetched, refetch, loading]);

  return (
    <main className="min-h-screen min-w-screen bg-zinc-950 flex flex-col items-center">
      {loading ? (
        <header className="text-neutral-50 tinyFont text-5xl p-10 mt-[5vh]">
          Loading...
        </header>
      ) : (
        <>
          {showModal && (
            <PokemonModal
              setShowModal={setShowModal}
              selectedPokemonInfo={userData.pokemon[selectedPokemon]}
            />
          )}
          <header className="text-neutral-50 tinyFont p-10 mt-[5vh] flex flex-col items-center">
            <h1 className="text-5xl mb-5">Hello, {userData.username}!</h1>
            <PokemonCaughtCounter userData={userData} />
          </header>
          <PokedexContainer
            pokemon={userData.pokemon}
            setShowModal={setShowModal}
            setSelectedPokemon={setSelectedPokemon}
          />
        </>
      )}
    </main>
  );
}

function PokemonCaughtCounter({ userData }: { userData: iUserDataDash }) {
  const [pokemonCaught, setPokemonCaught] = useState(
    userData.pokemon.filter((pokemonEntry) => {
      if (
        (pokemonEntry.forms.length > 0 &&
          pokemonEntry.perfectIV &&
          pokemonEntry.forms.every((form) => form.perfectIV === true)) ||
        (!pokemonEntry.forms.length && pokemonEntry.perfectIV)
      ) {
        return true;
      } else return false;
    }).length
  );

  useEffect(() => {
    const caught = userData.pokemon.filter((pokemonEntry) => {
      if (
        (pokemonEntry.forms.length > 0 &&
          pokemonEntry.perfectIV &&
          pokemonEntry.forms.every((form) => form.perfectIV === true)) ||
        (!pokemonEntry.forms.length && pokemonEntry.perfectIV)
      ) {
        return true;
      } else return false;
    }).length;
    setPokemonCaught(caught);
  }, [userData.pokemon, setPokemonCaught]);

  return (
    <h4
      className={`text-4xl underline ${
        pokemonCaught === userData.pokemon.length && 'text-yellow-500'
      }`}
    >
      {pokemonCaught === userData.pokemon.length
        ? `All`
        : `${pokemonCaught} / ${userData.pokemon.length}`}{' '}
      {'Pokemon Caught!'}
    </h4>
  );
}

export default Dashboard;

// notes:
// 1 - 151 : gen 1
// 152 - 251 : gen 2
// 252 - 386 : gen 3
// 387 - 493 : gen 4
// 494 - 649 : gen 5
// 650 - 721 : gen 6
// 722 - 809 : gen 7
// 810 - 905 : gen 8
// 906 - 1025 : gen 9
