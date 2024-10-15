'use client';
import Image from 'next/image';

export default function LoadingLogo() {
  return (
    <header className="flex flex-row items-center gap-2 animate-single-pulse transition hover:scale-125 opacity-0">
      <Image
        src={'/svg/pokeball.svg'}
        height={0}
        width={0}
        className="h-10 w-auto animate-spin-once"
        alt="Pokeball"
      />
      <h1 className="tinyFont">GottaDex</h1>
    </header>
  );
}
