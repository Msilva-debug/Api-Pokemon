import { Component } from '@angular/core';
import { CardPokeball } from '../components/card-pokeball/card-pokeball';

@Component({
  selector: 'app-home',
  imports: [CardPokeball],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public infoPokeballs = [
    {
      theme: 'pokeball',
      description: 'poke ball',
      url: 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/0/02/latest/20231226202856/Pok%C3%A9_Ball_%28Ilustraci%C3%B3n%29.png/120px-Pok%C3%A9_Ball_%28Ilustraci%C3%B3n%29.png',
    },
    {
      theme: 'superball',
      description: 'super ball',
      url: 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/5/57/latest/20231226203004/Super_Ball_%28Ilustraci%C3%B3n%29.png/120px-Super_Ball_%28Ilustraci%C3%B3n%29.png',
    },
    {
      theme: 'ultraball',
      description: 'ultra ball',
      url: 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/c/c9/latest/20231226203124/Ultra_Ball_%28Ilustraci%C3%B3n%29.png/120px-Ultra_Ball_%28Ilustraci%C3%B3n%29.png',
    },
    {
      theme: 'masterball',
      description: 'master ball',
      url: 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/a/a9/latest/20120802225204/Master_Ball_%28Ilustraci%C3%B3n%29.png/120px-Master_Ball_%28Ilustraci%C3%B3n%29.png',
    },
    {
      theme: 'safariball',
      description: 'safari ball',
      url: 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/a/ac/latest/20231226200329/Safari_Ball_%28Ilustraci%C3%B3n%29.png/120px-Safari_Ball_%28Ilustraci%C3%B3n%29.png',
    },
  ];
}
