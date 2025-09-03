import { Component, Input } from '@angular/core';
import { PokemonCard } from '../../interfaces/response-pokemon';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'pokedex-image-pokemon',
  imports: [TitleCasePipe],
  templateUrl: './image-pokemon.html',
  styleUrl: './image-pokemon.css',
})
export class ImagePokemon {
  @Input() img?: PokemonCard | null;
}
