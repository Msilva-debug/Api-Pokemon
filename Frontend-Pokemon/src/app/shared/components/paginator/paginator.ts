import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { InformacionPaginador } from '../interfaces/Paginador';

@Component({
  selector: 'shared-paginator',
  imports: [],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
})
export class Paginator {
  @Input() informacion!: InformacionPaginador;
  cambiarPagina = output<'anterior' | 'siguiente'>();
}
