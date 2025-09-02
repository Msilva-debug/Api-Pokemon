import { Component } from '@angular/core';
import { Footer } from '../../shared/components/footer/footer';
import { Navbar } from '../../shared/components/navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [Footer, Navbar, RouterOutlet],
  template: `<shared-navbar></shared-navbar>

    <main class="min-h-screen">
      <div
        style="height: 100vh; background: #424242 url(../../../../assets/body_bg.png)"
      >
        <router-outlet></router-outlet>
      </div>
    </main>

    <shared-footer></shared-footer>`,
  styles: ``,
})
export class Main {}
