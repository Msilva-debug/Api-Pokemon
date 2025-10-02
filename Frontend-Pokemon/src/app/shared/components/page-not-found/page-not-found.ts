import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'shared-page-not-found',
  imports: [RouterModule],
  template: `
    <div
      class="text-center flex flex-col items-center justify-center h-screen bg-gradient-to-b from-yellow-200 to-red-300 text-gray-800"
    >
      <h1 class="text-9xl font-extrabold  text-primary">404</h1>
      <div
        class="bg-primary px-2 text-secondary text-[10px] md:text-sm rounded rotate-12 absolute"
      >
        Página no encontrada
      </div>

      <div class="mt-10 flex flex-col items-center">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
          alt="Pikachu"
          class="w-32 h-32 animate-bounce"
        />
        <p class="mt-4 text-secondary text-lg font-semibold">¡Pikachu está perdido!</p>
        <p class="text-[10px] md:text-sm text-secondary text-center">
          Parece que intentaste usar un Pokéball en una ruta inexistente.
        </p>
      </div>

      <div class="mt-8">
        <a
          routerLink="/"
          class="px-6 py-3 rounded-xl bg-primary hover:bg-yellow-500 text-secondary font-bold shadow-lg transition duration-300"
        >
          ⬅️ Volver al inicio
        </a>
      </div>
    </div>
  `,
  styles: ``,
})
export class PageNotFound {}
