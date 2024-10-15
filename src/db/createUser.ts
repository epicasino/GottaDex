'use server';
import { createAccount } from './createAccount';

export async function createUser(username: string) {
  if (username && username !== null) {
    const createdAccount = await createAccount(username);

    if (createdAccount) {
      return createdAccount;
    }
  }
}
