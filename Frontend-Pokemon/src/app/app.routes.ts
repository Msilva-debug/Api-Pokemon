import { Routes } from '@angular/router';
import { Main } from './layout/main/main';
import { Auth } from './layout/auth/auth';
import { Pokedex } from './pages/pokedex/layout/pokedex';
import { Categorias } from './pages/categorias/layout/categorias';

export const routes: Routes = [
  {
    path: 'home',
    component: Main,
    children: [
      {
        path: 'pokedex',
        title: 'Pokedex',
        component: Pokedex,
        loadChildren: () =>
          import('./pages/pokedex/pokedex.routes').then((r) => r.routes),
        data: { showNavbar: true },
      },
      
      {
        path: 'categorias',
        title: 'Categorias',
        component: Categorias,
        loadChildren: () =>
          import('./pages/categorias/categorias.routes').then((r) => r.routes),
        data: { showNavbar: true },
      },
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/layout/home').then((c) => c.Home),
        data: { showNavbar: false },
      },
      {
        path: '**',
        redirectTo: 'notFound',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'auth',
    component: Auth,
    children: [
      {
        path: '**',
        redirectTo: 'notFound',
        pathMatch: 'full',
      },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '**',
    redirectTo: 'notFound',
    pathMatch: 'full',
  },
  {
    path: 'notFound',
    loadComponent: () =>
      import('./shared/components/page-not-found/page-not-found').then(
        (c) => c.PageNotFound
      ),
  },
];
