import { iPokemonForm } from '@/types/types';
import Image from 'next/image';

export default function ModalForms({
  pokemonForms,
}: {
  pokemonForms: Array<iPokemonForm>;
}) {
  // console.log(pokemonForms);
  return (
    <div>
      <h5 className="my-2 text-2xl text-center border-b-zinc-50 border-b-2 pb-5">
        Forms
      </h5>
      <div className="gap-5 justify-items-center flex flex-row flex-wrap overflow-y-auto h-[35vh] justify-center">
        {pokemonForms.map((pokemonForm) => (
          <PokemonForm pokemonForm={pokemonForm} key={pokemonForm.formName} />
        ))}
      </div>
    </div>
  );
}

function PokemonForm({ pokemonForm }: { pokemonForm: iPokemonForm }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row justify-center items-center">
        <Image
          src={pokemonForm.sprite}
          alt=""
          width={0}
          height={0}
          className="w-24 h-auto"
          unoptimized
        />
        <Image
          src={pokemonForm!.shinySprite!}
          alt=""
          width={0}
          height={0}
          className="w-24 h-auto"
          unoptimized
        />
      </div>
      <p>{pokemonForm.formName}</p>
      <label>
        Caught?
        <input
          type="checkbox"
          name={`${pokemonForm.id}-caught`}
          defaultChecked={pokemonForm!.caught!}
        />
      </label>
      <label>
        Perfect IV?
        <input
          type="checkbox"
          name={`${pokemonForm.id}-perfectiv`}
          checked={pokemonForm.perfectIV}
        />
      </label>
      {pokemonForm.hiddenAbility && (
        <>
          <p>Hidden Ability: {pokemonForm.hiddenAbility}</p>
          <label>
            Caught w/ Hidden Ability?
            <input
              type="checkbox"
              name={`${pokemonForm.id}-hiddenabilitycaught`}
              checked={pokemonForm!.hiddenAbilityCaught!}
            />
          </label>
        </>
      )}
      {pokemonForm.shinySprite !== null && (
        <label>
          Shiny Caught?
          <input
            type="checkbox"
            name={`${pokemonForm.id}-shinycaught`}
            checked={pokemonForm!.shinyCaught!}
          />
        </label>
      )}
    </div>
  );
}
