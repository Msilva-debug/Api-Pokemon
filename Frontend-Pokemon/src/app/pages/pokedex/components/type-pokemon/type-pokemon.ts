import { Component, Input } from '@angular/core';
import { PipeColorTypePokemonPipe } from '../../pipe/pipe-color-type-pokemon-pipe';
import { PipeIconTypePokemonPipe } from '../../pipe/pipe-icon-type-pokemon-pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pokedex-type-pokemon',
  imports: [PipeColorTypePokemonPipe, PipeIconTypePokemonPipe, CommonModule],
  template: ` <p
    class=" inset-shadow-sm rounded-xl text-[9px] p-[5px]"
    [ngClass]="type | pipeColorTypePokemon"
  >
    {{ type }}
    <i
      [ngClass]="type | pipeIconTypePokemon"
      class="fa-duotone fa-solid fa-fire"
    ></i>
  </p>`,
})
export class TypePokemon {
  @Input() public type!: string;
}
