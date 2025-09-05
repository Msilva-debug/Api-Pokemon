import { Component, Input } from '@angular/core';
import { PokemonCard } from '../../interfaces/response-pokemon';

@Component({
  selector: 'pokedex-image-pokemon',
  imports: [],
  templateUrl: './image-pokemon.html',
})
export class ImagePokemon {
  @Input() img?: PokemonCard | null;
  public isLoaded = false;
  onImageReady = () => {
    this.isLoaded = true;
  };
}
