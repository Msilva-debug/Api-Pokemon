import { Routes } from '@angular/router';
import { Main } from './layout/main/main';
import { Auth } from './layout/auth/auth';

export const routes: Routes = [
  {
    path: 'home',
    component: Main,
    children: [
      {
        path: 'pokedex/:id',
        loadComponent: () =>
          import('./pages/home/layout/home').then((c) => c.Home),
        data: { showNavbar: false },
      },
      {
        path: 'pokedex',
        title: 'Pokedex',
        loadComponent: () =>
          import('./pages/pokedex/layout/pokedex').then((c) => c.Pokedex),
        data: { showNavbar: true },
      },
      {
        path: 'categoria/:path',
        loadComponent: () =>
          import('./pages/pokedex/layout/pokedex').then((c) => c.Pokedex),
        data: { showNavbar: false },
      },
      {
        path: 'categorias',
        title: 'Categorias',
        loadComponent: () =>
          import('./pages/categorias/layout/categorias').then(
            (c) => c.Categorias
          ),
        data: { showNavbar: true },
      },
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/layout/home').then((c) => c.Home),
        data: { showNavbar: false },
      },
    ],
  },
  {
    path: 'auth',
    component: Auth,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
