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
import { InformacionPaginador } from '../../../../shared/components/interfaces/Paginador';
import { Pokemon } from '../../interfaces/pokemon';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [CardPokemon, CommonModule, Paginator],
  templateUrl: './pokedex.html',
})
export class Pokedex implements OnInit, OnDestroy {
  private viewportScroller = inject(ViewportScroller);
  ngOnDestroy(): void {
    this.pokemonService.pokemons.set([]);
  }
  public pokemonService = inject(PokemonService);
  public pokemons = computed(() => this.pokemonService.pokemons());
  private routes = inject(ActivatedRoute);
  public informacionPaginador = computed(() =>
    this.pokemonService.informacionPaginador()
  );
  public informacionPaginadorPokedex = <InformacionPaginador>{
    inicio: 10,
    final: 10,
    total: 10,
    offset: 0,
    limit: 24,
    anteriorUrl: '',
    siguienteUrl: '',
    actualUrl: '',
  };
  ngOnInit(): void {
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
      this.pokemonService.informacionPaginador.set(
        this.informacionPaginadorPokedex
      );
      this.getPokemonList();
    });
  }

  cambiarVariable(width: number) {
    const rangos = [
      { min: 1867, max: 1920, limit: 24 },
      { min: 1656, max: 1866, limit: 21 },
      { min: 1440, max: 1655, limit: 18 },
      { min: 1224, max: 1439, limit: 15 },
      { min: 1008, max: 1223, limit: 12 },
      { min: 0, max: 1007, limit: 9 },
    ];
    const rango = rangos.find((r) => width >= r.min && width <= r.max);

    this.pokemonService.limit.set(rango ? rango.limit : 24);
    this.informacionPaginadorPokedex.actualUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${rango ? rango.limit : 24}?&offset=0`;
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
    this.viewportScroller.scrollToPosition([0, 0]);
  };
}
