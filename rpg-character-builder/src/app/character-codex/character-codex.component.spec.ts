import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCodexComponent } from './character-codex.component';
import { routes } from '../app.routes';

describe('CharacterCodexComponent', () => {
  let component: CharacterCodexComponent;
  let fixture: ComponentFixture<CharacterCodexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCodexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterCodexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct route for the character codex component', () => {
    const route = routes.find((item) => item.path === 'character-codex');

    expect(route).toBeTruthy();
    expect(route?.component).toBe(CharacterCodexComponent);
  });

  it('should create a list of all characters from the character codex', () => {
    expect(component.characterCodexList.length).toBe(10);
    expect(component.characterCodexList.every((character) => !!character.name)).toBeTrue();
  });

  it('should correctly display a list of characters', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.character-card');
    const names = Array.from(compiled.querySelectorAll('.character-card h3')).map((element) =>
      element.textContent?.trim()
    );

    expect(cards.length).toBe(component.characterCodexList.length);
    expect(names).toContain('Kira Kurai');
    expect(names).toContain('Riku Takahashi');
  });
});
