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
  public pokemonService = inject(PokemonService);
  public pokemons = signal<Pokemon[]>([]);
  public informacionPaginador = signal<InformacionPaginador>({
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
    this.getPokemonList();
  }
  getPokemonList = () => {
    this.pokemonService
      .getPokemonList(this.informacionPaginador().actualUrl!)
      .subscribe((response) => {
        this.informacionPaginador.update((info) => ({
          ...info,
          siguienteUrl: response.next,
          anteriorUrl: response.previous,
          total: response.count,
        }));
        this.pokemons.set([...response.results]);
      });
  };

  cambiarPagina = (accion: string) => {
    if (accion === 'anterior')
      this.informacionPaginador.update((info) => ({
        ...info,
        actualUrl: info.anteriorUrl,
      }));

    if (accion === 'siguiente')
      this.informacionPaginador.update((info) => ({
        ...info,
        actualUrl: info.siguienteUrl,
      }));
    this.pokemons.set([]);
    this.getPokemonList();
  };
}
