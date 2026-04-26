import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="wrapper">
      <header class="banner">
        <img src="assets/RPGCharacterCreatorLogo.png" alt="RPG Character Creator Logo which is a magic symbol with a fox max. There are words that says RPG Character Creator on the logo."/>
      </header>

      <div class="sign-in-container">
        @if(email) {
          <p class="welcome-text">Welcome, <span>{{ email }}</span>!</p>
          <button class="signout-btn" (click)="signout()">Sign Out</button>
        } @else {
        <a routerLink="/signin" class="sign-in-link">Sign In</a>
        }
      </div>

      <main class="main-content">

      <nav class="navbar">
      <ul>
        <li><a routerLink="/">Home</a></li>
        <li><a routerLink="/signin">Signin</a></li>
        <li><a routerLink="/game">Game</a></li>
        <li><a routerLink="/character-codex">Character Codex</a></li>
        <li><a routerLink="/character-creation">Character Creation</a></li>
        <li><a routerLink="/character-management">Character Management</a></li>
        <li><a routerLink="/resources">Resources</a></li>
        <li><a routerLink='/rpg-worlds'>RPG Worlds</a></li>
        <li><a routerLink='/community'>Community</a></li>
        <li><a routerLink='/guild'>Guild</a></li>
        <li><a routerLink='/news'>News</a></li>
        <li><a routerLink='/shop'>Shop</a></li>
        <li><a routerLink='/support'>Support</a></li>
      </ul>
    </nav>

    <section class="content">
      <router-outlet/>
    </section>

    </main>

    <footer class="footer">
      <nav class="footer-nav">
        <a routerLink="/">Home</a>
        <a routerLink="/signin">Signin</a>
        <a routerLink="/game">Game</a>
        <a routerLink="/character-codex">Character Codex</a>
        <a routerLink="/character-creation">Character Creation</a>
        <a routerLink="/character-management">Character Management</a>
        <a routerLink="/resources">Resources</a>
        <a routerLink="/rpg-worlds">RPG Worlds</a>
        <a routerLink="/community">Community</a>
        <a routerLink="/guild">Guild</a>
        <a routerLink="/news">News</a>
        <a routerLink="/shop">Shop</a>
        <a routerLink="/support">Support</a>
      </nav>
      <p>&copy; 2024 RPG Character Builder.</p>
    </footer>
    </div>
  `,
  styles: [
    `
    .sign-in-container {
      text-align: right;
      padding-right: 20px;
      margin-top: 10px;
    }
    .sign-in-link {
      display: inline-block;
      padding: 0.5rem 1rem;
      background-color: #8a3e9b;
      color: #fff;
      text-decoration: none;
      border-radius: 4px;
      border: 1px solid #b785ff;
      font-family: 'Lato', sans-serif;
      box-shadow: 0 0 6px rgba(183, 133, 255, 0.5), 0 0 14px rgba(153, 92, 255, 0.4);
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }
    .sign-in-link:hover {
      background-color: #6b2e7a;
      box-shadow: 0 0 10px rgba(183, 133, 255, 0.75), 0 0 22px rgba(153, 92, 255, 0.65);
    }
    .welcome-text {
      display: inline;
      font-family: 'Lato', sans-serif;
      color: #ccbbee;
      font-size: 0.9em;
      margin-right: 10px;
    }
    .welcome-text span {
      color: #b785ff;
      font-weight: 700;
      text-shadow: 0 0 4px rgba(183, 133, 255, 0.6);
    }
    .signout-btn {
      display: inline-block;
      padding: 0.4rem 0.9rem;
      background-color: transparent;
      color: #ccbbee;
      border: 1px solid #4a2a6a;
      border-radius: 4px;
      font-family: 'Lato', sans-serif;
      font-size: 0.85em;
      cursor: pointer;
      transition: border-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
    }
    .signout-btn:hover {
      border-color: #b785ff;
      color: #ffffff;
      box-shadow: 0 0 6px rgba(183, 133, 255, 0.4);
    }
    `
  ]
})

export class AppComponent {
  email?: string;

  constructor(private authService: AuthService, private cookieService: CookieService) {
  }

  ngOnInit() {
    this.authService.getAuthState().subscribe((isAuth) => {
      if(isAuth) {
        this.email = this.cookieService.get('session_user');
      }
    });
  }

  signout() {
    this.authService.signout();
  }
}
