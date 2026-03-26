import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="wrapper">
      <header class="banner">
        <img src="assets/RPGCharacterCreatorLogo.png" alt="RPG Character Creator Logo which is a magic symbol with a fox max. There are words that says RPG Character Creator on the logo."/>
      </header>

      <main class="main-content">

      <nav class="navbar">
      <ul>
        <li><a routerLink="/">Home</a></li>
        <li><a href="#">Game</a></li>
        <li><a href="#">Character Creation</a></li>
        <li><a href="#">Character Management</a></li>
        <li><a href="#">Resources</a></li>
        <li><a href='#'>RPG Worlds</a></li>
        <li><a href="#">Community</a></li>
        <li><a href="#">News</a></li>
        <li><a href="#">Shop</a></li>
        <li><a href='#'>Support</a></li>
      </ul>
    </nav>

    <section class="content">
      <router-outlet/>
    </section>

    </main>

    <footer class="footer">
      <nav class="footer-nav">
        <a routerLink="/">Home</a>
        <a href="#">Game</a>
        <a href="#">Character Creation</a>
        <a href="#">Character Management</a>
        <a href="#">Resources</a>
        <a href="#">RPG Worlds</a>
        <a href="#">Community</a>
        <a href="#">News</a>
        <a href="#">Shop</a>
        <a href="#">Support</a>
      </nav>
      <p>&copy; 2024 RPG Character Builder.</p>
    </footer>
    </div>
  `,
  styles: [
    `
    `
  ]
})

export class AppComponent {

}
