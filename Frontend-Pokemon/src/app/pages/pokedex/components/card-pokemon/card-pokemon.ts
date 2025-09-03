import { Component, effect, inject, Input, input, signal } from '@angular/core';
import {
  Pokemon,
  PokemonCard,
  ResponsePokemonById,
} from '../../interfaces/response-pokemon';
import { CommonModule, JsonPipe } from '@angular/common';
import { PokemonService } from '../../services/pokemon';
import { map, of, switchMap } from 'rxjs';
import { PipeColorTypePokemonPipe } from '../../pipe/pipe-color-type-pokemon-pipe';
import { PipeColorNamePipe } from '../../pipe/pipe-color-name-pipe';
import { PipeIconTypePokemonPipe } from '../../pipe/pipe-icon-type-pokemon-pipe';
import { TypePokemon } from '../type-pokemon/type-pokemon';

@Component({
  selector: 'pokedex-card-pokemon',
  imports: [CommonModule, PipeColorNamePipe, TypePokemon],
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
