function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-zinc-800 hover:bg-zinc-700 transition w-2/4 tinyFont rounded-md grid grid-cols-1 grid-rows-6 justify-items-center p-5">
      <h2 className="text-4xl text-neutral-50 tinyFont self-center">{title}</h2>
      <p className="text-2xl text-neutral-50 tinyFont row-span-5 pt-5">
        {text}
      </p>
    </div>
  );
}

export default Card;
