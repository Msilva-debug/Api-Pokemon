import { Component } from '@angular/core';
import { Footer } from '../../shared/components/footer/footer';
import { Navbar } from '../../shared/components/navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [Footer, Navbar, RouterOutlet],
  template: `<shared-navbar></shared-navbar>

    <main class="flex flex-col min-h-screen">
      <div class="flex-1 items-center bg-[#2E2E2E]">
        <router-outlet></router-outlet>
      </div>
    </main>
    <shared-footer class="mt-auto"></shared-footer> `,
  styles: ``,
})
export class Main {}
