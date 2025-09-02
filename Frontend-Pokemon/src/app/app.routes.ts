import { Routes } from '@angular/router';
import { Main } from './layout/main/main';
import { Auth } from './layout/auth/auth';

export const routes: Routes = [
  {
    path: 'home',
    component: Main,
    children: [
      {
        path: 'list-pokemon',
        loadComponent: () =>
          import('./pages/list-pokemon/layout/list-pokemon').then(
            (c) => c.ListPokemon
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
