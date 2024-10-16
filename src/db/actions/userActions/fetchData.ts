'use server';
import prisma from '@/../prisma/db';

export const fetchUserData = async () => {
  const userData = await prisma.user.findFirst({
    include: {
      pokedex: {
        include: {
          forms: true,
        },
      },
    },
  });
  return userData;
};

export const fetchPokedexData = async () => {
  const pokedexData = await prisma.pokemon.findMany({
    include: {
      forms: true,
      evSpread: true,
      pokemonLocation: true,
    },
  });
  return pokedexData;
};
