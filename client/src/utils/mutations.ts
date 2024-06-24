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
  mutation UpdatePokedex($pokedex: PokemonInput) {
    updatePokedex(pokedex: $pokedex) {
      caught
      evSpread {
        hp
        attack
        defense
        spAtk
        spDef
        speed
      }
      femaleCaught
      femaleHiddenAbilityCaught
      femalePerfectIV
      femaleShinyCaught
      femaleShinySprite
      femaleSprite
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
      hiddenAbilityCaught
      nature
      perfectIV
      shinyCaught
    }
  }
`;
