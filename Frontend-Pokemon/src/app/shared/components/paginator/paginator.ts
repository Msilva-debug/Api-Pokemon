import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { InformacionPaginador } from '../interfaces/Paginador';

@Component({
  selector: 'shared-paginator',
  imports: [],
  templateUrl: './paginator.html',
})
export class Paginator {
  @Input() informacion!: InformacionPaginador;
  cambiarPagina = output<'anterior' | 'siguiente'>();
}
