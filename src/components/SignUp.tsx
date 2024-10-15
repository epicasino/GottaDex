'use client';

import { createUser } from '@/db/createUser';
import Image from 'next/image';
import { useState } from 'react';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  if (status) {
    setTimeout(() => {
      window.location.replace('/dashboard');
    }, 2000);
  }

  return (
    <form
      className={`flex flex-col p-5 tinyFont gap-4 text-center items-center animate-appear ${
        status && 'rounded-md shadow-glow shadow-green-600'
      }`}
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
          const createdUser = await createUser(username);
          if (createdUser) {
            setStatus(true);
            setLoading(false);
          }
        } catch (e) {
          console.error(e);
          setLoading(false);
        }
      }}
    >
      <label className="text-4xl">
        {status ? `Hello ${username}!` : `What's Your Name?`}
      </label>
      <input
        type="text"
        name="username"
        placeholder="Username"
        className="px-2 text-black text-4xl rounded-md text-center"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-zinc-800 w-[10vw] transition hover:bg-zinc-800/50 rounded-md py-1"
      >
        Submit
      </button>
      {loading && (
        <Image
          src={'/svg/pokeball.svg'}
          height={0}
          width={0}
          className="h-5 w-auto animate-spin"
          alt="Pokeball"
        />
      )}
    </form>
  );
}
