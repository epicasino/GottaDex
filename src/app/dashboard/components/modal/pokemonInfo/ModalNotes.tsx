export default function ModalNotes({ pokemonNotes }: { pokemonNotes: string }) {
  return (
    <div className="flex justify-center items-center flex-col mt-2 gap-2">
      <label htmlFor="notes" className="text-xl mr-2 underline">
        Notes
      </label>
      <textarea
        defaultValue={pokemonNotes}
        name="notes"
        cols={45}
        rows={3}
        className="tinyFont text-zinc-950 caret-zinc-950 p-2 whitespace-pre-line"
      />
    </div>
  );
}
