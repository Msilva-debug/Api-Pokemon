import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  Pokemon,
  ResponsePokemon,
  ResponsePokemonById,
  ResponsePokemonSpecies,
} from '../interfaces/response-pokemon';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  private http = inject(HttpClient);

  constructor() {}

  public getPokemonList(
    limit: number,
    offset: number
  ): Observable<ResponsePokemon> {
    return this.http.get<ResponsePokemon>(
      `${this.apiUrl}?limit=${limit}&offset=${offset}`
    );
  }

  public getPokemonUrl(url: string): Observable<ResponsePokemonById> {
    return this.http.get<ResponsePokemonById>(url);
  }

  public getPokemonColor(url: string): Observable<string | undefined> {
    return this.http.get<ResponsePokemonSpecies>(url).pipe(
      map((response) => {
        return response.color.name;
      })
    );
  }
}
