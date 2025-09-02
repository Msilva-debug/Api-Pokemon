import { Routes } from '@angular/router';
import { Main } from './layout/main/main';
import { Auth } from './layout/auth/auth';

export const routes: Routes = [
  {
    path: 'home',
    component: Main,
    children: [
      {
        path: 'pokedex',
        title: 'Pokedex',
        loadComponent: () =>
          import('./pages/pokedex/layout/pokedex').then((c) => c.Pokedex),
      },
      {
        path: 'categorias',
        title: 'Categorias',
        loadComponent: () =>
          import('./pages/categorias/layout/categorias').then(
            (c) => c.Categorias
          ),
      },
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/layout/home').then((c) => c.Home),
      },
    ],
  },
  {
    path: 'auth',
    component: Auth,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
