import { Pokemon } from "../../pokedex/interfaces/pokemon";

export interface ResponseCategorias {
  count: number;
  results: ICategorias[];
}

export interface ICategorias {
  name?: string;
  url?: string;
}

export interface ICardCategoria {
  id?: number;
  name?: Name;
  image?: string;
  pokemons: Pokemon[]
}
interface Name{
  name:string;
}
export interface ResponseCategoriaById {
  id?: number;
  names?: Generation[];
  pokemon?: Pokemon[];
  sprites?: Sprites;
}

export interface Generation {
  language: Generation;
  name: string;
  url: string;
}

export interface PokemonCategoria {
  pokemon: Generation;
  slot: number;
}

export interface Sprites {
  'generation-viii': GenerationViii;
}

export interface Colosseum {
  name_icon: string;
}

export interface GenerationViii {
  'sword-shield': Colosseum;
}
