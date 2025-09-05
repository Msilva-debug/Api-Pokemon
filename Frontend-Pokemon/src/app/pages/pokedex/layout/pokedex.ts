import {
  Component,
  effect,
  inject,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { CardPokemon } from '../components/card-pokemon/card-pokemon';
import { PokemonService } from '../services/pokemon';
import { Pokemon } from '../interfaces/response-pokemon';
import { CommonModule } from '@angular/common';
import { Paginator } from '../../../shared/components/paginator/paginator';
import { InformacionPaginador } from '../../../shared/components/interfaces/Paginador';

@Component({
  imports: [CardPokemon, CommonModule, Paginator],
  templateUrl: './pokedex.html',
  styleUrl: './pokedex.css',
})
export class Pokedex implements OnInit {
  private pokemonService = inject(PokemonService);
  public pokemons = signal<Pokemon[]>([]);
  public informacionPaginador!: InformacionPaginador;
  ngOnInit(): void {
    this.pokemonService.getPokemonList(21, 0).subscribe((response) => {
      this.pokemons.set([...response.results]);
    });
  }
}
