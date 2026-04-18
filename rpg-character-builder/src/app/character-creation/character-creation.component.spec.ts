import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterCreationComponent } from './character-creation.component';

describe('CharacterCreationComponent', () => {
  let component: CharacterCreationComponent;
  let fixture: ComponentFixture<CharacterCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate a random character ID between 1 and 1000 with no decimal places', () => {
    component.generateCharacterId();
    expect(component.character.characterId).toBeGreaterThan(0);
    expect(component.character.characterId).toBeLessThanOrEqual(1000);
    expect(Number.isInteger(component.character.characterId)).toBe(true);

  });

  it('should add a character with correct customization', () => {
    component.character.name = 'Test Character';
    component.character.gender = 'Test Gender';
    component.character.race = 'Test Race';
    component.character.class = 'Test Class';
    component.customizeCharacter();
    expect(component.character.name).toBe('Test Character');
    expect(component.character.gender).toBe('Test Gender');
    expect(component.character.race).toBe('Test Race');
    expect(component.character.class).toBe('Test Class');
});

  it('should reset all forms fields to their default values after resetForm is called', () => {
  component.character.name = 'Test Name';
  component.character.gender = 'Test Gender';
  component.character.race = 'Test Race';
  component.character.class = 'Test Class';
  component.resetForm();
  expect(component.character.name).toBe('');
  expect(component.character.gender).toBe('');
  expect(component.character.race).toBe('');
  expect(component.character.class).toBe('');

});

});
