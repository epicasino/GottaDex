import { iPokemon } from '../../../types';

export default function ModalSprites({
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
            <img src={selectedPokemonInfo.shinySprite} />
            <figcaption>Male Shiny</figcaption>
          </figure>
          <figure className="flex flex-col items-center">
            <img src={selectedPokemonInfo.femaleSprite} />
            <figcaption>Female</figcaption>
          </figure>
          <figure className="flex flex-col items-center">
            <img src={selectedPokemonInfo.femaleShinySprite} />
            <figcaption>Male Shiny</figcaption>
          </figure>
        </>
      ) : (
        <>
          <figure className="flex flex-col items-center">
            <img src={selectedPokemonInfo.sprite} />
            <figcaption>Normal</figcaption>
          </figure>
          <figure className="flex flex-col items-center">
            <img src={selectedPokemonInfo.shinySprite} />
            <figcaption>Shiny</figcaption>
          </figure>
        </>
      )}
    </div>
  );
}
