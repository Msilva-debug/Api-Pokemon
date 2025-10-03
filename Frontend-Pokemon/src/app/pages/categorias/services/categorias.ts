import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ICardCategoria,
  ICategorias,
  ResponseCategoriaById,
  ResponseCategorias,
} from '../interfaces/categorias';
import { concatMap, filter, from, map, Observable, tap, toArray } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private http = inject(HttpClient);
  private apiUrl = 'https://pokeapi.co/api/v2/type?offset=0&limit=100';
  private categorias = signal<ICategorias[]>([]);
  private categoriasInfo = signal<ICardCategoria[]>([]);
  public computedCategoriasInfo = computed(() => this.categoriasInfo());

  public getCategoriasList = () => {
    this.http
      .get<ResponseCategorias>(this.apiUrl)
      .pipe(
        map((response) => {
          return response.results;
        })
      )
      .subscribe((response) => {
        this.categorias.set(response);
        this.getPokemonsByCategoria();
      });
  };

  public getPokemonsByCategoria() {
    type diccionario = Record<string, object>;
    let pokemons: diccionario = {};

    from(this.categorias())
      .pipe(
        concatMap((categoria) =>
          this.getCategoriaUrl(categoria.url).pipe(
            filter((response) => {
              return (
                response.sprites?.['generation-viii']?.['sword-shield']
                  ?.name_icon !== null
              );
            }),
            map((response) => {
              return {
                pokemons: response.pokemon!.map((p: any) => p.pokemon),
                name: response.names?.find((r) => r.language.name === 'es'),
                image:
                  response.sprites?.['generation-viii']?.['sword-shield']
                    ?.name_icon,
              } as ICardCategoria;
            }),
            tap((response) => {
              pokemons[response.name!.name.toLocaleLowerCase()] =
                response.pokemons!;
            })
          )
        ),
        toArray()
      )
      .subscribe({
        next: (response) => {
          localStorage.setItem('pokemonsCategoria', JSON.stringify(pokemons));
          this.categoriasInfo.set(response);
        },
        error: (err) => console.error(err),
      });
  }

  public getCategoriaUrl(url: string): Observable<ResponseCategoriaById> {
    return this.http.get<ResponseCategoriaById>(url);
  }
}
