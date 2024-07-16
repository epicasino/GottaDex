import { Dispatch, useEffect, useState } from 'react';
import { iPokemon } from '../dashboard/types';

export default function SearchBar({
  pokemon,
  setPokemonList,
}: {
  pokemon: iPokemon[];
  setPokemonList: Dispatch<React.SetStateAction<iPokemon[]>>;
}) {
  const [filters, setFilters] = useState({
    uncaught: false,
    inProgress: false,
    perfectIV: false,
    shiny: false,
  });

  const [searchItem, setSearchItem] = useState('');

  const [filterButtonClicked, setFilteredButtonClicked] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };

  useEffect(() => {
    handleFilters({
      filters,
      pokemon,
      setPokemonList,
    });
  }, [filters, pokemon, setPokemonList]);

  useEffect(() => {
    if (searchItem === '') {
      // console.log(pokemonList)
      return setPokemonList(pokemon);
    }
    if (!parseInt(searchItem)) {
      // console.log(searchItem);
      const searchNames = pokemon.filter((pokemonEntry) => {
        if (
          pokemonEntry.pokemonName.includes(
            searchItem.trim().split(' ').join('-').toLowerCase()
          )
        ) {
          return true;
        } else return false;
      });
      // console.log(searchNames);
      return setPokemonList(searchNames);
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
      return setPokemonList(searchNames);
    }
  }, [pokemon, searchItem, setPokemonList]);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <input
        className="w-[75vw] md:w-[50vw] text-center tinyFont rounded-sm text-sm md:text-lg h-10 md:h-auto px-4"
        type="text"
        value={searchItem}
        onChange={handleInputChange}
        placeholder="Search for Pokemon Name or Pokedex #"
      />
      <button
        className="tinyFont text-zinc-50 rounded-md bg-zinc-900 px-4 py-1"
        onClick={() => {
          setFilteredButtonClicked(!filterButtonClicked);
        }}
      >
        Filters
      </button>
      <div
        className={`flex flex-col gap-2 tinyFont text-zinc-50 ${
          !filterButtonClicked && 'hidden'
        }`}
      >
        <h5 className="text-center border-b-zinc-50 border-b-2 text-2xl">
          Hide
        </h5>
        <div className="flex flex-row gap-5">
          <label>
            Uncaught?
            <input
              type="checkbox"
              checked={filters.uncaught}
              disabled={
                filters.inProgress || filters.perfectIV || filters.shiny
              }
              onChange={() => {
                setFilters({ ...filters, uncaught: !filters.uncaught });
              }}
            />
          </label>
          <label>
            In Progress?
            <input
              type="checkbox"
              checked={filters.inProgress}
              disabled={filters.uncaught || filters.perfectIV || filters.shiny}
              onChange={() => {
                setFilters({ ...filters, inProgress: !filters.inProgress });
              }}
            />
          </label>
          <label>
            PerfectIV?
            <input
              type="checkbox"
              checked={filters.perfectIV}
              disabled={filters.uncaught || filters.inProgress || filters.shiny}
              onChange={() => {
                setFilters({ ...filters, perfectIV: !filters.perfectIV });
              }}
            />
          </label>
          <label>
            Shiny?
            <input
              type="checkbox"
              checked={filters.shiny}
              disabled={
                filters.uncaught || filters.inProgress || filters.perfectIV
              }
              onChange={() => {
                setFilters({ ...filters, shiny: !filters.shiny });
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

function handleFilters({
  filters,
  pokemon,
  setPokemonList,
}: {
  filters: {
    uncaught: boolean;
    inProgress: boolean;
    perfectIV: boolean;
    shiny: boolean;
  };
  pokemon: iPokemon[];
  setPokemonList: Dispatch<React.SetStateAction<iPokemon[]>>;
}) {
  const uncaughtPokemon = pokemon.filter((entry) => {
    if (
      entry.forms.length > 0 &&
      entry.forms.every((form) => {
        return !form.caught;
      })
    ) {
      return entry.genderDifference
        ? !entry.caught &&
            !entry.femaleCaught &&
            !entry.hiddenAbilityCaught &&
            !entry.femaleHiddenAbilityCaught &&
            !entry.perfectIV &&
            !entry.femalePerfectIV
        : !entry.caught && !entry.hiddenAbilityCaught && !entry.perfectIV;
    } else if (entry.forms.length === 0) {
      return entry.genderDifference
        ? !entry.caught &&
            !entry.femaleCaught &&
            !entry.hiddenAbilityCaught &&
            !entry.femaleHiddenAbilityCaught &&
            !entry.perfectIV &&
            !entry.femalePerfectIV
        : !entry.caught && !entry.hiddenAbilityCaught && !entry.perfectIV;
    }
  });

  const perfectIVPokemon = pokemon.filter((entry) => {
    if (
      entry.forms.length > 0 &&
      entry.forms.every((form) => {
        return form.perfectIV;
      })
    ) {
      return entry.genderDifference
        ? entry.perfectIV && entry.femalePerfectIV
        : entry.perfectIV;
    } else if (entry.forms.length === 0) {
      return entry.genderDifference
        ? entry.perfectIV && entry.femalePerfectIV
        : entry.perfectIV;
    }
  });

  const shinyPokemon = pokemon.filter((entry) => {
    if (
      entry.forms.length > 0 &&
      entry.forms.some((form) => {
        return form.shinyCaught;
      })
    ) {
      return entry.genderDifference
        ? entry.shinyCaught && entry.femaleShinyCaught
        : entry.shinyCaught;
    } else if (entry.forms.length === 0) {
      return entry.genderDifference
        ? entry.shinyCaught && entry.femaleShinyCaught
        : entry.shinyCaught;
    }
  });

  const inProgressPokemon = pokemon.filter((entry) => {
    return !(
      perfectIVPokemon.includes(entry) || uncaughtPokemon.includes(entry)
    );
  });

  if (filters.uncaught) {
    return setPokemonList(
      pokemon.filter((entry) => {
        return (
          inProgressPokemon.includes(entry) || perfectIVPokemon.includes(entry)
        );
      })
    );
  }
  if (filters.inProgress) {
    return setPokemonList(
      pokemon.filter((entry) => {
        return (
          uncaughtPokemon.includes(entry) || perfectIVPokemon.includes(entry)
        );
      })
    );
  }
  if (filters.perfectIV) {
    return setPokemonList(
      pokemon.filter((entry) => {
        return (
          uncaughtPokemon.includes(entry) || inProgressPokemon.includes(entry)
        );
      })
    );
  }
  if (filters.shiny) {
    return setPokemonList(
      pokemon.filter((entry) => {
        return !shinyPokemon.includes(entry);
      })
    );
  }
  if (
    !(
      filters.uncaught &&
      filters.inProgress &&
      filters.perfectIV &&
      filters.shiny
    )
  ) {
    setPokemonList(pokemon);
  }
}
