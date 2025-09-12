import { Routes } from '@angular/router';
import { CategoriasGuard } from './guards/categorias.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/categorias/categorias').then((c) => c.Categorias),
  },
  {
    path: ':path',
    loadComponent: () =>
      import('../pokedex/pages/pokedex/pokedex').then((c) => c.Pokedex),
    canActivate: [CategoriasGuard]
  },
];

