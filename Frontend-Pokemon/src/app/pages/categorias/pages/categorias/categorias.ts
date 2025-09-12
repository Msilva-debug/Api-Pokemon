import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CategoriaService } from '../../services/categorias';
import { ICategorias } from '../../interfaces/categorias';
import { CardCategoria } from '../../components/card-categoria/card-categoria';

@Component({
  imports: [CardCategoria],
  templateUrl: './categorias.html',
})
export class Categorias {
  private categoriaService = inject(CategoriaService);
  public computedCategorias = computed(() =>
    this.categoriaService.computedCategoriasInfo()
  );
}
