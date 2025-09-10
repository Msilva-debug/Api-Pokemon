import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ICategorias,
  ResponseCategoriaById,
  ResponseCategorias,
} from '../interfaces/categorias';
import { map, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private http = inject(HttpClient);
  private apiUrl = 'https://pokeapi.co/api/v2/type?offset=0&limit=100';

  public getCategoriasList = (): Observable<ICategorias[]> => {
    return this.http.get<ResponseCategorias>(this.apiUrl).pipe(
      map((response) => {
        return response.results;
      })
    );
  };

  public getCategoriaUrl(url: string): Observable<ResponseCategoriaById> {
    return this.http.get<ResponseCategoriaById>(url);
  }
  
}
