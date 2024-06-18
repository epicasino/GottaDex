import { Dispatch } from 'react';
import natures from '../../../../../utils/json/natures.json';

function PokedexModalNature({
  pokemonNature,
  setPokemonNature,
}: {
  pokemonNature: string;
  setPokemonNature: Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex justify-center items-center">
      <label htmlFor="nature" className="text-lg mr-2">
        Nature:
      </label>
      <select
        name="nature"
        className="text-zinc-950"
        value={pokemonNature !== '' ? pokemonNature : 'None'}
        onChange={(e) => {
          setPokemonNature(e.target.value);
        }}
      >
        <option value="None" disabled>
          Choose Desired Nature
        </option>
        {natures.map((nature) => (
          <option
            value={nature.natureName}
            key={nature.natureName}
            className="text-zinc-950"
          >
            {nature.natureName} ({nature.natureValue})
          </option>
        ))}
      </select>
    </div>
  );
}

export default PokedexModalNature;
