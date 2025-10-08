import { Component, inject, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [],
  templateUrl: './info-pokemon.html',
  styleUrl: './info-pokemon.css',
})
export class InfoPokemon implements OnInit {
  private pokemonService = inject(PokemonService);
  private routes = inject(ActivatedRoute);
  ngOnInit(): void {
    this.routes.paramMap.subscribe((params) => {
      if (params.get('path')) {
        this.pokemonService
          .getInfoPokemonPorNombre(params.get('path')?.toLowerCase()!)
          .subscribe((response) => {
            console.log(response);
          });
      }
    });
  }
}
