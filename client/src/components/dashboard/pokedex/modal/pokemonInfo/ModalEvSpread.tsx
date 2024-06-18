import { Dispatch } from 'react';
import { iEvSpread } from '../../../types';

function PokedexModalEvSpread({
  pokemonEv,
  setPokemonEv,
}: {
  pokemonEv: iEvSpread;
  setPokemonEv: Dispatch<React.SetStateAction<iEvSpread>>;
}) {
  return (
    <div>
      <h5 className="my-2 text-2xl text-center">Effort Values</h5>
      <div className="grid grid-cols-3 gap-5 justify-items-center items-end border-y-zinc-50 border-y-2 py-5">
        {/* hp */}
        <div className="flex justify-center items-center flex-col">
          <label htmlFor="hp">HP</label>
          <input
            className="text-2xl px-2 rounded text-zinc-950 w-full"
            type="number"
            value={pokemonEv.hp}
            onChange={(e) => {
              setPokemonEv({ ...pokemonEv, hp: parseInt(e.target.value) });
            }}
          />
        </div>
        {/* attack */}
        <div className="flex justify-center items-center flex-col">
          <label htmlFor="attack">Attack</label>
          <input
            className="text-2xl px-2 rounded text-zinc-950 w-full"
            type="number"
            value={pokemonEv.attack}
            onChange={(e) => {
              setPokemonEv({ ...pokemonEv, attack: parseInt(e.target.value) });
            }}
          />
        </div>
        {/* defense */}
        <div className="flex justify-center items-center flex-col">
          <label htmlFor="defense">Defense</label>
          <input
            className="text-2xl px-2 rounded text-zinc-950 w-full"
            type="number"
            value={pokemonEv.defense}
            onChange={(e) => {
              setPokemonEv({ ...pokemonEv, defense: parseInt(e.target.value) });
            }}
          />
        </div>
        {/* spAtk */}
        <div className="flex justify-center items-center flex-col">
          <label htmlFor="spAtk" className="text-center">
            Special Attack
          </label>
          <input
            className="text-2xl px-2 rounded text-zinc-950 w-full"
            type="number"
            value={pokemonEv.spAtk}
            onChange={(e) => {
              setPokemonEv({ ...pokemonEv, spAtk: parseInt(e.target.value) });
            }}
          />
        </div>
        {/* spDef */}
        <div className="flex justify-center items-center flex-col">
          <label htmlFor="spDef" className="text-center">
            Special Defense
          </label>
          <input
            className="text-2xl px-2 rounded text-zinc-950 w-full"
            type="number"
            value={pokemonEv.spDef}
            onChange={(e) => {
              setPokemonEv({ ...pokemonEv, spDef: parseInt(e.target.value) });
            }}
          />
        </div>
        {/* speed */}
        <div className="flex justify-center items-center flex-col">
          <label htmlFor="speed">Speed</label>
          <input
            className="text-2xl px-2 rounded text-zinc-950 w-full"
            type="number"
            value={pokemonEv.speed}
            onChange={(e) => {
              setPokemonEv({ ...pokemonEv, speed: parseInt(e.target.value) });
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PokedexModalEvSpread;

// hp: Int;
// attack: Int;
// defense: Int;
// spAtk: Int;
// spDef: Int;
// speed: Int;
