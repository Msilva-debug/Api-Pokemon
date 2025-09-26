import { Component, inject } from '@angular/core';
import { ServicePokemon } from '../../../shared/services/service-pokemon';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public globalService = inject(ServicePokemon);
}
