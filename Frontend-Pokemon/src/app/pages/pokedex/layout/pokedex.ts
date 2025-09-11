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
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [CardPokemon, CommonModule, Paginator],
  templateUrl: './pokedex.html',
  styleUrl: './pokedex.css',
})
export class Pokedex implements OnInit {
  public pokemonService = inject(PokemonService);
  public pokemons = computed(() => this.pokemonService.pokemons());
  private routes = inject(ActivatedRoute);
  public informacionPaginador = computed(() =>
    this.pokemonService.informacionPaginador()
  );
  private categoriaId: string | null = null;
  ngOnInit(): void {
    this.routes.paramMap.subscribe((params) => {
      if (params.get('path')) {
        this.categoriaId = params.get('path');
        this.pokemonService.categoriaId.set(true);
        if (!!this.categoriaId) {
          this.getPokemonListCategoria();
          return;
        }
      }

      this.getPokemonList();
    });
  }
  getPokemonList = () => {
    this.pokemonService.getPokemonList();
  };
  getPokemonListCategoria = () => {
    // this.pokemonService.getPokemonListCategoria();
  };

  cambiarPagina = (accion: string) => {
    console.log('Estoy intentanod cambiar pagina: ')
    this.pokemonService.cambiarPagina(accion);
    this.getPokemonList();
  };
}
