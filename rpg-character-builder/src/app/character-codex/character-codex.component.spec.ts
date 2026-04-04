import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCodexComponent } from './character-codex.component';

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
});
