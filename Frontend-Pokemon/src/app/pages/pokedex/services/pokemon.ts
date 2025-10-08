import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import {
  Name,
  Pokemon,
  PokemonCard,
  ResponsePokemon,
  ResponsePokemonById,
  ResponsePokemonSpecies,
  ResponseTypes,
  Types,
} from '../interfaces/pokemon';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { InformacionPaginador } from '../../../shared/components/interfaces/Paginador';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);
  private environment = environment;
  public informacionPaginador = signal<InformacionPaginador>(
    {} as InformacionPaginador
  );
  public pokemonClick = signal<PokemonCard | null>(null);
  public pokemons = signal<Pokemon[]>([]);
  public isCategoria = signal(false);
  public cantidadPokemons = computed(() => this.pokemons().length);
  public nombreCategoria = signal<string | null>('');
  public limit = signal(24);

  constructor() {}
  public informacionPaginadorInicial = (info: InformacionPaginador) => {
    this.informacionPaginador.set(info);
    this.informacionPaginador.update((info) => ({
      ...info,
      actualUrl: `${this.environment.apiUrlPokemon}${this.environment.infoPokemons}?limit=${info.limit}?&offset=${info.offset}`,
    }));
  };

  public getPokemonList() {
    this.isCategoria.set(false);

    this.http
      .get<ResponsePokemon>(this.informacionPaginador().actualUrl!)
      .subscribe((response) => {
        this.pokemons.set([...response.results]);

        this.informacionPaginador.update((info) => ({
          ...info,
          siguienteUrl: response.next,
          anteriorUrl: response.previous,
          total: response.count,
          cantidadRegistros: this.cantidadPokemons(),
        }));
      });
  }

  public getInfoPokemonPorNombre(nombrePokemon: string) {
    return forkJoin({
      evolutions: this.getEvolutions(nombrePokemon),
      info: this.getInfoPokemon(nombrePokemon),
    });
  }

  public getEvolutions(nombrePokemon: string): Observable<any> {
    return this.http
      .get<any>(
        `${this.environment.apiUrlPokemon}${this.environment.evolutions}/${nombrePokemon}`
      )
      .pipe(
        switchMap((info) => {
          return this.evolutionChain(info['evolution_chain']['url']);
        })
      );
  }

  public evolutionChain(url: string): Observable<any> {
    return this.http.get<any>(`${url}`);
  }
  public getInfoPokemon(nombrePokemon: string): Observable<any> {
    return this.http.get<ResponsePokemon>(
      `${this.environment.apiUrlPokemon}${this.environment.infoPokemons}/${nombrePokemon}`
    );
  }

  public getPokemonListCategoria() {
    const nombreCategoria = this.nombreCategoria();
    const data = localStorage.getItem('pokemonsCategoria');

    if (!data) {
      this.pokemons.set([]);
      return;
    }
    const pokemons = JSON.parse(data)[nombreCategoria!];
    if (!pokemons) {
      this.pokemons.set([]);
      return;
    }
    this.informacionPaginador.update((info) => ({
      ...info,
      limit: this.limit(),
    }));
    this.setPokemons(pokemons);
  }

  public setPokemons(data: any) {
    const allPokemons: Pokemon[] = data;

    const info = this.informacionPaginador();
    const offset = info.offset;
    const limit = info.limit;
    const total = allPokemons.length;

    const anteriorOffset = Math.max(offset - limit, 0);
    const siguienteOffset = Math.min(offset + limit, total);

    const pagina = allPokemons.slice(offset, offset + limit);
    this.pokemons.set(pagina);

    this.informacionPaginador.update((prev) => ({
      ...prev,
      total,
      inicio: offset + 1,
      final: Math.min(offset + limit, total),
      anteriorUrl: anteriorOffset < offset ? `categoria:${anteriorOffset}` : '',
      siguienteUrl:
        siguienteOffset > offset ? `categoria:${siguienteOffset}` : '',
      actualUrl: `categoria:${offset}`,
      cantidadRegistros: this.cantidadPokemons(),
    }));
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
