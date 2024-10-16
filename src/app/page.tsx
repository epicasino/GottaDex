'use client';

import LoadingLogo from '@/components/LoadingLogo';
// import prisma from '../../prisma/db';
import { findUser } from '@/db/actions/userActions/findUser';

export default function Home() {
  setTimeout(async () => {
    const user = await findUser();
    return user !== null
      ? window.location.replace('/dashboard')
      : window.location.replace('/createAccount');
  }, 5000);
  return (
    <main className="flex justify-center items-center min-h-screen min-w-full">
      <LoadingLogo />
    </main>
  );
}
