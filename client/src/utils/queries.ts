import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query Query {
    me {
      _id
      username
      password
      progress
      pokemon {
        pokemonName
        pokedexNum
        sprite
        shinySprite
        shinyCaught
        femaleSprite
        femaleCaught
        femaleHiddenAbilityCaught
        femalePerfectIV
        femaleShinySprite
        femaleShinyCaught
        genderDifference
        caught
        perfectIV
        hiddenAbility
        hiddenAbilityCaught
        nature
        pokemonLocation {
          swordShield
          swordShieldIsle
          swordShieldCrown
          diamondPearl
          arceus
          scarletViolet
          scarletVioletKita
          scarletVioletBlue
        }
        evSpread {
          hp
          attack
          defense
          spAtk
          spDef
          speed
        }
        forms {
          formName
          sprite
          shinySprite
          caught
          hiddenAbilityCaught
          shinyCaught
          perfectIV
          hiddenAbility
        }
      }
    }
  }
`;

export const QUERY_USER = gql`
  query QueryUser($username: String, $userId: String) {
    user(username: $username, userId: $userId) {
      _id
      username
      password
      progress
      pokemon {
        pokemonName
        pokedexNum
        sprite
        shinySprite
        femaleSprite
        genderDifference
        perfectIV
        hiddenAbility
        nature
        pokemonLocation {
          swordShield
          swordShieldIsle
          swordShieldCrown
          diamondPearl
          arceus
          scarletViolet
          scarletVioletKita
          scarletVioletBlue
        }
        evSpread {
          hp
          attack
          defense
          spAtk
          spDef
          speed
        }
        forms {
          formName
          sprite
          perfectIV
          hiddenAbility
        }
      }
    }
  }
`;

export const QUERY_POKEMON = gql`
  query QueryPokemon($userId: String, $pokedexNum: Int) {
    pokemon(userId: $userId, pokedexNum: $pokedexNum) {
      pokemonName
      pokedexNum
      sprite
      shinySprite
      femaleSprite
      genderDifference
      perfectIV
      hiddenAbility
      nature
      pokemonLocation {
        swordShield
        swordShieldIsle
        swordShieldCrown
        diamondPearl
        arceus
        scarletViolet
        scarletVioletKita
        scarletVioletBlue
      }
      evSpread {
        hp
        attack
        defense
        spAtk
        spDef
        speed
      }
      forms {
        formName
        sprite
        perfectIV
        hiddenAbility
      }
    }
  }
`;
