import { iPokemon } from '../../../types';

export default function ModalHidden({
  selectedPokemonInfo,
}: {
  selectedPokemonInfo: iPokemon;
}) {
  return selectedPokemonInfo.hiddenAbility ? (
    <p className="text-xl pb-4 text-center">
      Hidden Ability:{' '}
      <span className="underline">
        {' '}
        {selectedPokemonInfo.hiddenAbility.charAt(0).toLocaleUpperCase() +
          selectedPokemonInfo.hiddenAbility.replace(/-/g, ' ').slice(1)}
      </span>
    </p>
  ) : (
    <p className="text-xl pb-4 text-center underline">No Hidden Ability</p>
  );
}
