export interface ResponsePokemon {
  count: number;
  next: string;
  previous: null;
  results: Pokemon[];
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonCard {
  name?: string;
  image?: string;
  color?: string;
}
export interface ResponsePokemonById {
  id: number;
  name: string;
  sprites: Sprites;
  species: Species;
}

export interface Sprites {
  back_default: string;
  back_female: null;
  back_shiny: string;
  back_shiny_female: null;
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
}

export interface Species {
  name: '';
  url: '';
}

export interface ResponsePokemonSpecies {
  color: Color;
}

export interface Color {
  name: string;
  url: string;
}
