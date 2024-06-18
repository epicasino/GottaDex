import { iPokemon } from '../../../types';

function PokemonModalHidden({
  selectedPokemonInfo,
}: {
  selectedPokemonInfo: iPokemon;
}) {
  return (
    <p className="text-xl pb-4 text-center">
      Hidden Ability:{' '}
      <span className="underline">
        {' '}
        {selectedPokemonInfo.hiddenAbility.charAt(0).toLocaleUpperCase() +
          selectedPokemonInfo.hiddenAbility.replace(/-/g, ' ').slice(1)}
      </span>
    </p>
  );
}

export default PokemonModalHidden;
