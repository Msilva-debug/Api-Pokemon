import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  Name,
  Pokemon,
  ResponsePokemon,
  ResponsePokemonById,
  ResponsePokemonSpecies,
  ResponseTypes,
  Types,
} from '../interfaces/pokemon';
import { forkJoin, map, Observable, of } from 'rxjs';
import { InformacionPaginador } from '../../../shared/components/interfaces/Paginador';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);

  public informacionPaginador = signal<InformacionPaginador>({
    inicio: 1,
    final: 21,
    total: 0,
    offset: 0,
    limit: 21,
    anteriorUrl: '',
    siguienteUrl: '',
    actualUrl: 'https://pokeapi.co/api/v2/pokemon/?limit=21&offset=0',
  });

  public pokemons = signal<Pokemon[]>([]);
  public isCategoria = signal(false);

  constructor() {}

  private chunkArray<T>(arr: T[], size: number): T[][] {
    const res: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      res.push(arr.slice(i, i + size));
    }
    return res;
  }


  public setPokemonsCategoria(pokemons: Pokemon[]) {
    localStorage.setItem('pokemons', JSON.stringify(pokemons));

    this.isCategoria.set(true);
    this.informacionPaginador.set({
      inicio: 0,
      final: 0,
      total: pokemons.length,
      offset: 0,
      limit: 21,
      anteriorUrl: '',
      siguienteUrl: '',
      actualUrl: 'categoria:0',
    });

    this.getPokemonListCategoria();
  }

  public getPokemonList() {
    this.isCategoria.set(false);
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

  public getPokemonListCategoria() {
    const data = localStorage.getItem('pokemons');
    if (!data) {
      this.pokemons.set([]);
      return;
    }

    const allPokemons: Pokemon[] = JSON.parse(data);

    const info = this.informacionPaginador();
    const offset = info.offset;
    const limit = info.limit;
    const total = allPokemons.length;

    const anteriorOffset = Math.max(offset - limit, 0);
    const siguienteOffset = Math.min(offset + limit, total);

    this.informacionPaginador.update((prev) => ({
      ...prev,
      total,
      inicio: offset + 1,
      final: Math.min(offset + limit, total),
      anteriorUrl: anteriorOffset < offset ? `categoria:${anteriorOffset}` : '',
      siguienteUrl:
        siguienteOffset > offset ? `categoria:${siguienteOffset}` : '',
      actualUrl: `categoria:${offset}`,
    }));

    const pagina = allPokemons.slice(offset, offset + limit);
    this.pokemons.set(pagina);
  }
  public cambiarPagina(accion: string) {
    if (this.isCategoria()) {
      this.informacionPaginador.update((info) => {
        let nuevoOffset = info.offset;

        if (accion === 'anterior') {
          nuevoOffset = Math.max(info.offset - info.limit, 0);
        }

        if (accion === 'siguiente') {
          nuevoOffset = info.offset + info.limit;
        }

        return {
          ...info,
          offset: nuevoOffset,
        };
      });
      this.pokemons.set([]);
      setTimeout(() => {
        this.getPokemonListCategoria();
      }, 0);
    } else {
      this.informacionPaginador.update((info) => ({
        ...info,
        actualUrl:
          accion === 'anterior'
            ? info.anteriorUrl
            : accion === 'siguiente'
            ? info.siguienteUrl
            : info.actualUrl,
      }));

      this.pokemons.set([]);

      setTimeout(() => {
        this.getPokemonList();
      }, 0);
    }
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
