import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-guild',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <div class="guild-form-container">
    <form [formGroup]="guildForm" class="guild-form" (ngSubmit)="createGuild(); guildForm.reset();">
      <h1> Create a New Guild or Join Others</h1>
      <fieldset>
        <legend> Guild Form </legend>

        <label> Guild Name: </label>
        <input type="text" formControlName="name" />

        <label> Description </label>
        <textarea rows="10" formControlName="description"></textarea>

        <label> Type (Select all that apply) </label>
        <div formArrayName="types">
        @for(type of recommendedTypes; track type; let i = $index) {
          <label class="checkbox-label">
            <input type="checkbox" [formControlName]="i"> {{ type }}
          </label>
        }
        </div>

        <label> Accept Terms </label>
        <div formArrayName="acceptTerms">
        @for(term of acceptTerms; track term; let i = $index) {
          <input type="checkbox" [formControlName]="i"> {{ term }} <br />
        }
        </div>

        <label> Notification Preference </label>
        @for(pref of notificationPreferences; track pref) {
          <input type="radio" [value]="pref" formControlName="notificationPreference"> {{ pref }} <br />
        }

        <input type="submit" [disabled]="!guildForm.valid" value="Create Guild">
      </fieldset>
    </form>

    <div class="guild-list">
      <!-- List of existing guilds would go here -->
      <h1> Existing Guilds </h1>
      <p> Join an existing guild </p>
      <div class="guild-item-container">
        @for(guild of existingGuilds; track guild) {
          <div class="guild-item">
            <h2>{{ guild.name }}</h2>
            <p>{{ guild.description }}</p>
            <p><strong>Type:</strong> {{ formatGuildType(guild.type) }}</p>
            <p><strong>Members:</strong> {{ guild.members.length }}</p>
            <button (click)="joinGuild(guild)">Join Guild</button>
          </div>
        }
      </div>

    <div class="personal-guild-list">
      <!-- List of Your Guilds -->
      <h1> Your Guilds </h1>
      <p> Manage your guilds </p>
      <div class="guild-item-container">
        @for(guild of yourGuilds; track guild) {
          <div class="guild-item">
            <h2>{{ guild.name }}</h2>
            <p>{{ guild.description }}</p>
            <p><strong>Type:</strong> {{ formatGuildType(guild.type) }}</p>
            <p><strong>Members:</strong> {{ guild.members.length }}</p>
            <button (click)="enterGuild(guild)">Enter Guild</button>
          </div>
        }
      </div>

    <div class="joined-guilds">
      <h1> Joined Guilds </h1>
      <p> View your joined guilds </p>
      <div class="guild-item-container">
        @for(guild of joinedGuilds; track guild) {
          <div class="guild-item">
            <h2>{{ guild.name }}</h2>
            <p>{{ guild.description }}</p>
            <p><strong>Type:</strong> {{ formatGuildType(guild.type) }}</p>
            <p><strong>Members:</strong> {{ guild.members.length }}</p>
            <button (click)="enterGuild(guild)">Enter Guild</button>
          </div>
        }
      </div>
    </div>
  </div>

  `,
  styles: [`
    .guild-form-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      color: #f4ecff;
    }

    .guild-form {
      background: linear-gradient(180deg, rgba(23, 10, 41, 0.96) 0%, rgba(10, 10, 18, 0.98) 100%);
      padding: 1.5rem;
      border: 1px solid #b785ff;
      border-radius: 12px;
      box-shadow:
        0 0 10px rgba(183, 133, 255, 0.35),
        0 0 20px rgba(153, 92, 255, 0.2),
        inset 0 0 12px rgba(183, 133, 255, 0.08);
      margin-bottom: 2rem;
    }

    h1 {
      font-family: 'Montserrat', sans-serif;
      color: #8c61a8;
      text-shadow: 0 0 2px #2d0e58, 0 0 4px #b785ff;
      font-size: 2.5em;
      text-align: center;
      margin-bottom: 1rem;
    }

    fieldset {
      border: 1px solid #b785ff;
      border-radius: 8px;
      padding: 1rem;
      background: rgba(7, 6, 14, 0.5);
    }

    legend {
      font-family: 'Lato', sans-serif;
      color: #d9c2ff;
      font-weight: 600;
      padding: 0 0.5rem;
    }

    label {
      display: block;
      font-weight: 600;
      color: #d9c2ff;
      font-family: 'Lato', sans-serif;
      margin-top: 1rem;
      margin-bottom: 0.5rem;
    }

    input[type="text"],
    input[type="email"],
    textarea,
    select {
      width: 100%;
      padding: 0.55rem;
      border-radius: 6px;
      border: 1px solid rgba(183, 133, 255, 0.55);
      background: rgba(7, 6, 14, 0.94);
      color: #ffffff;
      font-family: 'Merriweather', serif;
      outline: none;
      transition: border-color 0.25s ease, box-shadow 0.25s ease;
      box-sizing: border-box;
    }

    input[type="text"]:focus,
    input[type="email"]:focus,
    textarea:focus,
    select:focus {
      border-color: #d2b0ff;
      box-shadow: 0 0 0 2px rgba(183, 133, 255, 0.18);
    }

    textarea {
      resize: vertical;
      min-height: 100px;
    }

    select {
      appearance: none;
    }

    input[type="checkbox"],
    input[type="radio"] {
      margin-right: 0.5rem;
    }

    .checkbox-label {
      display: block;
      margin-bottom: 0.5rem;
      color: #e8def6;
      font-family: 'Merriweather', serif;
      font-weight: normal;
    }

    input[type="submit"] {
      padding: 0.6rem 1.5rem;
      border-radius: 6px;
      border: 1px solid #b785ff;
      background-color: #8a3e9b;
      color: #fff;
      cursor: pointer;
      box-shadow: 0 0 6px rgba(183, 133, 255, 0.35);
      font-family: 'Lato', sans-serif;
      transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
      margin-top: 1rem;
    }

    input[type="submit"]:hover:not(:disabled) {
      background-color: #6b2e7a;
      box-shadow: 0 0 10px rgba(183, 133, 255, 0.65);
      transform: translateY(-1px);
    }

    input[type="submit"]:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .guild-list,
    .personal-guild-list,
    .joined-guilds {
      margin-bottom: 2rem;
    }

    .guild-list h1,
    .personal-guild-list h1,
    .joined-guilds h1 {
      font-family: 'Montserrat', sans-serif;
      color: #8c61a8;
      text-shadow: 0 0 2px #2d0e58, 0 0 4px #b785ff;
      font-size: 2em;
      margin-bottom: 0.5rem;
    }

    .guild-list p,
    .personal-guild-list p,
    .joined-guilds p {
      color: #e8def6;
      font-family: 'Merriweather', serif;
      margin-bottom: 1rem;
      text-align: center;
    }

    .guild-item-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
      justify-content: center;
    }

    .guild-item {
      background: linear-gradient(180deg, rgba(23, 10, 41, 0.96) 0%, rgba(10, 10, 18, 0.98) 100%);
      padding: 1rem;
      border: 1px solid #b785ff;
      border-radius: 12px;
      box-shadow:
        0 0 8px rgba(183, 133, 255, 0.25),
        inset 0 0 8px rgba(183, 133, 255, 0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      text-align: center;
    }

    .guild-item:hover {
      transform: translateY(-2px);
      box-shadow:
        0 0 12px rgba(183, 133, 255, 0.4),
        inset 0 0 12px rgba(183, 133, 255, 0.08);
    }

    .guild-item h2 {
      font-family: 'Lato', sans-serif;
      color: #bb771e;
      text-shadow: 0 0 2px #2d0e58, 0 0 4px #b785ff;
      font-size: 1.2em;
      margin-bottom: 0.5rem;
    }

    .guild-item p {
      color: #e8def6;
      font-family: 'Merriweather', serif;
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }

    .guild-item strong {
      color: #d9c2ff;
    }

    .guild-item button {
      padding: 0.5rem 1rem;
      border-radius: 6px;
      border: 1px solid #b785ff;
      background-color: #8a3e9b;
      color: #fff;
      cursor: pointer;
      box-shadow: 0 0 6px rgba(183, 133, 255, 0.35);
      font-family: 'Lato', sans-serif;
      transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
      margin-top: 0.5rem;
    }

    .guild-item button:hover {
      background-color: #6b2e7a;
      box-shadow: 0 0 10px rgba(183, 133, 255, 0.65);
      transform: translateY(-1px);
    }
  `]
})
export class GuildComponent {
  guildForm: FormGroup;

  recommendedTypes = ['Competitive', 'Casual', 'Social', 'Educational', 'Role-Playing'];
  acceptTerms = ['I agree to the guild rules', 'I understand the consequences of misconduct'];
  notificationPreferences = ['email', 'SMS', 'In-Game', 'In-App'];

  existingGuilds = [
    {
      name: 'Dragon Slayers',
      description: 'A guild dedicated to hunting dragons and protecting villages.',
      type: ['Competitive', 'Role-Playing', 'Social'],
      members: [{ id: 1, name: 'Hero1' }, { id: 2, name: 'Hero2' }]
    },
    {
      name: 'Arcane Academy',
      description: 'Masters of magic and arcane knowledge.',
      type: ['Educational', 'Role-Playing'],
      members: [{ id: 3, name: 'Mage1' }]
    }
  ];

  yourGuilds = [
    {
      name: 'My Custom Guild',
      description: 'A guild I created for my adventures.',
      type: ['Role-Playing', 'Social', 'Educational'],
      members: [{ id: 4, name: 'Me' }]
    }
  ];

  joinedGuilds = [
    {
      name: 'Dragon Slayers',
      description: 'A guild dedicated to hunting dragons and protecting villages.',
      type: ['Competitive', 'Role-Playing', 'Social'],
      members: [{ id: 1, name: 'Hero1' }, { id: 2, name: 'Hero2' }, { id: 5, name: 'Me' }]
    }
  ];

  constructor(private fb: FormBuilder) {
    this.guildForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      types: this.fb.array(this.recommendedTypes.map(() => false)),
      acceptTerms: this.fb.array(this.acceptTerms.map(() => false)),
      notificationPreference: ['email', Validators.required]
    });
  }

  createGuild() {
    const formValue = this.guildForm.value;
    const selectedTypes = this.recommendedTypes.filter((type, index) => formValue.types[index]);

    const guildData = {
      ...formValue,
      types: selectedTypes
    };

    console.log('Creating guild:', guildData);
    // Implementation for creating a guild
  }

  formatGuildType(type: any): string {
    return Array.isArray(type) ? type.join(', ') : type;
  }

  joinGuild(guild: any) {
    console.log('Joining guild:', guild.name);
    // Implementation for joining a guild
  }

  enterGuild(guild: any) {
    console.log('Entering guild:', guild.name);
    // Implementation for entering a guild
  }
}
