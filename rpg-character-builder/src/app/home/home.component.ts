import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: `
    <div>
      <h1> Macrocosm </h1>
      <h2> A Quest Awaits</h2>
      <p>
       Join the Macrocosm, a realm of endless possibilities, personal choices, and limitless adventures. In this world, you control your destiny. Forge your own path, shape your character, and embark on a journey where every decision matters. Whether you seek glory, wisdom, or companionship, the Macrocosm is your canvas for storytelling and self-discovery. Are you ready to step into the unknown and create your own Legend?
        </p>

      <p> Will you accept this quest? </p>


      <div class="highlights-container">
        <div class="highlight">
          <img src="assets/DetailedCharacterCreation.png" alt="A magic circle that showcases the detailed character possiblities in a black silhouette with Detailed Character Creation font displayed."/>
          <p>
          Macrocoms offers a detailed character creation system that allows the ability to fully customize a character's appearance, background, abilities, and more. There is a wide range of options to choose from to help make your character more unique from all the rest. Several classes are available to choose from, each with changeable abilities and skills. The character creation system is designed to be intuitive, user-friendly, and continously expanding for more possibilities.
          </p>
        </div>

        <div class="highlight">
          <img src="assets/RPGEmersiveWorlds.png" alt="A magic circle that showcases different world possibilities in a black silhouette with Emersive Worlds font displayed."/>
          <p>
          Macrocoms has a vast variety of immersive worlds to explore, each with its own unique settings, lore, and challenges. From ancient civilizations to futuristic landscapes, players can choose their own destinys and embark on incredible journeys. Worlds can also be created by players, allowing for endless possibilities and creativity.
          </p>
        </div>

        <div class="highlight">
          <img src="assets/RPGTeamUp.png" alt="A magic circle that showcases the team up co-op feature in a black silhouette with Team Up font displayed."/>
          <p>
          Macrocoms offers a unique component that allows players to team up with friends and other players to embark on unique quests together. Players can join forces to tackle challenging dungeons, defeat powerful bosses, and complete quests that require teamwork and strategy. The team up feature fosters a sense of camaraderie and encourages players to collaborate and share their adventures with others. Discover worlds together, be who you want, and create unforgettable memories in the Macrocoms universe.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .highlights-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 20px;}
    
    .highlight {
    text-align: center;
    flex: 0 1 calc(33.333% - 20px);
    box-sizing: border-box;
    }
    
    .highlight img {
    max-width: 100%;
    height: auto;
    object-fit: cover;
    }

    .highlight p {
    margin-top: 10px;
    }

    .highlight:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
    }
    `
  ]
})
export class HomeComponent {

}
