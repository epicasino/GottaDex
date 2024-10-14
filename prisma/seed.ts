import { PrismaClient } from '@prisma/client';
import pokedex from './json/pokedex.json';

const prisma = new PrismaClient();

async function seedData() {
  console.log('Seeding...');

  const userCreated = await prisma.user.create({
    data: {
      username: 'Bob1',
    },
  });

  // console.log(userCreated);
  if (userCreated) {
    try {
      for (let i = 0; i < pokedex.length; i++) {
        const {
          pokemonName,
          pokedexNum,
          sprite,
          femaleSprite,
          shinySprite,
          femaleShinySprite,
          caught,
          femaleCaught,
          shinyCaught,
          femaleShinyCaught,
          perfectIV,
          femalePerfectIV,
          hiddenAbility,
          hiddenAbilityCaught,
          femaleHiddenAbilityCaught,
          nature,
          genderDifference,
          notes,
          pokemonLocation,
          forms,
          evSpread,
        } = pokedex[i];

        const pokemonCreated = await prisma.pokemon.create({
          data: {
            id: pokedexNum,
            pokemonName,
            sprite,
            femaleSprite,
            shinySprite,
            femaleShinySprite,
            caught,
            femaleCaught,
            shinyCaught,
            femaleShinyCaught,
            perfectIV,
            femalePerfectIV,
            hiddenAbility,
            hiddenAbilityCaught,
            femaleHiddenAbilityCaught,
            nature,
            genderDifference,
            notes,
            userId: userCreated.id,
          },
        });

        await prisma.evSpread.create({
          data: {
            ...evSpread,
            pokemonId: pokemonCreated.id,
          },
        });

        await prisma.pokemonLocation.create({
          data: {
            ...pokemonLocation,
            pokemonId: pokemonCreated.id,
          },
        });

        // let pokemonFormsArr = [];
        for (let int = 0; int < forms.length; int++) {
          const form = forms[int];
          await prisma.pokemonForm.create({
            data: {
              ...form,
              pokemonId: pokemonCreated.id,
            },
          });
        }
      }
      console.log('Finished Seeding.');
    } catch (error) {
      return console.error(error);
    }
  }
}

seedData().then(async () => {
  await prisma.$disconnect();
});
