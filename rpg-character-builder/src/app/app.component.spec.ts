import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { CharacterCodexComponent } from './character-codex/character-codex.component';
import { Routes, Router } from '@angular/router';
import { IterableDiffers } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async () => {
    const activatedRouteStub = {
      snapshot: {
        paramMap: {
          get: () => 'staticValue',

        },
    },

    queryParams: of({}),

    };

    const routes: Routes = [
      {path: 'character-codex', component: CharacterCodexComponent},
    ]
    
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule.withRoutes(routes)],
      declarations: [CharacterCodexComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  /** Week 3 Unit Tests */

  it('should have correct route for character-codex Component', () => {
    const router = TestBed.inject(Router);
    const route=router.config.find(r => r.path === 'character-codex');
    expect(route).toBeTruthy();
    expect(route?.component).toBe(CharacterCodexComponent);
  });

  it('should create CharacterCodexComponent', () => {
    const fixture = TestBed.createComponent(CharacterCodexComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should correctly display a list of all characters in CharacterCodexComponent', () => {
    const fixture = TestBed.createComponent(CharacterCodexComponent);
    const component = fixture.componentInstance;
    component.characterCodexList = [
     { name: 'Character 1', description: 'Description 1' },
      { name: 'Character 2', description: 'Description 2' },
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.character-card').length).toBe(2);

});

});
