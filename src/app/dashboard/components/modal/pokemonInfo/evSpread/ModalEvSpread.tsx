'use client';
import { useEffect, useState } from 'react';
import { iEvSpread } from '@/types/types';

export default function ModalEvSpread({
  pokemonEvSpread,
}: {
  pokemonEvSpread: iEvSpread;
}) {
  const { hp, attack, defense, spAtk, spDef, speed } = pokemonEvSpread;
  const [evSpread, setEvSpread] = useState({
    hp,
    attack,
    defense,
    spAtk,
    spDef,
    speed,
  });
  // console.log(evSpread);
  const [evSum, setEvSum] = useState(() => {
    if (evSpread !== null)
      return Object.values(evSpread).reduce((a, b) => a + b, 0);
  });

  const [evSumErr, setEvSumErr] = useState(false);

  useEffect(() => {
    if (evSpread !== null) {
      const sum = Object.values(evSpread).reduce((a, b) => a + b, 0);
      setEvSum(Number.isNaN(sum) ? 0 : sum);
      if (sum > 510) {
        setEvSumErr(true);
      } else {
        setEvSumErr(false);
      }
    }
  }, [evSpread]);

  // console.log(evSum);

  return (
    evSpread !== null && (
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
              name="ev-hp"
              value={evSpread.hp === null ? 0 : evSpread.hp}
              min={0}
              max={255}
              onChange={(e) => {
                setEvSpread({ ...evSpread, hp: parseInt(e.target.value) });
              }}
            />
          </div>
          {/* attack */}
          <div className="flex justify-center items-center flex-col">
            <label htmlFor="attack">Attack</label>
            <input
              className="text-2xl px-2 rounded text-zinc-950"
              type="number"
              value={evSpread.attack === null ? 0 : evSpread.attack}
              name="ev-attack"
              min={0}
              max={255}
              onChange={(e) => {
                setEvSpread({
                  ...evSpread,
                  attack: parseInt(e.target.value),
                });
              }}
            />
          </div>
          {/* defense */}
          <div className="flex justify-center items-center flex-col">
            <label htmlFor="defense">Defense</label>
            <input
              className="text-2xl px-2 rounded text-zinc-950"
              type="number"
              value={evSpread.defense === null ? 0 : evSpread.defense}
              name="ev-defense"
              min={0}
              max={255}
              onChange={(e) => {
                setEvSpread({
                  ...evSpread,
                  defense: parseInt(e.target.value),
                });
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
              name="ev-spAtk"
              type="number"
              value={evSpread.spAtk === null ? 0 : evSpread.spAtk}
              min={0}
              max={255}
              onChange={(e) => {
                setEvSpread({ ...evSpread, spAtk: parseInt(e.target.value) });
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
              value={evSpread.spDef === null ? 0 : evSpread.spDef}
              name="ev-spDef"
              min={0}
              max={255}
              onChange={(e) => {
                setEvSpread({ ...evSpread, spDef: parseInt(e.target.value) });
              }}
            />
          </div>
          {/* speed */}
          <div className="flex justify-center items-center flex-col">
            <label htmlFor="speed">Speed</label>
            <input
              className="text-2xl px-2 rounded text-zinc-950"
              type="number"
              value={evSpread.speed === null ? 0 : evSpread.speed}
              name="ev-speed"
              min={0}
              max={255}
              onChange={(e) => {
                setEvSpread({ ...evSpread, speed: parseInt(e.target.value) });
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
    )
  );
}

// hp: Int;
// attack: Int;
// defense: Int;
// spAtk: Int;
// spDef: Int;
// speed: Int;

// max 510 in all stats
