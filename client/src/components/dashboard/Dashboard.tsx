import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../utils/queries';
import { useState } from 'react';
import { iUserDataDash } from './types';
import PokedexContainer from './pokedex/PokedexContainer';
import PokemonModal from './pokedex/modal/PokemonModal';

function Dashboard() {
  // { fetchPolicy: 'network-only' }
  const { loading, data } = useQuery(QUERY_ME);

  const userData: iUserDataDash = data?.me;

  const [showModal, setShowModal] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(0);

  // console.log(userData);
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
          <header className="text-neutral-50 tinyFont text-5xl p-10 mt-[5vh]">
            Hello, {userData.username}!
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
