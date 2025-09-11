import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ICardCategoria,
  ICategorias,
  ResponseCategoriaById,
  ResponseCategorias,
} from '../interfaces/categorias';
import { filter, map, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private http = inject(HttpClient);
  private apiUrl = 'https://pokeapi.co/api/v2/type?offset=0&limit=100';
  private categorias = signal<ICategorias[]>([]);
  private categoriasInfo = signal<ICardCategoria[]>([]);
  public computedCategoriasInfo = computed(() => this.categoriasInfo());
  public computedCategorias = computed(() => this.categorias());
  private effectPokemonsByCategoria = effect(() => {
    if (this.computedCategorias()) this.getPokemonsByCategoria();
  });

  public getCategoriasList = () => {
    this.http
      .get<ResponseCategorias>(this.apiUrl)
      .pipe(
        map((response) => {
          return response.results;
        })
      )
      .subscribe((response) => this.categorias.set(response));
  };

  public getPokemonsByCategoria() {
    this.categorias()
      .filter((categoria) => !!categoria)
      .forEach((categoria) => {
        this.getCategoriaUrl(categoria.url)
          .pipe(
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
            })
          )
          .subscribe((response) => {
            if (!response) return;
            if (
              localStorage.getItem(
                JSON.stringify(response.name?.name.toLocaleLowerCase())
              )
            )
              return;
            localStorage.setItem(
              response.name!.name.toLocaleLowerCase().trim(),
              JSON.stringify(response.pokemons)
            );
            this.categoriasInfo.update((categoria) => {
              if (!this.categoriasInfo()) return [response];

              return [...categoria, response];
            });
          });
      });
  }

  public getCategoriaUrl(url: string): Observable<ResponseCategoriaById> {
    return this.http.get<ResponseCategoriaById>(url);
  }
}
