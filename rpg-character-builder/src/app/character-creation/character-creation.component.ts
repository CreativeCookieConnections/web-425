import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

interface CharacterProfile {
  characterId: number;
  name: string;
  gender: string;
  race: string;
  class: string;
}

@Component({
  selector: 'app-character-creation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="character-creation-page">
      <h1>Character Creation</h1>
      <p class="intro-text">
        Create a custom character, choose a premade character from the codex, or randomize a custom build.
      </p>

      <form #characterForm="ngForm" (ngSubmit)="customizeCharacter()" class="character-form">
        <label for="name">Name</label>
        <select
          id="name"
          name="nameSelection"
          required
          [(ngModel)]="selectedName"
          (ngModelChange)="onNameSelectionChange()"
        >
          <option value="" disabled>Select a premade character or custom</option>
          @for (option of codexCharacters; track option.name) {
            <option [value]="option.name">{{ option.name }}</option>
          }
          <option value="Custom">Custom</option>
        </select>

        @if (selectedName === 'Custom') {
          <label for="customName">Custom Name</label>
          <input
            id="customName"
            name="customName"
            type="text"
            required
            [(ngModel)]="customName"
            (ngModelChange)="onCustomNameChange()"
            placeholder="Type your custom character name"
          >
        }

        <label for="gender">Gender</label>
        <select
          id="gender"
          name="genderSelection"
          required
          [(ngModel)]="selectedGender"
          (ngModelChange)="onGenderSelectionChange()"
        >
          <option value="" disabled>Select gender</option>
          @for (option of genderOptions; track option) {
            <option [value]="option">{{ option }}</option>
          }
          <option value="Custom">Custom</option>
        </select>

        @if (selectedGender === 'Custom') {
          <label for="customGender">Custom Gender</label>
          <input
            id="customGender"
            name="customGender"
            type="text"
            required
            [(ngModel)]="customGender"
            (ngModelChange)="onCustomGenderChange()"
            placeholder="Type your custom gender"
          >
        }

        <label for="race">Race</label>
        <select
          id="race"
          name="raceSelection"
          required
          [(ngModel)]="selectedRace"
          (ngModelChange)="onRaceSelectionChange()"
        >
          <option value="" disabled>Select race</option>
          @for (option of raceOptions; track option) {
            <option [value]="option">{{ option }}</option>
          }
          <option value="Custom">Custom</option>
        </select>

        @if (selectedRace === 'Custom') {
          <label for="customRace">Custom Race</label>
          <input
            id="customRace"
            name="customRace"
            type="text"
            required
            [(ngModel)]="customRace"
            (ngModelChange)="onCustomRaceChange()"
            placeholder="Type your custom race"
          >
        }

        <label for="class">Class</label>
        <select
          id="class"
          name="classSelection"
          required
          [(ngModel)]="selectedClass"
          (ngModelChange)="onClassSelectionChange()"
        >
          <option value="" disabled>Select class</option>
          @for (option of classOptions; track option) {
            <option [value]="option">{{ option }}</option>
          }
          <option value="Custom">Custom</option>
        </select>

        @if (selectedClass === 'Custom') {
          <label for="customClass">Custom Class</label>
          <input
            id="customClass"
            name="customClass"
            type="text"
            required
            [(ngModel)]="customClass"
            (ngModelChange)="onCustomClassChange()"
            placeholder="Type your custom class"
          >
        }

        <div class="button-row">
          <button type="submit" [disabled]="characterForm.invalid">Customize Character</button>
          <button type="button" (click)="randomizeFromCodex()">Randomize from Codex</button>
          <button type="button" (click)="randomizeCustomCharacter()">Randomize Custom Character</button>
          <button type="button" (click)="resetForm(characterForm)">Reset</button>
        </div>
      </form>

      @if (createdCharacters.length > 0) {
        <section class="created-section">
          <h2>Created Characters</h2>
          <ul>
            @for (item of createdCharacters; track item.characterId) {
              <li>
                <strong>#{{ item.characterId }}</strong>
                <span>{{ item.name }} | {{ item.gender }} | {{ item.race }} | {{ item.class }}</span>
              </li>
            }
          </ul>
        </section>
      }
    </section>
  `,
  styles: [`
    .character-creation-page {
      max-width: 840px;
      margin: 0 auto;
      padding: 1rem 1rem 2.25rem;
      color: #f4ecff;
    }

    .intro-text {
      max-width: 68ch;
      margin: 0 0 1.2rem;
      color: #e8def6;
      line-height: 1.7;
    }

    .character-form {
      display: grid;
      gap: 0.65rem;
      background: linear-gradient(180deg, rgba(23, 10, 41, 0.96) 0%, rgba(10, 10, 18, 0.98) 100%);
      padding: 1.15rem;
      border: 1px solid #b785ff;
      border-radius: 12px;
      box-shadow:
        0 0 10px rgba(183, 133, 255, 0.35),
        0 0 20px rgba(153, 92, 255, 0.2),
        inset 0 0 12px rgba(183, 133, 255, 0.08);
    }

    label {
      font-weight: 600;
      color: #d9c2ff;
      font-family: 'Lato', sans-serif;
    }

    input,
    select {
      padding: 0.55rem;
      border-radius: 6px;
      border: 1px solid rgba(183, 133, 255, 0.55);
      background: rgba(7, 6, 14, 0.94);
      color: #ffffff;
      font-family: 'Merriweather', serif;
      outline: none;
      transition: border-color 0.25s ease, box-shadow 0.25s ease;
    }

    input:focus,
    select:focus {
      border-color: #d2b0ff;
      box-shadow: 0 0 0 2px rgba(183, 133, 255, 0.18);
    }

    select {
      appearance: none;
    }

    input::placeholder {
      color: #c7b7e4;
      opacity: 0.9;
    }

    .button-row {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.75rem;
    }

    button {
      padding: 0.6rem 0.95rem;
      border-radius: 6px;
      border: 1px solid #b785ff;
      background-color: #8a3e9b;
      color: #fff;
      cursor: pointer;
      box-shadow: 0 0 6px rgba(183, 133, 255, 0.35);
      font-family: 'Lato', sans-serif;
      transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
    }

    button:hover {
      background-color: #6b2e7a;
      box-shadow: 0 0 10px rgba(183, 133, 255, 0.65);
      transform: translateY(-1px);
    }

    button[disabled] {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .created-section {
      margin-top: 1.3rem;
    }

    .created-section h2 {
      margin-bottom: 0.75rem;
    }

    .created-section ul {
      list-style: none;
      padding-left: 0;
      display: grid;
      gap: 0.45rem;
    }

    .created-section li {
      background: linear-gradient(180deg, rgba(17, 8, 31, 0.95) 0%, rgba(9, 8, 16, 0.98) 100%);
      border: 1px solid rgba(183, 133, 255, 0.45);
      border-radius: 8px;
      padding: 0.6rem;
      display: flex;
      gap: 0.5rem;
      align-items: center;
      flex-wrap: wrap;
    }

    .created-section strong {
      color: #bb771e;
    }

    @media (max-width: 768px) {
      .character-creation-page {
        padding: 0.5rem 0 2rem;
      }

      .character-form {
        padding: 1rem;
      }

      .button-row {
        display: grid;
      }

      button {
        width: 100%;
      }
    }
  `]
})
export class CharacterCreationComponent {
  character: CharacterProfile = this.getDefaultCharacter();
  createdCharacters: CharacterProfile[] = [];
  selectedName = '';
  selectedGender = '';
  selectedRace = '';
  selectedClass = '';
  customName = '';
  customGender = '';
  customRace = '';
  customClass = '';

  readonly genderOptions = ['Male', 'Female', 'Other'];
  readonly raceOptions = [
    'Human',
    'Elf',
    'Demon',
    'Angel',
    'Shapeshifter',
    'Kitsune',
    'Dwarf',
    'Halfling',
    'Orc',
    'Goblin',
    'Dragonborn',
    'Merfolk',
    'Beastfolk',
    'Cyborg'
  ];
  readonly classOptions = [
    'Warrior',
    'Mage',
    'Rogue',
    'Assassin',
    'Guardian',
    'Ranger',
    'Hunter',
    'Merchant',
    'Bard',
    'Beast Master',
    'Witch',
    'Puppet Master',
    'Cleric',
    'Healer',
    'Thief',
    'Paladin',
    'Shaman',
    'Artificier',
    'Martial Artist',
    'Warlock',
    'Necromancer'
  ];

  readonly codexCharacters: Array<Pick<CharacterProfile, 'name' | 'gender' | 'race' | 'class'>> = [
    { name: 'Kira Kurai', gender: 'Female', race: 'Kurai Demon', class: 'Swordsman' },
    { name: 'Satashee Naomi', gender: 'Male', race: 'Shapeshifter', class: 'Mage' },
    { name: 'Bonbori Miyazaki', gender: 'Female', race: 'Kitsune', class: 'Celestial Guardian' },
    { name: 'Maya Yuki', gender: 'Female', race: 'Gayan', class: 'Heavenly Ward Commander' },
    { name: 'Mimoskei Yamamoto', gender: 'Male', race: 'Shapeshifter', class: 'Shapeshifting Rogue' },
    { name: 'Stella Winkle', gender: 'Female', race: 'Secret', class: 'Witch Librarian' },
    { name: 'Shi Toki', gender: 'Male', race: 'Grim Reaper of Time', class: 'Time Manipulator, Guardian of Time, Keeper of Life and Death' },
    { name: 'Nami Hoshizora', gender: 'Female', race: 'Elementalist', class: 'Multi-Elemental Mage' },
    { name: 'Celine Arashi', gender: 'Female', race: 'Half-Gayan, Half-Human', class: 'Gayan-Human Hybrid Warrior and Bard' },
    { name: 'Riku Takahashi', gender: 'Male', race: 'Human', class: 'Adventurer and Treasure Hunter' }
  ];

  private readonly randomGenders = ['Male', 'Female', 'Other'];
  private readonly randomRaces = this.raceOptions;
  private readonly randomClasses = this.classOptions;
  private readonly randomNames = ['Astra', 'Riven', 'Kael', 'Nami', 'Orin', 'Sora'];

  generateCharacterId(): void {
    this.character.characterId = Math.floor(Math.random() * 1000) + 1;
  }

  customizeCharacter(): void {
    this.applySelectedName();
    this.applySelectedGender();
    this.applySelectedRaceAndClass();

    if (!this.character.characterId) {
      this.generateCharacterId();
    }

    this.createdCharacters.push({ ...this.character });
  }

  randomizeFromCodex(): void {
    const randomIndex = Math.floor(Math.random() * this.codexCharacters.length);
    const selectedCharacter = this.codexCharacters[randomIndex];

    this.character = {
      characterId: this.character.characterId,
      ...selectedCharacter
    };

    this.selectedName = this.character.name;
    this.customName = '';
    this.selectedGender = this.genderOptions.includes(this.character.gender) ? this.character.gender : 'Custom';
    this.customGender = this.selectedGender === 'Custom' ? this.character.gender : '';
    this.selectedRace = this.raceOptions.includes(this.character.race) ? this.character.race : 'Custom';
    this.customRace = this.selectedRace === 'Custom' ? this.character.race : '';
    this.selectedClass = this.classOptions.includes(this.character.class) ? this.character.class : 'Custom';
    this.customClass = this.selectedClass === 'Custom' ? this.character.class : '';
  }

  randomizeCustomCharacter(): void {
    this.character.name = this.randomNames[Math.floor(Math.random() * this.randomNames.length)];
    this.character.gender = this.randomGenders[Math.floor(Math.random() * this.randomGenders.length)];
    this.character.race = this.randomRaces[Math.floor(Math.random() * this.randomRaces.length)];
    this.character.class = this.randomClasses[Math.floor(Math.random() * this.randomClasses.length)];
    this.selectedName = 'Custom';
    this.selectedGender = this.character.gender;
    this.selectedRace = this.character.race;
    this.selectedClass = this.character.class;
    this.customName = this.character.name;
    this.customGender = '';
    this.customRace = '';
    this.customClass = '';
  }

  resetForm(form?: NgForm): void {
    this.character = this.getDefaultCharacter();
    this.selectedName = '';
    this.selectedGender = '';
    this.selectedRace = '';
    this.selectedClass = '';
    this.customName = '';
    this.customGender = '';
    this.customRace = '';
    this.customClass = '';
    form?.resetForm(this.character);
  }

  onNameSelectionChange(): void {
    if (this.selectedName === 'Custom') {
      this.character.name = this.customName.trim();
      return;
    }

    const selectedCharacter = this.codexCharacters.find((item) => item.name === this.selectedName);

    if (!selectedCharacter) {
      this.character.name = this.selectedName;
      return;
    }

    this.customName = '';
    this.character.name = selectedCharacter.name;
    this.character.gender = selectedCharacter.gender;
    this.character.race = selectedCharacter.race;
    this.character.class = selectedCharacter.class;
    this.selectedGender = this.genderOptions.includes(selectedCharacter.gender) ? selectedCharacter.gender : 'Custom';
    this.customGender = this.selectedGender === 'Custom' ? selectedCharacter.gender : '';
    this.selectedRace = this.raceOptions.includes(selectedCharacter.race) ? selectedCharacter.race : 'Custom';
    this.customRace = this.selectedRace === 'Custom' ? selectedCharacter.race : '';
    this.selectedClass = this.classOptions.includes(selectedCharacter.class) ? selectedCharacter.class : 'Custom';
    this.customClass = this.selectedClass === 'Custom' ? selectedCharacter.class : '';
  }

  onCustomNameChange(): void {
    if (this.selectedName === 'Custom') {
      this.character.name = this.customName.trim();
    }
  }

  onGenderSelectionChange(): void {
    if (this.selectedGender === 'Custom') {
      this.character.gender = this.customGender.trim();
      return;
    }

    this.customGender = '';
    this.character.gender = this.selectedGender;
  }

  onCustomGenderChange(): void {
    if (this.selectedGender === 'Custom') {
      this.character.gender = this.customGender.trim();
    }
  }

  onRaceSelectionChange(): void {
    if (this.selectedRace === 'Custom') {
      this.character.race = this.customRace.trim();
      return;
    }

    this.customRace = '';
    this.character.race = this.selectedRace;
  }

  onClassSelectionChange(): void {
    if (this.selectedClass === 'Custom') {
      this.character.class = this.customClass.trim();
      return;
    }

    this.customClass = '';
    this.character.class = this.selectedClass;
  }

  onCustomRaceChange(): void {
    if (this.selectedRace === 'Custom') {
      this.character.race = this.customRace.trim();
    }
  }

  onCustomClassChange(): void {
    if (this.selectedClass === 'Custom') {
      this.character.class = this.customClass.trim();
    }
  }

  private applySelectedRaceAndClass(): void {
    if (this.selectedRace === 'Custom') {
      this.character.race = this.customRace.trim();
    } else if (this.selectedRace) {
      this.character.race = this.selectedRace;
    }

    if (this.selectedClass === 'Custom') {
      this.character.class = this.customClass.trim();
    } else if (this.selectedClass) {
      this.character.class = this.selectedClass;
    }
  }

  private applySelectedName(): void {
    if (this.selectedName === 'Custom') {
      this.character.name = this.customName.trim();
    } else if (this.selectedName) {
      this.character.name = this.selectedName;
    }
  }

  private applySelectedGender(): void {
    if (this.selectedGender === 'Custom') {
      this.character.gender = this.customGender.trim();
    } else if (this.selectedGender) {
      this.character.gender = this.selectedGender;
    }
  }

  private getDefaultCharacter(): CharacterProfile {
    return {
      characterId: 0,
      name: '',
      gender: '',
      race: '',
      class: ''
    };
  }

}
