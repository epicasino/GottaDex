import natures from '../../json/natures.json';

export default function ModalNature({
  pokemonNature,
}: {
  pokemonNature: string | null;
}) {
  return (
    <div className="flex justify-center items-center">
      <label htmlFor="nature" className="text-lg mr-2">
        Nature:
      </label>
      <select
        name="nature"
        className="text-zinc-950"
        defaultValue={
          pokemonNature === null || pokemonNature === ''
            ? 'None'
            : pokemonNature
        }
      >
        <option value="None" disabled>
          Choose Desired Nature
        </option>
        {natures.map((nature) => (
          <option
            value={nature.natureName}
            key={nature.natureName}
            className="text-zinc-950"
          >
            {nature.natureName} ({nature.natureValue})
          </option>
        ))}
      </select>
    </div>
  );
}
