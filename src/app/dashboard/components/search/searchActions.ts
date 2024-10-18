'use server';

import { redirect } from 'next/navigation';

export async function emptySearch() {
  redirect(`/dashboard`);
}

export async function querySearch(formData: FormData) {
  const query = formData.get('query') as string | number;
  redirect(`/dashboard?query=${query}`);
}
