import { iPokemon } from '../../../types';
export function PokedexModalSprites({
  selectedPokemonInfo,
}: {
  selectedPokemonInfo: iPokemon;
}) {
  return (
    <div className="flex flex-row justify-center pb-5">
      {selectedPokemonInfo.genderDifference ? (
        <>
          <figure className="flex flex-col items-center">
            <img src={selectedPokemonInfo.sprite} />
            <figcaption>Male</figcaption>
          </figure>
          <figure className="flex flex-col items-center">
            <img src={selectedPokemonInfo.femaleSprite} />
            <figcaption>Female</figcaption>
          </figure>
        </>
      ) : (
        <figure className="flex flex-col items-center">
          <img src={selectedPokemonInfo.sprite} />
          <figcaption>No Gender Differences</figcaption>
        </figure>
      )}
    </div>
  );
}
