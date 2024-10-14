import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  return (
    <main className="flex justify-center items-center min-h-screen min-w-full">
      <Link
        className="flex flex-row items-center gap-2 animate-appear transition hover:scale-125"
        href={'/createAccount'}
      >
        <Image
          src={'/svg/pokeball.svg'}
          height={0}
          width={0}
          className="h-10 w-auto animate-spin-once"
          alt="Pokeball"
        />
        <h1 className="tinyFont">GottaDex</h1>
      </Link>
    </main>
  );
}
