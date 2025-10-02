export interface ResponsePokemon {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
}

export interface Pokemon {
  name: string;
  url: string;
}
export interface Types {
  type: Type;
}

export interface Type {
  url: string;
}

export interface ResponseTypes {
  names: Name[];
}

export interface Name {
  name: string;
  language: Language;
}

export interface Language {
  name: string;
  url: string;
}

export interface PokemonCard {
  name?: string;
  image?: string;
  color?: string;
  types?: string[];
  id?: number;
}
export interface ResponsePokemonById {
  id: number;
  name: string;
  sprites: Sprites;
  species: Species;
  types: Types[];
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
