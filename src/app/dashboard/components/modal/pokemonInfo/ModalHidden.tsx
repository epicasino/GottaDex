import { iPokemon } from '@/types/types';

export default function ModalHidden({ pokemon }: { pokemon: iPokemon }) {
  return pokemon.hiddenAbility ? (
    <p className="text-xl pb-4 text-center">
      Hidden Ability:{' '}
      <span className="underline">
        {' '}
        {pokemon.hiddenAbility.charAt(0).toLocaleUpperCase() +
          pokemon.hiddenAbility.replace(/-/g, ' ').slice(1)}
      </span>
    </p>
  ) : (
    <p className="text-xl pb-4 text-center underline">No Hidden Ability</p>
  );
}
