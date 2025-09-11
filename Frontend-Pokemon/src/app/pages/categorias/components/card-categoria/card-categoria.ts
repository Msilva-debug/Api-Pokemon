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
export class CardCategoria implements OnInit {
  @Input() categoria!: ICategorias;
  private categoriaService = inject(CategoriaService);
  private router = inject(Router);
  private pokemonService = inject(PokemonService);
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
          return {
            pokemons: response.pokemon,
            name: response.names?.find((r) => r.language.name === 'es'),
            image:
              response.sprites?.['generation-viii']?.['sword-shield']
                ?.name_icon,
          } as ICardCategoria;
        })
      )
      .subscribe((response) => {
        this.categoriasSignal.set(response);
      });
  }
  filterCategoria = () => {
    // this.pokemonService.setPokemonsCategoria(this.categoriasSignal().pokemons);
    // this.router.navigate([
    //   'home',
    //   'categoria',
    //   this.categoriasSignal().name?.name,
    // ]);
  };
}
