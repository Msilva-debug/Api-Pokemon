import {
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  signal,
  Signal,
  ViewChild,
} from '@angular/core';
import { CardPokemon } from '../../components/card-pokemon/card-pokemon';
import { PokemonService } from '../../services/pokemon';
import { CommonModule, ViewportScroller } from '@angular/common';
import { Paginator } from '../../../../shared/components/paginator/paginator';
import { ActivatedRoute } from '@angular/router';
import { UtilService } from '../../../../core/services/util.services';

@Component({
  imports: [CardPokemon, CommonModule, Paginator],
  templateUrl: './pokedex.html',
})
export class Pokedex implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.pokemonService.pokemons.set([]);
  }
  public scroll = inject(UtilService);
  public pokemonService = inject(PokemonService);

  private rangos = [
    { min: 1867, max: 1920, limit: 24 },
    { min: 1656, max: 1866, limit: 21 },
    { min: 1440, max: 1655, limit: 18 },
    { min: 1224, max: 1439, limit: 15 },
    { min: 1008, max: 1223, limit: 12 },
    { min: 0, max: 1007, limit: 9 },
  ];
  public pokemons = computed(() => this.pokemonService.pokemons());
  private routes = inject(ActivatedRoute);
  public informacionPaginador = computed(() =>
    this.pokemonService.informacionPaginador()
  );
  ngOnInit(): void {
    this.scroll.scrollInicio();
    this.cambiarVariable(window.innerWidth);
  }

  consultPokemons() {
    this.routes.paramMap.subscribe((params) => {
      if (params.get('path')) {
        this.pokemonService.nombreCategoria.set(
          params.get('path')?.toLowerCase()!
        );
        this.pokemonService.isCategoria.set(true);
        this.getPokemonListCategoria();
        return;
      }
      this.getPokemonList();
    });
  }

  cambiarVariable(width: number) {
    const rango = this.rangos.find((r) => width >= r.min && width <= r.max);

    this.pokemonService.limit.set(rango ? rango.limit : 24);
    this.pokemonService.informacionPaginadorInicial({
      inicio: 10,
      final: 10,
      total: 10,
      offset: 0,
      limit: rango ? rango.limit : 24,
      anteriorUrl: '',
      siguienteUrl: '',
      actualUrl: '',
    });
    this.consultPokemons();
  }
  getPokemonList = () => {
    this.pokemonService.getPokemonList();
  };
  getPokemonListCategoria = () => {
    this.pokemonService.getPokemonListCategoria();
  };

  cambiarPagina = (accion: string) => {
    this.pokemonService.cambiarPagina(accion);
    this.scroll.scrollInicio();
  };
}
