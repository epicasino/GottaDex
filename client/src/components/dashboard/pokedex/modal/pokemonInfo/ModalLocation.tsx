import { iPokemonLocation } from '../../../types';

export default function ModalLocation({
  pokemonLocation,
}: {
  pokemonLocation: iPokemonLocation;
}) {
  return (
    <div>
      <h5 className="my-2 text-2xl text-center border-b-zinc-50 border-b-2 pb-5">
        Pokemon Locations
      </h5>
      {/* could be refactored as a ul element group */}
      <div className="flex flex-col items-center">
        {pokemonLocation.swordShield && <p>Pokemon Sword & Shield</p>}
        {pokemonLocation.swordShieldCrown && (
          <p>Pokemon Sword & Shield Crown Tundra</p>
        )}
        {pokemonLocation.swordShieldIsle && (
          <p>Pokemon Sword & Shield Isle of Armor</p>
        )}
        {pokemonLocation.diamondPearl && (
          <p>Pokemon Brilliant Diamond & Shining Pearl</p>
        )}
        {pokemonLocation.arceus && <p>Pokemon Legends: Arceus</p>}
        {pokemonLocation.scarletViolet && <p>Pokemon Scarlet & Violet</p>}
        {pokemonLocation.scarletVioletKita && (
          <p>Pokemon Scarlet & Violet Kitakami</p>
        )}
        {pokemonLocation.scarletVioletBlue && (
          <p>Pokemon Scarlet & Violet Blueberry Academy</p>
        )}
      </div>
    </div>
  );
}
