import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const CategoriasGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const isValid = categorias.validateLocalStorage(route.params['path']);

  return isValid ? true : router.createUrlTree(['notFound']);
};

class categorias {
  public static validateLocalStorage(path: string): boolean {
    const categorias = localStorage.getItem('pokemonsCategoria');
    if (!categorias) return !!categorias;
    return JSON.parse(categorias)[path.toLocaleLowerCase()] !== null;
  }
}
