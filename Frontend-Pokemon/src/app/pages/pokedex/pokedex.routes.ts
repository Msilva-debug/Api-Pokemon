import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/pokedex/pokedex').then((c) => c.Pokedex),
  },

  {
    path: ':path',
    loadComponent: () =>
      import('./pages/info-pokemon/info-pokemon').then(
        (c) => c.InfoPokemon
      ),
  },

  {
    path: '**',
    redirectTo: 'notFound',
  },
];
