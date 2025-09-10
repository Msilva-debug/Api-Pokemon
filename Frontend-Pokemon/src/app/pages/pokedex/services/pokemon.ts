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
} from '../interfaces/pokemon';
import { filter, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { InformacionPaginador } from '../../../shared/components/interfaces/Paginador';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);

  public informacionPaginador = signal<InformacionPaginador>({
    inicio: 10,
    final: 10,
    total: 10,
    offset: 0,
    limit: 21,
    anteriorUrl: '',
    siguienteUrl: '',
    actualUrl: 'https://pokeapi.co/api/v2/pokemon/?limit=21&offset=0',
  });
  public pokemons = signal<Pokemon[]>([]);

  constructor() {}

  public getPokemonList() {
    this.http
      .get<ResponsePokemon>(this.informacionPaginador().actualUrl!)
      .subscribe((response) => {
        this.informacionPaginador.update((info) => ({
          ...info,
          siguienteUrl: response.next,
          anteriorUrl: response.previous,
          total: response.count,
        }));
        this.pokemons.set([...response.results]);
      });
  }

  public cambiarPagina(accion: string) {
    if (accion === 'anterior')
      this.informacionPaginador.update((info) => ({
        ...info,
        actualUrl: info.anteriorUrl,
      }));

    if (accion === 'siguiente')
      this.informacionPaginador.update((info) => ({
        ...info,
        actualUrl: info.siguienteUrl,
      }));
    this.pokemons.set([]);
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
