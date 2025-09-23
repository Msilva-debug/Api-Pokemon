import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../../../app.routes';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-navbar',
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.html',
  styles: ``,
})
export class Navbar {
  public stateMenu = signal<boolean>(true);
  public routes = routes
    .map((route) => route.children ?? [])
    .flat()
    .filter((route) => route.data?.['showNavbar']);

  public toggleMenu = () => {
    this.stateMenu.update((state) => !state);
  };
}
