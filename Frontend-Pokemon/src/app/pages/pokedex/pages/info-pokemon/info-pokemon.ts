import { Component, inject, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs';

@Component({
  imports: [],
  templateUrl: './info-pokemon.html',
  styleUrl: './info-pokemon.css',
})
export class InfoPokemon implements OnInit {
  private pokemonService = inject(PokemonService);
  private routes = inject(ActivatedRoute);
  ngOnInit(): void {
    this.routes.paramMap
      .pipe(
        map((params) => params.get('path')?.toLocaleLowerCase()),
        filter((path): path is string => !!path),
        switchMap((path) => this.pokemonService.getInfoPokemon(path))
      )
      .subscribe((responseFinal) => {
        console.log(responseFinal);
      });
  }
}
