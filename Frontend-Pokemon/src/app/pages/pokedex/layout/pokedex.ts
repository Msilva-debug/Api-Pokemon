import {
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
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
export class Pokedex implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.pokemonService.pokemons.set([]);
  }
  public pokemonService = inject(PokemonService);
  public pokemons = computed(() => this.pokemonService.pokemons());
  private routes = inject(ActivatedRoute);
  public informacionPaginador = computed(() =>
    this.pokemonService.informacionPaginador()
  );
  public informacionPaginadorPokedex = <InformacionPaginador>({
    inicio: 10,
    final: 10,
    total: 10,
    offset: 0,
    limit: 21,
    anteriorUrl: '',
    siguienteUrl: '',
    actualUrl: 'https://pokeapi.co/api/v2/pokemon/?limit=21&offset=0',
  });
  ngOnInit(): void {
    this.routes.paramMap.subscribe((params) => {
      if (params.get('path')) {
        this.pokemonService.nombreCategoria.set(params.get('path'));
        this.pokemonService.isCategoria.set(true);
        this.getPokemonListCategoria();
        return;
      }
      this.pokemonService.informacionPaginador.set(
        this.informacionPaginadorPokedex
      );
      this.getPokemonList();
    });
  }
  getPokemonList = () => {
    this.pokemonService.getPokemonList();
  };
  getPokemonListCategoria = () => {
    this.pokemonService.getPokemonListCategoria();
  };

  cambiarPagina = (accion: string) => {
    this.pokemonService.cambiarPagina(accion);
  };
}
