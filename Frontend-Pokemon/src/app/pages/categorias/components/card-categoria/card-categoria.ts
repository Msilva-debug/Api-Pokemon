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

@Component({
  selector: 'categorias-card-categoria',
  imports: [],
  templateUrl: './card-categoria.html',
  styles: ``,
})
export class CardCategoria implements OnInit {
  @Input() categoria!: ICategorias;
  private categoriaService = inject(CategoriaService);
  private categoriasSignal = signal<ICardCategoria>({} as ICardCategoria);
  public categoriasComputed = computed(() => this.categoriasSignal());

  ngOnInit(): void {
    this.categoriaService
      .getCategoriaUrl(this.categoria.url!)
      .pipe(
        filter((response) => {
          return (
            response.sprites?.['generation-viii']?.['sword-shield']
              ?.name_icon !== null
          );
        }),
        map((response) => {
          console.log(response);

          const image =
            response.sprites?.['generation-viii']?.['sword-shield']?.name_icon;

          return {
            image,
          } as ICardCategoria;
        })
      )
      .subscribe((response) => {
        this.categoriasSignal.set(response);
      });
  }
  filterCategoria = () => {
    console.log('Tamo activo');
  };
}
