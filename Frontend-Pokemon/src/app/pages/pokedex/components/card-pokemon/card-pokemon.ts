import {
  Component,
  computed,
  effect,
  inject,
  Input,
  input,
  signal,
} from '@angular/core';
import {
  Pokemon,
  PokemonCard,
  ResponsePokemonById,
} from '../../interfaces/pokemon';
import { CommonModule, JsonPipe } from '@angular/common';
import { PokemonService } from '../../services/pokemon';
import { map, of, switchMap } from 'rxjs';
import { PipeIconTypePokemonPipe } from '../../pipe/pipe-icon-type-pokemon-pipe';
import { TypePokemon } from '../type-pokemon/type-pokemon';
import { ImagePokemon } from '../image-pokemon/image-pokemon';
import { PipeBorderColor } from '../../pipe/pipe-color-border-pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'pokedex-card-pokemon',
  imports: [CommonModule, TypePokemon, ImagePokemon, PipeBorderColor],
  templateUrl: './card-pokemon.html',
  styleUrl: './card-pokemon.css',
})
export class CardPokemon {
  private router = inject(Router);
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
            id: informacion.id,
          };
          return this.pokemonService
            .getForkJoinCard(informacion)
            .pipe(map((respuesta) => ({ ...basicInfo, ...respuesta })));
        })
      )
      .subscribe((completeInfo) => {
        this.pokemonSignal.set(completeInfo);
      });
  }
  private pokemonService = inject(PokemonService);

  private pokemonSignal = signal<PokemonCard | null>(null);
  public computedPokemonSignal = computed(() => this.pokemonSignal());

  public onPokemonClick = () => {
    this.router.navigate([
      'home',
      'pokedex',
      this.computedPokemonSignal()?.name?.toLowerCase(),
    ]);
  };
}
