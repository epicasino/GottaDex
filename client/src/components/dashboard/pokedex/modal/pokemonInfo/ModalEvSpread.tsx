import { Dispatch, useEffect, useState } from 'react';
import { iEvSpread } from '../../../types';

export default function ModalEvSpread({
  pokemonEv,
  setPokemonEv,
}: {
  pokemonEv: iEvSpread;
  setPokemonEv: Dispatch<React.SetStateAction<iEvSpread>>;
}) {
  const [evSum, setEvSum] = useState(() => {
    return Object.values(pokemonEv).reduce((a, b) => a + b, 0);
  });

  const [evSumErr, setEvSumErr] = useState(false);

  useEffect(() => {
    const sum = Object.values(pokemonEv).reduce(
      (a, b) => (b === '' ? a : a + b),
      0
    );

    setEvSum(Number.isNaN(sum) ? 0 : sum);
    sum > 510 ? setEvSumErr(true) : setEvSumErr(false);
  }, [pokemonEv]);

  // console.log(evSum);

  return (
    <div>
      <h5 className="my-2 text-2xl text-center border-b-zinc-50 border-b-2 pb-5">
        Effort Values
      </h5>
      <div className="grid grid-cols-3 gap-5 justify-items-center items-end">
        {/* hp */}
        <div className="flex justify-center items-center flex-col">
          <label htmlFor="hp">HP</label>
          <input
            className="text-2xl px-2 rounded text-zinc-950"
            type="number"
            value={pokemonEv.hp === null ? 0 : pokemonEv.hp}
            min={0}
            max={255}
            onChange={(e) => {
              setPokemonEv({ ...pokemonEv, hp: parseInt(e.target.value) });
            }}
          />
        </div>
        {/* attack */}
        <div className="flex justify-center items-center flex-col">
          <label htmlFor="attack">Attack</label>
          <input
            className="text-2xl px-2 rounded text-zinc-950"
            type="number"
            value={pokemonEv.attack === null ? 0 : pokemonEv.attack}
            min={0}
            max={255}
            onChange={(e) => {
              setPokemonEv({ ...pokemonEv, attack: parseInt(e.target.value) });
            }}
          />
        </div>
        {/* defense */}
        <div className="flex justify-center items-center flex-col">
          <label htmlFor="defense">Defense</label>
          <input
            className="text-2xl px-2 rounded text-zinc-950"
            type="number"
            value={pokemonEv.defense === null ? 0 : pokemonEv.defense}
            min={0}
            max={255}
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
            className="text-2xl px-2 rounded text-zinc-950"
            type="number"
            value={pokemonEv.spAtk === null ? 0 : pokemonEv.spAtk}
            min={0}
            max={255}
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
            className="text-2xl px-2 rounded text-zinc-950"
            type="number"
            value={pokemonEv.spDef === null ? 0 : pokemonEv.spDef}
            min={0}
            max={255}
            onChange={(e) => {
              setPokemonEv({ ...pokemonEv, spDef: parseInt(e.target.value) });
            }}
          />
        </div>
        {/* speed */}
        <div className="flex justify-center items-center flex-col">
          <label htmlFor="speed">Speed</label>
          <input
            className="text-2xl px-2 rounded text-zinc-950"
            type="number"
            value={pokemonEv.speed === null ? 0 : pokemonEv.speed}
            min={0}
            max={255}
            onChange={(e) => {
              setPokemonEv({ ...pokemonEv, speed: parseInt(e.target.value) });
            }}
          />
        </div>
      </div>
      <div className="my-5">
        {evSumErr && (
          <>
            <p className="text-center">
              WARNING: Effort Values Exceed Total of 510!
            </p>
            <p className="text-center">
              Values Will <span className="underline">NOT</span> Save.
            </p>
          </>
        )}
        <p
          className={`border-b-zinc-50 text-center text-xl ${
            evSumErr && 'text-red-600'
          }`}
        >
          {evSum} / 510
        </p>
      </div>
    </div>
  );
}

// hp: Int;
// attack: Int;
// defense: Int;
// spAtk: Int;
// spDef: Int;
// speed: Int;

// max 510 in all stats
