import { Component, effect, inject, Input, input, signal } from '@angular/core';
import {
  Pokemon,
  PokemonCard,
  ResponsePokemonById,
} from '../../interfaces/response-pokemon';
import { CommonModule, JsonPipe } from '@angular/common';
import { PokemonService } from '../../services/pokemon';
import { map, of, switchMap } from 'rxjs';
import { PipeColorNamePipe } from '../../pipe/pipe-color-name-pipe';

@Component({
  selector: 'pokedex-card-pokemon',
  imports: [CommonModule, PipeColorNamePipe],
  templateUrl: './card-pokemon.html',
  styleUrl: './card-pokemon.css',
})
export class CardPokemon {
  @Input()
  set pokemon(pokemon: Pokemon) {
    if (!pokemon?.url) return;
    this.pokemonService
      .getPokemonUrl(pokemon.url)
      .pipe(
        switchMap((informacion: ResponsePokemonById) => {
          const basicInfo = {
            name: informacion.name,
            image: informacion.sprites.front_default,
          };

          return this.pokemonService.getForkJoinCard(informacion).pipe(
            switchMap((respuesta) => {
              return of({ ...basicInfo, ...respuesta });
            })
          );
        })
      )
      .subscribe((completeInfo) => {
        this.pokemonSignal.set(completeInfo);
      });
  }
  private pokemonService = inject(PokemonService);

  public pokemonSignal = signal<PokemonCard | null>(null);

  public onPokemonClick = () => {};
}
