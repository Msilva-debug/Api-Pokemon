import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, Type } from '@angular/core';
import {
  Name,
  Pokemon,
  ResponsePokemon,
  ResponsePokemonById,
  ResponsePokemonSpecies,
  ResponseTypes,
  Types,
} from '../interfaces/response-pokemon';
import { filter, forkJoin, map, Observable, of, switchMap } from 'rxjs';

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
  public getPokemonTypes(types: Types[]): Observable<string[]> {
    if (types.length === 0) return of([]);

    const requests = types.map((type) =>
      this.http.get<ResponseTypes>(type.type.url).pipe(
        map((response: ResponseTypes) => {
          const nameEs = response.names.find(
            (n: Name) => n.language.name === 'es'
          );
          return nameEs ? nameEs.name : '';
        })
      )
    );

    return forkJoin(requests).pipe(
      map((names: string[]) => names.filter((name) => !!name))
    );
  }

  public getForkJoinCard(informacion: ResponsePokemonById) {
    return forkJoin({
      types: this.getPokemonTypes(informacion.types),
      color: this.getPokemonColor(informacion.species.url),
    });
  }
}
