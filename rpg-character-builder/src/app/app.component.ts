import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="wrapper">
      <header class="banner">
        <img src="/assets/RpgCharacterBuilder.png" alt="website banner for RPG Character Builder which portrays three figures dressed in medival attire."/>
      </header>

      <main class="main-content">

      <nav class="navbar">
      <ul>
        <li><a routerLink="/">Home</a></li>
        <li><a href="#">Character Creation</a></li>
        <li><a href="#">Character Management</a></li>
        <li><a href="#">Resources</a></li>
        <li><a href="#">Community</a></li>
      </ul>
    </nav>
    </div>
  `
})
export class AppComponent {
  title = 'rpg-character-builder';
}
