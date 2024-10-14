import { createAccount } from '@/db/accountActions';

export default async function page() {
  return (
    <main className="flex justify-center items-center min-h-screen min-w-full">
      <form
        className="flex flex-col p-5 tinyFont gap-4 text-center items-center"
        action={createUser}
      >
        <label className="text-4xl">What&apos;s Your Name?</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="px-2 text-black text-4xl rounded-md"
        />
        <button
          type="submit"
          className="bg-zinc-800 w-[10vw] transition hover:bg-zinc-800/50 rounded-md py-1"
        >
          Submit
        </button>
      </form>
    </main>
  );
}

async function createUser(formData: FormData) {
  'use server';
  const username = formData.get('username') as string;
  if (username && username !== null) {
    const createdAccount = await createAccount(username);
    console.log(createdAccount);
  }
}
