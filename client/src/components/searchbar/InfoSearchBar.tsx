import { useState } from 'react';
import pokemonJSON from '../../../../server/utils/json/pokedex.json';
import { iMatchedItem } from './types';

export default function InfoSearchBar() {
  const [searchItem, setSearchItem] = useState('');

  const [matchedItem, setMatchedItem] = useState<iMatchedItem>(pokemonJSON[24]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = pokemonJSON.find((pokemon) => {
      return pokemon.pokemonName ===
        searchItem.split(' ').join('-').toLowerCase()
        ? true
        : false;
    });

    if (result) {
      setMatchedItem(result);
    }
  };

  return (
    <section className="flex flex-col max-w-screen items-center justify-center justify-items-center py-5 bg-zinc-800/75 tinyFont gap-5">
      <h3 className="text-5xl text-zinc-50">Try It Out!</h3>
      <form onSubmit={handleSearchSubmit}>
        <input
          className="text-center tinyFont rounded-sm text-sm md:text-2xl h-10 md:h-auto px-4 w-[80vw] md:w-[40vw]"
          type="text"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder="Search for Pokemon Name or Pokedex #"
        />
      </form>
      <SearchBarResultCard matchedItem={matchedItem} />
    </section>
  );
}

function SearchBarResultCard({ matchedItem }: { matchedItem: iMatchedItem }) {
  return (
    <article className="flex flex-col items-center w-full gap-5 text-zinc-50">
      <h2 className="text-6xl border-b-zinc-50 border-b-4 md:w-4/12 text-center">
        {matchedItem.pokemonName.charAt(0).toLocaleUpperCase() +
          matchedItem.pokemonName.replace(/-/g, ' ').slice(1)}
      </h2>
      <div className="grid grid-cols-2 md:flex md:flex-row justify-center flex-wrap gap-2">
        <img src={matchedItem.sprite} className="md:h-32 w-auto" />
        {matchedItem.shinySprite && (
          <img src={matchedItem.shinySprite} className="md:h-32 w-auto" />
        )}
        {matchedItem.femaleSprite && matchedItem.femaleShinySprite && (
          <>
            <img src={matchedItem.femaleSprite} className="md:h-32 w-auto" />
            <img
              src={matchedItem.femaleShinySprite}
              className="md:h-32 w-auto"
            />
          </>
        )}
      </div>
      <section className="flex flex-col md:flex-row md:gap-12">
        <p className="text-lg text-center">{`Has ${
          matchedItem.genderDifference ? `a` : `No`
        } Gender Difference`}</p>
        {matchedItem.hiddenAbility ? (
          <p className="text-lg text-center">
            Hidden Ability: {matchedItem.hiddenAbility}
          </p>
        ) : (
          <p className="text-lg text-center">No Hidden Ability</p>
        )}
      </section>
      <div>
        <h5 className="my-2 text-2xl text-center border-b-zinc-50 border-b-2 pb-5">
          Pokemon Locations
        </h5>
        {/* could be refactored as a ul element group */}
        <div className="flex flex-col items-center">
          {matchedItem.pokemonLocation.swordShield && (
            <p>Pokemon Sword & Shield</p>
          )}
          {matchedItem.pokemonLocation.swordShieldCrown && (
            <p>Pokemon Sword & Shield Crown Tundra</p>
          )}
          {matchedItem.pokemonLocation.swordShieldIsle && (
            <p>Pokemon Sword & Shield Isle of Armor</p>
          )}
          {matchedItem.pokemonLocation.diamondPearl && (
            <p>Pokemon Brilliant Diamond & Shining Pearl</p>
          )}
          {matchedItem.pokemonLocation.arceus && <p>Pokemon Legends: Arceus</p>}
          {matchedItem.pokemonLocation.scarletViolet && (
            <p>Pokemon Scarlet & Violet</p>
          )}
          {matchedItem.pokemonLocation.scarletVioletKita && (
            <p>Pokemon Scarlet & Violet Kitakami</p>
          )}
          {matchedItem.pokemonLocation.scarletVioletBlue && (
            <p>Pokemon Scarlet & Violet Blueberry Academy</p>
          )}
        </div>
      </div>
      {matchedItem.forms.length !== 0 && (
        <div>
          <h5 className="my-2 text-2xl text-center border-b-zinc-50 border-b-2">
            Forms
          </h5>
          <div className="gap-5 justify-items-center flex flex-row flex-wrap overflow-y-auto justify-center">
            {matchedItem.forms.map((pokemonForm) => (
              <div className="flex flex-col items-center justify-center">
                <div className="flex flex-row justify-center items-center">
                  {pokemonForm.sprite && (
                    <img src={pokemonForm.sprite} className="md:w-32" />
                  )}
                  {pokemonForm.shinySprite && (
                    <img src={pokemonForm.shinySprite} className="md:w-32" />
                  )}
                </div>
                <p className="text-xl">{pokemonForm.formName}</p>
                {pokemonForm.hiddenAbility && (
                  <p className="text-xl">
                    Hidden Ability: {pokemonForm.hiddenAbility}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
