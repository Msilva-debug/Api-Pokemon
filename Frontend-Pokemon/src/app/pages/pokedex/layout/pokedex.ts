import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { CardPokemon } from '../components/card-pokemon/card-pokemon';
import { PokemonService } from '../services/pokemon';
import { CommonModule } from '@angular/common';
import { Paginator } from '../../../shared/components/paginator/paginator';
import { InformacionPaginador } from '../../../shared/components/interfaces/Paginador';
import { Pokemon } from '../interfaces/pokemon';

@Component({
  imports: [CardPokemon, CommonModule, Paginator],
  templateUrl: './pokedex.html',
  styleUrl: './pokedex.css',
})
export class Pokedex implements OnInit {
  public pokemonService = inject(PokemonService);
  public pokemons = computed(() => this.pokemonService.pokemons());
  public informacionPaginador = computed(() =>
    this.pokemonService.informacionPaginador()
  );

  ngOnInit(): void {
    this.getPokemonList();
  }
  getPokemonList = () => {
    this.pokemonService.getPokemonList();
  };

  cambiarPagina = (accion: string) => {
    this.pokemonService.cambiarPagina(accion);
    this.getPokemonList();
  };
}
