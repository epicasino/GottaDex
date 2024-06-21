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
      <h5 className="my-2 text-2xl text-center">Forms</h5>
      <div className="gap-5 justify-items-center pt-5 flex flex-row flex-wrap overflow-y-auto h-[15vh] justify-center">
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
      <img src={pokemonForm.sprite} className=" w-24" />
      <p>{pokemonForm.formName}</p>
      <label>
        Caught?
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
        <p>Hidden Ability: {pokemonForm.hiddenAbility}</p>
      )}
    </div>
  );
}
