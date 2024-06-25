import React, { Dispatch } from 'react';
import { iPokemonForms } from '../../../types';

export default function ModalForms({
  pokemonForms,
  setPokemonForms,
}: {
  pokemonForms: Array<iPokemonForms>;
  setPokemonForms: Dispatch<React.SetStateAction<Array<iPokemonForms>>>;
}) {
  return (
    <div>
      <h5 className="my-2 text-2xl text-center border-b-zinc-50 border-b-2 pb-5">
        Forms
      </h5>
      <div className="gap-5 justify-items-center flex flex-row flex-wrap overflow-y-auto h-[35vh] justify-center">
        {pokemonForms.map((pokemonForm) => (
          <PokemonForm
            pokemonForm={pokemonForm}
            pokemonForms={pokemonForms}
            setPokemonForms={setPokemonForms}
            key={pokemonForm.formName}
          />
        ))}
      </div>
    </div>
  );
}

function PokemonForm({
  pokemonForm,
  pokemonForms,
  setPokemonForms,
}: {
  pokemonForm: iPokemonForms;
  pokemonForms: Array<iPokemonForms>;
  setPokemonForms: Dispatch<React.SetStateAction<Array<iPokemonForms>>>;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row justify-center items-center">
        <img src={pokemonForm.sprite} className=" w-24" />
        <img src={pokemonForm.shinySprite} className=" w-24" />
      </div>
      <p>{pokemonForm.formName}</p>
      <label>
        Caught?
        <input
          type="checkbox"
          checked={pokemonForm.caught}
          onChange={() => {
            const tempArr = pokemonForms.map((form) => {
              if (form.formName === pokemonForm.formName) {
                return { ...form, caught: !pokemonForm.caught };
              } else return form;
            }) as [iPokemonForms];
            setPokemonForms(tempArr);
          }}
        />
      </label>
      <label>
        Perfect IV?
        <input
          type="checkbox"
          checked={pokemonForm.perfectIV}
          onChange={() => {
            const tempArr = pokemonForms.map((form) => {
              if (form.formName === pokemonForm.formName) {
                return { ...form, perfectIV: !pokemonForm.perfectIV };
              } else return form;
            }) as [iPokemonForms];
            setPokemonForms(tempArr);
          }}
        />
      </label>
      {pokemonForm.hiddenAbility && (
        <>
          <p>Hidden Ability: {pokemonForm.hiddenAbility}</p>
          <label>
            Caught w/ Hidden Ability?
            <input
              type="checkbox"
              checked={pokemonForm.hiddenAbilityCaught}
              onChange={() => {
                const tempArr = pokemonForms.map((form) => {
                  if (form.formName === pokemonForm.formName) {
                    return {
                      ...form,
                      hiddenAbilityCaught: !pokemonForm.hiddenAbilityCaught,
                    };
                  } else return form;
                }) as [iPokemonForms];
                setPokemonForms(tempArr);
              }}
            />
          </label>
        </>
      )}
      {pokemonForm.shinySprite !== null && (
        <label>
          Shiny Caught?
          <input
            type="checkbox"
            checked={pokemonForm.shinyCaught}
            onChange={() => {
              const tempArr = pokemonForms.map((form) => {
                if (form.formName === pokemonForm.formName) {
                  return {
                    ...form,
                    shinyCaught: !pokemonForm.shinyCaught,
                  };
                } else return form;
              }) as [iPokemonForms];
              setPokemonForms(tempArr);
            }}
          />
        </label>
      )}
    </div>
  );
}
