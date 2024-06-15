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
      pokemonName
      pokedexNum
      perfectIV
      nature
      evSpread {
        hp
        attack
        defense
        spAtk
        spDef
        speed
      }
    }
  }
`;

export const UPDATE_POKEMON_FORM = gql`
  mutation UpdatePokedexForm($pokedex: PokemonInput) {
    updatePokemonForm(pokedex: $pokedex) {
      pokemonName
      pokedexNum
      forms {
        formName
        sprite
        perfectIV
        hiddenAbility
      }
    }
  }
`;
