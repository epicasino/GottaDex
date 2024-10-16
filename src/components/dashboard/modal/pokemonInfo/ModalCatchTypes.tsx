import { iPokemon } from '@/types/types';

// THIS IS DIV SOUP.

export default function ModalCatchTypes({ pokemon }: { pokemon: iPokemon }) {
  return (
    <div className="flex flex-col py-5 px-2">
      <h5 className="text-2xl border-b-zinc-50 border-b-2 pb-2 mb-2 text-center">
        Did You Catch...
      </h5>
      {pokemon.genderDifference ? (
        <div className="grid md:grid-cols-2 justify-items-center py-4">
          <div className="flex flex-col">
            <h6 className="text-xl underline">Male</h6>
            <label>
              Caught Male?
              <input
                type="checkbox"
                defaultChecked={pokemon.caught}
                name="caught"
              />
            </label>
            {pokemon.hiddenAbility && (
              <label>
                w/ Hidden Ability?
                <input
                  type="checkbox"
                  defaultChecked={pokemon.hiddenAbilityCaught ?? undefined}
                  name="caught-w-hidden-ability"
                />
              </label>
            )}
            <label>
              Perfect IV {pokemon.hiddenAbility && 'w/ Hidden Ability?'}
              <input
                type="checkbox"
                defaultChecked={pokemon.perfectIV}
                name="perfect-iv-w-hidden-ability"
              />
            </label>
            {pokemon.shinySprite !== null && (
              <label>
                Caught Shiny?
                <input
                  type="checkbox"
                  defaultChecked={pokemon.shinyCaught ?? undefined}
                  name="caught-shiny"
                />
              </label>
            )}
          </div>
          <div className="flex flex-col">
            <h6 className="text-xl underline">Female</h6>
            <label>
              Caught Female?
              <input
                type="checkbox"
                defaultChecked={pokemon.femaleCaught ?? undefined}
                name="caught-female"
              />
            </label>
            {pokemon.hiddenAbility && (
              <label>
                w/ Hidden Ability?
                <input
                  type="checkbox"
                  defaultChecked={
                    pokemon.femaleHiddenAbilityCaught ?? undefined
                  }
                  name="caught-female-w-hidden-ability"
                />
              </label>
            )}
            <label>
              Perfect IV {pokemon.hiddenAbility && 'w/ Hidden Ability?'}
              <input
                type="checkbox"
                defaultChecked={pokemon.femalePerfectIV ?? undefined}
                name="perfect-iv-female-w-hidden-ability"
              />
            </label>
            {pokemon.femaleShinySprite !== null && (
              <label>
                Caught Shiny?
                <input
                  type="checkbox"
                  defaultChecked={pokemon.femaleShinyCaught ?? undefined}
                  name="caught-female-shiny"
                />
              </label>
            )}
          </div>
        </div>
      ) : (
        // when there isn't a gender difference
        <div className="flex flex-col items-center">
          <label>
            Caught?
            <input
              type="checkbox"
              defaultChecked={pokemon.caught}
              name="caught"
            />
          </label>
          {pokemon.hiddenAbility && (
            <label>
              w/ Hidden Ability?
              <input
                type="checkbox"
                defaultChecked={pokemon.hiddenAbilityCaught ?? undefined}
                name="caught-w-hidden-ability"
              />
            </label>
          )}
          <label>
            Perfect IV {pokemon.hiddenAbility && 'w/ Hidden Ability?'}
            <input
              type="checkbox"
              defaultChecked={pokemon.perfectIV}
              name="perfect-iv-w-hidden-ability"
            />
          </label>
          {pokemon.shinySprite !== null && (
            <label>
              Caught Shiny?
              <input
                type="checkbox"
                defaultChecked={pokemon.shinyCaught ?? undefined}
                name="caught-shiny"
              />
            </label>
          )}
        </div>
      )}
    </div>
  );
}
