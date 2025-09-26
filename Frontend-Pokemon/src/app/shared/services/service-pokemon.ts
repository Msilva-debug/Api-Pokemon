import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServicePokemon {
  public theme = signal<string>('ultraball');
  public themeEffect = effect(() => {
    const currentTheme = this.theme();
    localStorage.setItem('theme', currentTheme);

    const body = document.getElementById('change-theme');
    if (body) {
      body.classList.remove(...body.classList);
      body.setAttribute('class', `theme-${currentTheme}`);
    }
  });

  constructor() {
    const theme = localStorage.getItem('theme');
    if (!theme) {
      this.theme.set('ultraball');
      return;
    }
    this.theme.set(theme);
  }
}
