function Card({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex flex-col items-center bg-zinc-800 hover:bg-zinc-700 transition w-10/12 md:w-2/4 tinyFont rounded-md justify-items-center p-5">
      <h2 className="text-2xl md:text-4xl text-neutral-50 tinyFont self-center">
        {title}
      </h2>
      <p className="md:text-2xl text-neutral-50 tinyFont row-span-5 pt-5">
        {text}
      </p>
    </div>
  );
}

export default Card;
