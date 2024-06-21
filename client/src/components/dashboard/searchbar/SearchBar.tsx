import { Dispatch, useEffect, useState } from 'react';
import { iPokemon } from '../types';

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
      // console.log(searchItem);
      const searchNames = pokemon.filter((pokemonEntry) => {
        if (pokemonEntry.pokemonName.includes(searchItem.toLowerCase())) {
          return true;
        } else return false;
      });

      // console.log(searchNames);
      setPokemonList(searchNames);
    }
  }, [searchItem, pokemon, setPokemonList]);

  return (
    <div className="flex justify-center">
      <input
        className="w-[50vw] text-center tinyFont rounded-sm text-lg px-4"
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder="Search for Pokemon Name or Pokedex #"
      />
    </div>
  );
}
