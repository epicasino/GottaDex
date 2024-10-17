'use server';

import { iPokemon } from '@/types/types';
import prisma from '@/../prisma/db';
import { revalidatePath } from 'next/cache';

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
    nature: formData.get('nature') as string,
    notes: formData.get('notes') as string,
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
  // console.log(pokemonFormData);

  const pokemonEvFormData = {
    hp:
      formData.get('ev-hp') === null
        ? 0
        : parseInt(formData.get('ev-hp') as string),
    attack:
      formData.get('ev-attack') === null
        ? 0
        : parseInt(formData.get('ev-attack') as string),
    defense:
      formData.get('ev-defense') === null
        ? 0
        : parseInt(formData.get('ev-defense') as string),
    spAtk:
      formData.get('ev-spAtk') === null
        ? 0
        : parseInt(formData.get('ev-spAtk') as string),
    spDef:
      formData.get('ev-spDef') === null
        ? 0
        : parseInt(formData.get('ev-spDef') as string),
    speed:
      formData.get('ev-speed') === null
        ? 0
        : parseInt(formData.get('ev-speed') as string),
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

  try {
    const {
      nature,
      notes,
      caught,
      hiddenAbilityCaught,
      perfectIV,
      shinyCaught,
      femaleCaught,
      femaleHiddenAbilityCaught,
      femalePerfectIV,
      femaleShinyCaught,
    } = pokemonFormData;
    const updatedPokemon = await prisma.pokemon.update({
      where: {
        userId: pokemon.userId,
        id: pokemon.id,
      },
      data: {
        nature,
        notes,
        caught,
        hiddenAbilityCaught,
        perfectIV,
        shinyCaught,
        femaleCaught,
        femaleHiddenAbilityCaught,
        femalePerfectIV,
        femaleShinyCaught,
      },
    });
    // console.log(updatedPokemon);
    const updatedPokemonForms =
      pokemonForms.length > 0
        ? pokemonForms.map(async (form) => {
            const { caught, hiddenAbilityCaught, perfectIV, shinyCaught } =
              form;
            const updatedForm = prisma.pokemonForm.update({
              where: { id: form.id },
              data: {
                caught,
                hiddenAbilityCaught,
                perfectIV: perfectIV as boolean,
                shinyCaught,
              },
            });
            return updatedForm;
          })
        : [];
    // console.log(updatedPokemonForms);
    const { hp, attack, defense, spAtk, spDef, speed } = pokemonEvFormData;
    const updatedPokemonEv =
      Object.values(pokemonEvFormData).reduce((a, b) => a + b) <= 510 &&
      (await prisma.evSpread.update({
        where: { id: pokemon.evSpread?.id },
        data: { hp, attack, defense, spAtk, spDef, speed },
      }));
    // console.log(updatedPokemonEv);
    if (updatedPokemon && updatedPokemonEv && updatedPokemonForms) {
      revalidatePath(`/dashboard/?showModal=true&pokemonId=${pokemon.id}`);
      // find some better way of doing this
    } else if (!updatedPokemonEv) {
      revalidatePath(`/dashboard/?showModal=true&pokemonId=${pokemon.id}`);
    }
    // return { updatedPokemon, updatedPokemonForms, updatedPokemonEv };
  } catch (e) {
    console.error(e);
    // find some better way of doing this
    return;
  }
  // console.log(pokemonForms);
}
