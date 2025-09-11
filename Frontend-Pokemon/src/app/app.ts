import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoriaService } from './pages/categorias/services/categorias';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('Poke-Api');
  private categoriaService = inject(CategoriaService);
  ngOnInit(): void {
    this.categoriaService.getCategoriasList();
  }
}
