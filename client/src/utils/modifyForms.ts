import { iPokemonForms } from '../components/dashboard/types';

export function modifyForms(pokemonForms: iPokemonForms[]) {
  if (
    pokemonForms.some((form) => {
      return form.hiddenAbility === null ? true : false;
    })
  ) {
    const modifiedForms: iPokemonForms[] = pokemonForms.map((form) => {
      return {
        formName: form.formName,
        sprite: form.sprite,
        shinySprite: form.shinySprite,
        shinyCaught: form.shinyCaught,
        caught: form.caught,
        perfectIV: form.perfectIV,
      };
    });
    return modifiedForms;
  } else {
    return pokemonForms;
  }
}
