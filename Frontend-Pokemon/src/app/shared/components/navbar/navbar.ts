import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';

@Component({
  selector: 'shared-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styles: ``,
})
export class Navbar {
  public routes = routes
    .map((route) => route.children ?? [])
    .flat()
    .filter((route) => route.path != '');
}
