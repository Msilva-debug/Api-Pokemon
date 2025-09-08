import { Component } from '@angular/core';
import { Footer } from '../../shared/components/footer/footer';
import { Navbar } from '../../shared/components/navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [Footer, Navbar, RouterOutlet],
  template: `<shared-navbar></shared-navbar>

<main class="flex flex-col min-h-screen bg-[#28639b]">
  <div class="flex-1">
    <router-outlet></router-outlet>
  </div>

  <shared-footer class="mt-auto"></shared-footer>
</main>

    `,
  styles: ``,
})
export class Main {}
