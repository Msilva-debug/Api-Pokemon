import {
  Component,
  computed,
  inject,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import {
  ICardCategoria,
  ICategorias,
  ResponseCategoriaById,
} from '../../interfaces/categorias';
import { CategoriaService } from '../../services/categorias';
import { filter, map, tap } from 'rxjs';
import { PokemonService } from '../../../pokedex/services/pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'categorias-card-categoria',
  imports: [],
  templateUrl: './card-categoria.html',
  styles: ``,
})
export class CardCategoria {
  @Input() categoria!: ICardCategoria;
  private router = inject(Router);

  filterCategoria = () => {
    this.router.navigate([
      'home',
      'categoria',
      this.categoria.name?.name!.toLowerCase(),
    ]);
  };
}
