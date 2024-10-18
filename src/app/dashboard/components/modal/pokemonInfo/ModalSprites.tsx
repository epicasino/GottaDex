import Image from 'next/image';
import { iPokemon } from '@/types/types';

export default function ModalSprites({ pokemon }: { pokemon: iPokemon }) {
  return (
    <div className="flex flex-row justify-center pb-5">
      {pokemon.genderDifference ? (
        <>
          <figure className="flex flex-col items-center">
            <Image
              src={pokemon.sprite}
              height={0}
              width={0}
              className="w-60 h-auto"
              alt={``}
              unoptimized
            />
            <figcaption>Male</figcaption>
          </figure>
          <figure className="flex flex-col items-center">
            <Image
              src={pokemon.shinySprite || ''}
              height={0}
              width={0}
              className="w-60 h-auto"
              alt={``}
              unoptimized
            />
            <figcaption>Male Shiny</figcaption>
          </figure>
          <figure className="flex flex-col items-center">
            <Image
              src={pokemon.femaleSprite || ''}
              height={0}
              width={0}
              className="w-60 h-auto"
              alt={``}
              unoptimized
            />
            <figcaption>Female</figcaption>
          </figure>
          <figure className="flex flex-col items-center">
            <Image
              src={pokemon.femaleShinySprite || ''}
              height={0}
              width={0}
              className="w-60 h-auto"
              alt={``}
              unoptimized
            />
            <figcaption>Female Shiny</figcaption>
          </figure>
        </>
      ) : (
        <>
          <figure className="flex flex-col items-center">
            <Image
              src={pokemon.sprite}
              height={0}
              width={0}
              className="w-60 h-auto"
              alt={``}
              unoptimized
            />
            <figcaption>Normal</figcaption>
          </figure>
          <figure className="flex flex-col items-center">
            <Image
              src={pokemon.shinySprite || ''}
              height={0}
              width={0}
              className="w-60 h-auto"
              alt={``}
              unoptimized
            />
            <figcaption>Shiny</figcaption>
          </figure>
        </>
      )}
    </div>
  );
}
