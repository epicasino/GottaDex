'use server';

import { iPokemon } from '@/types/types';

interface iPokemonFormsForm {
  id: number;
  caught: boolean | null;
  hiddenAbilityCaught: boolean | null;
  perfectIV: boolean | null;
  shinyCaught: boolean | null;
}

export async function submitModalForm(formData: FormData) {
  const pokemon: iPokemon = JSON.parse(formData.get('pokemon') as string);

  const pokemonFormData = {
    id: formData.get('pokemon-id')!,
    nature: formData.get('nature'),
    notes: formData.get('notes'),
    caught: formData.get('caught') === 'on',
    hiddenAbilityCaught:
      pokemon.hiddenAbility !== null
        ? formData.get('caught-w-hidden-ability') === 'on'
        : null,
    perfectIV: formData.get('perfect-iv-w-hidden-ability') === 'on',
    shinyCaught:
      pokemon.shinySprite !== null
        ? formData.get('shiny-caught') === 'on'
        : null,
    femaleCaught: pokemon.genderDifference
      ? formData.get('caught-female') === 'on'
      : null,
    femaleHiddenAbilityCaught: pokemon.genderDifference
      ? formData.get('caught-female-w-hidden-ability') === 'on'
      : null,
    femalePerfectIV: pokemon.genderDifference
      ? formData.get('perfect-iv-female-w-hidden-ability') === 'on'
      : null,
    femaleShinyCaught: pokemon.genderDifference
      ? formData.get('caught-female-shiny') === 'on'
      : null,
  };

  const pokemonEvFormData = {
    hp: formData.get('ev-hp'),
    attack: formData.get('ev-attack'),
    defense: formData.get('ev-defense'),
    spAtk: formData.get('ev-spAtk'),
    spDef: formData.get('ev-spDef'),
    speed: formData.get('ev-speed'),
  };

  // console.log(pokemon);
  const pokemonForms: Array<iPokemonFormsForm> = pokemon.forms.map((form) => {
    const formUserData = {
      id: form.id,
      caught: formData.get(`${form.id}-caught`),
      hiddenAbilityCaught: formData.get(`${form.id}-hiddenabilitycaught`),
      perfectIV: formData.get(`${form.id}-perfectiv`),
      shinyCaught: formData.get(`${form.id}-shinycaught`),
    };
    return {
      id: formUserData.id,
      caught: formUserData.caught === 'on',
      hiddenAbilityCaught: formUserData.hiddenAbilityCaught === 'on',
      perfectIV: formUserData.perfectIV === 'on',
      shinyCaught: formUserData.shinyCaught === 'on',
    };
  });

  // console.log(pokemonForms);
}
