import React, { Dispatch } from 'react';
import { iPokemon } from '../../../types';

interface iCatchTypes {
  pokemon: iPokemon;
  caughtTypes: {
    caught: boolean;
    hiddenAbilityCaught: boolean;
    perfectIV: boolean;
    shinyCaught: boolean;
  };
  setCaughtTypes: Dispatch<
    React.SetStateAction<{
      caught: boolean;
      hiddenAbilityCaught: boolean;
      perfectIV: boolean;
      shinyCaught: boolean;
    }>
  >;
  femaleCaughtTypes: {
    femaleCaught: boolean;
    femaleHiddenAbilityCaught: boolean;
    femalePerfectIV: boolean;
    femaleShinyCaught: boolean;
  };
  setFemaleCaughtTypes: Dispatch<
    React.SetStateAction<{
      femaleCaught: boolean;
      femaleHiddenAbilityCaught: boolean;
      femalePerfectIV: boolean;
      femaleShinyCaught: boolean;
    }>
  >;
}

// THIS IS DIV SOUP.

export default function ModalCatchTypes({
  pokemon,
  caughtTypes,
  setCaughtTypes,
  femaleCaughtTypes,
  setFemaleCaughtTypes,
}: iCatchTypes) {
  return (
    <div className="flex flex-col py-5 px-2">
      <h5 className="text-2xl border-b-zinc-50 border-b-2 pb-2 mb-2 text-center">
        Did You Catch...
      </h5>
      {pokemon.genderDifference ? (
        <div className="grid md:grid-cols-2 justify-items-center py-4">
          <div className="flex flex-col">
            <h6 className="text-xl underline">Male</h6>
            <label>
              Caught Male?
              <input
                type="checkbox"
                checked={caughtTypes.caught}
                onChange={() => {
                  setCaughtTypes({
                    ...caughtTypes,
                    caught: !caughtTypes.caught,
                  });
                }}
              />
            </label>
            <label>
              w/ Hidden Ability?
              <input
                type="checkbox"
                checked={caughtTypes.caught}
                onChange={() => {
                  setCaughtTypes({
                    ...caughtTypes,
                    caught: !caughtTypes.caught,
                  });
                }}
              />
            </label>
            <label>
              Perfect IV w/ Hidden Ability?
              <input
                type="checkbox"
                checked={caughtTypes.caught}
                onChange={() => {
                  setCaughtTypes({
                    ...caughtTypes,
                    caught: !caughtTypes.caught,
                  });
                }}
              />
            </label>
          </div>
          <div className="flex flex-col">
            <h6 className="text-xl underline">Female</h6>
            <label>
              Caught Female?
              <input
                type="checkbox"
                checked={femaleCaughtTypes.femaleCaught}
                onChange={() => {
                  setFemaleCaughtTypes({
                    ...femaleCaughtTypes,
                    femaleCaught: !femaleCaughtTypes.femaleCaught,
                  });
                }}
              />
            </label>
            <label>
              w/ Hidden Ability?
              <input
                type="checkbox"
                checked={femaleCaughtTypes.femaleHiddenAbilityCaught}
                onChange={() => {
                  setFemaleCaughtTypes({
                    ...femaleCaughtTypes,
                    femaleHiddenAbilityCaught:
                      !femaleCaughtTypes.femaleHiddenAbilityCaught,
                  });
                }}
              />
            </label>
            <label>
              Perfect IV w/ Hidden Ability?
              <input
                type="checkbox"
                checked={femaleCaughtTypes.femalePerfectIV}
                onChange={() => {
                  setFemaleCaughtTypes({
                    ...femaleCaughtTypes,
                    femaleCaught: !femaleCaughtTypes.femalePerfectIV,
                  });
                }}
              />
            </label>
          </div>
        </div>
      ) : (
        // when there isn't a gender difference
        <></>
      )}
    </div>
  );
}
