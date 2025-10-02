import { Component, inject, Input } from '@angular/core';
import { ServicePokemon } from '../../../../shared/services/service-pokemon';
import {  NgClass, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'home-card-pokeball',
  imports: [TitleCasePipe, NgClass],
  templateUrl: './card-pokeball.html',
  styleUrl:'./card-pokeball.css'
,
})
export class CardPokeball {
  public globalService = inject(ServicePokemon);
  @Input()
  public infoPokeball!: any;
}
