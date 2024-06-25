import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation Register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      token
      user {
        _id
        username
        progress
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        progress
      }
    }
  }
`;

export const UPDATE_POKEDEX = gql`
  mutation Mutation($pokedex: PokemonInput) {
    updatePokedex(pokedex: $pokedex) {
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
`;
