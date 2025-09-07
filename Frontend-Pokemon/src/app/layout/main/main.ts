import { Component } from '@angular/core';
import { Footer } from '../../shared/components/footer/footer';
import { Navbar } from '../../shared/components/navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [Footer, Navbar, RouterOutlet],
  template: `<shared-navbar></shared-navbar>

    <main class="h-full min-h-screen" style="background-color: #28639bff;">
      <div class="h-full ">
        <router-outlet></router-outlet>
      </div>
      <shared-footer></shared-footer>
    </main>

    `,
  styles: ``,
})
export class Main {}
