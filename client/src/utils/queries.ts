import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      username
      progress
      pokemon {
        pokemonName
        pokedexNum
        sprite
        female
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
        female
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
      female
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
