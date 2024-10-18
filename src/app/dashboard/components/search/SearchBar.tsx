'use client';

import { emptySearch, querySearch } from './searchActions';

export default function SearchBar() {
  return (
    <form
      className="flex flex-col justify-center items-center gap-4"
      action={querySearch}
    >
      <input
        className="w-[75vw] md:w-[50vw] text-center tinyFont rounded-sm text-sm md:text-lg h-10 md:h-auto px-4 text-black"
        type="text"
        placeholder="Search for Pokemon Name or Pokedex #"
        name="query"
        onChange={(e) => {
          return e.target.value === '' && emptySearch();
        }}
      />
      <button className="tinyFont text-zinc-50 rounded-md bg-zinc-900 px-4 py-1">
        Filters
      </button>
    </form>
  );
}
