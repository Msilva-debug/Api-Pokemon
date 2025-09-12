import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'shared-page-not-found',
  imports: [RouterModule],
  template: `
    <div
      class="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-yellow-200 to-red-300 text-gray-800"
    >
      <h1 class="text-9xl font-extrabold tracking-widest text-red-600">404</h1>
      <div class="bg-red-600 px-2 text-sm rounded rotate-12 absolute">
        Página no encontrada
      </div>

      <div class="mt-10 flex flex-col items-center">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
          alt="Pikachu"
          class="w-32 h-32 animate-bounce"
        />
        <p class="mt-4 text-lg font-semibold">¡Pikachu está perdido!</p>
        <p class="text-sm text-gray-600">
          Parece que intentaste usar un
          <span class="font-bold">Pokéball</span> en una ruta inexistente.
        </p>
      </div>

      <div class="mt-8">
        <a
          routerLink="/"
          class="px-6 py-3 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold shadow-lg transition duration-300"
        >
          ⬅️ Volver al inicio
        </a>
      </div>
    </div>
  `,
  styles: ``,
})
export class PageNotFound {}
