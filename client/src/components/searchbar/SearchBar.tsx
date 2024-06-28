import { Dispatch, useEffect, useState } from 'react';
import { iPokemon } from '../dashboard/types';

export default function SearchBar({
  pokemon,
  setPokemonList,
}: {
  pokemon: iPokemon[];
  setPokemonList: Dispatch<React.SetStateAction<iPokemon[]>>;
}) {
  const [searchItem, setSearchItem] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };

  useEffect(() => {
    if (searchItem === '') {
      // console.log('Searchbar Empty')
      setPokemonList(pokemon);
    } else {
      // if the search item cannot be parsed into a number, run this
      if (!parseInt(searchItem)) {
        // console.log(searchItem);
        const searchNames = pokemon.filter((pokemonEntry) => {
          if (pokemonEntry.pokemonName.includes(searchItem.toLowerCase())) {
            return true;
          } else return false;
        });

        // console.log(searchNames);
        setPokemonList(searchNames);
        // if the search item is a number
      } else {
        const searchNames = pokemon.filter((pokemonEntry) => {
          if (
            pokemonEntry.pokedexNum.toString().includes(searchItem.toString())
          ) {
            return true;
          } else return false;
        });

        // console.log(searchNames);
        setPokemonList(searchNames);
      }
    }
  }, [searchItem, pokemon, setPokemonList]);

  return (
    <div className="flex justify-center">
      <input
        className="w-[75vw] md:w-[50vw] text-center tinyFont rounded-sm text-sm md:text-lg h-10 md:h-auto px-4"
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder="Search for Pokemon Name or Pokedex #"
      />
    </div>
  );
}
