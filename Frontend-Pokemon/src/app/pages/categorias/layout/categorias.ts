import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class Categorias {}
