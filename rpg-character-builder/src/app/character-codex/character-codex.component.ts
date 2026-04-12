import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export interface CharacterCodex {
  name: string;
  age: number;
  race: string;
  class: string;
  homeWorld: string;
  abilities: string;
  funfact: string;
  morelore: string;
  characterImage: string;
}

@Component({
  selector: 'app-character-codex',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="codex-page">
      <h1>Character Codex</h1>
      <p class="codex-intro">
        Explore our selections of characters from our main story line from the world of Eartha and
        beyond. Choose to learn more about their background, their abilities, and their unique
        characteristics. Join their stories to discover secrets, earn rewards, and unlock new
        adventures.
      </p>

      <ul class="premade-character-list">
        @for (item of characterCodexList; track item.name) {
          <li class="premade-character-profile">
            <article class="card character-card">
              <h3>{{ item.name }}</h3>
              <p><strong>Age:</strong> {{ item.age }}</p>
              <p><strong>Race:</strong> {{ item.race }}</p>
              <p><strong>Class:</strong> {{ item.class }}</p>
              <p><strong>Home World:</strong> {{ item.homeWorld }}</p>
              <p><strong>Abilities:</strong> {{ item.abilities }}</p>
              <p><strong>Fun Fact:</strong> {{ item.funfact }}</p>
              <a [href]="item.morelore" target="_blank" rel="noopener noreferrer">Learn More</a>
              <img [src]="item.characterImage" [alt]="item.name + ' image'">
            </article>
          </li>
        }
      </ul>
    </section>
  `,
  styles: [`
  .codex-page {
    padding: 1rem;
    color: #ffffff;
  }

  .codex-intro {
    max-width: 70ch;
    margin: 0 0 1.5rem;
    color: #e8def6;
    line-height: 1.7;
  }

  .premade-character-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    list-style-type: none;
    padding: 0;
    margin: 1.5rem 0 0;
  }

  .premade-character-profile {
    min-width: 0;
  }

  .card {
    height: 100%;
    padding: 20px;
    background: linear-gradient(180deg, rgba(23, 10, 41, 0.96) 0%, rgba(10, 10, 18, 0.98) 100%);
    border: 1px solid #b785ff;
    border-radius: 12px;
    box-shadow:
      0 0 10px rgba(183, 133, 255, 0.35),
      0 0 20px rgba(153, 92, 255, 0.2),
      inset 0 0 12px rgba(183, 133, 255, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  }

  .card:hover {
    transform: translateY(-4px);
    border-color: #d2b0ff;
    box-shadow:
      0 0 14px rgba(183, 133, 255, 0.55),
      0 0 28px rgba(153, 92, 255, 0.3),
      inset 0 0 16px rgba(183, 133, 255, 0.14);
  }

  .card h3 {
    margin: 0 0 0.9rem;
    font-family: 'Montserrat', sans-serif;
    color: #d7b6ff;
    text-shadow: 0 0 2px #2d0e58, 0 0 6px rgba(183, 133, 255, 0.6);
  }

  .card p {
    margin: 0 0 0.75rem;
    color: #f4ecff;
    line-height: 1.55;
  }

  .card strong {
    color: #bb771e;
  }

  .card img {
    width: 100%;
    max-height: 220px;
    object-fit: cover;
    border-radius: 6px;
    margin-top: 1rem;
    border: 1px solid rgba(183, 133, 255, 0.45);
    background-color: #000000;
  }

  .card a {
    display: inline-block;
    margin-top: 0.5rem;
    padding: 0.55rem 1rem;
    border-radius: 6px;
    background-color: #8a3e9b;
    border: 1px solid #b785ff;
    color: #ffffff;
    text-decoration: none;
    font-family: 'Lato', sans-serif;
    box-shadow: 0 0 6px rgba(183, 133, 255, 0.35);
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  .card a:hover {
    background-color: #6b2e7a;
    box-shadow: 0 0 10px rgba(183, 133, 255, 0.65);
  }

  @media (max-width: 768px) {
    .codex-page {
      padding: 0.5rem 0;
    }

    .card {
      padding: 16px;
    }
  }
  `
  ]
})
export class CharacterCodexComponent {
  characterCodexList: CharacterCodex[] = [
      {
        "name": "Kira Kurai",
        "age": 25,
        "race": "Kurai Demon",
        "class": "Swordsman",
        "homeWorld": "Eartha",
        "abilities": "Quick pull, fast reflexes, high agility, fast regeneration, eternal life and the ability to grant eternal life to others.",
        "funfact": "Kira is one of the last known recorded Kurai Demon, a rare and powerful race that was once a full clan with powerful members. Kira has a mysterious dark path and a link of causing the extinction of the Kurai Clan. Only playing her story will unlock the truth.",
        "morelore": "https://www.eartha.com/characters/kira-kurai",
        "characterImage": "assets/images/characters/kira-kurai.png"
      },

      {
        "name": "Satashee Naomi",
        "age": 60,
        "race": "Once Human, now a shape shifter",
        "class": "Mage",
        "homeWorld": "Eartha",
        "abilities": "Shape shifting into a wolf, enhanced senses, high agility, and the ability to perform spells of binding.",
        "funfact": "Satashee Naomi was once human who often did special quests for the gods, high ranking officials and royalty around Eartha. He was known for his intricate binding spells which can bind anything from a simple object to a powerful being. He lost his humanity once encountering a Kurai Demon named Kira Kurai. After the encounter he gained eternal life which turned him back into is adult youth looking like he is 25, and gave him the ability to shape shift into a wolf. He works side by side with Kira Kurai as a mentor, a guide, and a friend. He is on the path to change a hidden threat to Eartha while also trying to save his poor sick wife.",
        "morelore": "https://www.eartha.com/characters/satashee-naomi",
        "characterImage": "assets/images/characters/satashee-naomi.png"
      },

      {
        "name": "Bonbori Miyazaki",
        "age": 1000,
        "race": "Celestial Guardian Kitsune",
        "class": "Celestial Guardian",
        "homeWorld": "Drydan",
        "abilities": "At night: Immortality, high agility, enhanced senses, and the ability to perform powerful celestial magic. During the day: Appears child-like, vulnerable, high agility, wind elemental magic, purification magic, and acrobatics. Bonbori's true form is a giant nine-tailed fox with immense power.",
        "funfact": "Bonbori Miyazaki is a legendary royal figure from the spirit world of Drydan. The spirit world is attached to Eartha, and it is a relm that Bonbori protects as a celestial guardian. She goes between the spirit world and Earthat to purify tainted beings, monsters, spirits and gods. She is a powerful being who has lived for many years as the lead of her Kitsune clan of celesitals. Recently, Bonbori has encountered a terrible threat to the spirit world and Eartha. With the spirit king gone missing, a unruly figure made their way into Drydan and cursed Bonbori. At night Bonbori is her usual self, but during the day she turns child like and more vulnerable. She will seek out the Gayan Heavenly Ward for assistance and meet Kira Kurai Demon and a Shapeshifting Mage on her journey.",
        "morelore": "https://www.eartha.com/characters/bonbori-miyazaki",
        "characterImage": "assets/images/characters/bonbori-miyazaki.png"
      },

      {
        "name": "Maya Yuki",
        "age": 2000,
        "race": "Gayan",
        "class": "Gayan Heavenly Ward Commander",
        "homeWorld": "Gayan Heavenly Ward",
        "abilities": "Immortality, high agility, light magic, battle tactics, weapons master, and the ability to spot the truth.",
        "funfact": "Maya Yuki is the commander of the Gayan Heavenly Ward, a place where the heavenly race recides and even the gods. She is a powerful being who has lived many years being amongst the wars happening on Eartha. While Eartha runs, she is watching over the world and its inhabitants. She responds to the gods and their wishes. Whatever the gods command she works to achieve it. Maya Yuki is now often investigating any issues or threats happening within Eartha that poses a threat to the balance. The Spirit king has gone missing and there is a new threat to Eartha that has disrupted the balance. Maya Yuki will seek out assistance from a powerful Kurai Demon, a ShapeShifting Mage, and a Cursed Celesital Guardian to help find the cause of all these problems.",
        "morelore": "https://www.eartha.com/characters/maya-yuki",
        "characterImage": "assets/images/characters/maya-yuki.png"
      },

      {
        "name": "Mimoskei Yamamoto",
        "age": 40,
        "race": "Shapeshifter",
        "class": "Shapeshifting Rogue",
        "homeWorld": "Eartha",
        "abilities": "Shape shifting into any animal form, enhanced senses, high agility, and the ability to perform stealthy asssassinations.",
        "funfact": "Mimoskei Yamamoto is a skilled shapeshifter part of Yamamoto clan, a clan of shapeshifters who are known for their stealth, crafting, and assassination skills. Mimoskei is a prince of the clan, and often is helping with training, creating unique armor, and talking on special tasks to help the clan grown and prosper. He is very close to his people, they are his family. He will encounter a powerful Kurai Demon, a Shapeshifting Mage, and a Cursed Celesital Guardian to help them on their journey.",
        "morelore": "https://www.eartha.com/characters/mimoskei-yamamoto",
        "characterImage": "assets/images/characters/mimoskei-yamamoto.png"
      },

      {
        "name": "Stella Winkle",
        "age": 25,
        "race": "Secret",
        "class": "Witch Librarian",
        "homeWorld": "Eartha",
        "abilities": "Portal creation, spell casting, high intelligence, and the ability to read and understand any language.",
        "funfact": "Stella Winkle is a pure mystery, she does not reveal too much about her past, but those that do know her understands that she is a polite witch who watches Eartha's largest library at the Monarch Kingdom. The library is home to a vast vareity of books and archives. Within the library their is also portals that can transport others into different locations around Eartha, to the Gayan Heavenly Ward, and even to the spirit world of Drydan. Though the access is difficult to get out of stella, she might be able to help a powerful Kurai Demon, a Shapeshifting Mage, and a Cursed Celestial Guardian on their journey.",
        "morelore": "https://www.eartha.com/characters/stella-winkle",
        "characterImage": "assets/images/characters/stella-winkle.png"
      },

      {
        "name": "Shi Toki",
        "age": 1000000000000000,
        "race": "Grim Reaper of Time",
        "class": "Time Manipulator, Guardian of Time, Keeper of Life and Death",
        "homeWorld": "Underworld",
        "abilities": "Time manipulation, immortality, high intelligence, and the ability to control life and death.",
        "funfact": "Shi Toki is one of the oldest and talented Grim Reapers in the Underworld. The Underworld is a relam connected to Eartha, and it is the pure opposite of the Gayan Heavenly Ward. Instead of being the beginning of life, it is a place of end. Shi Toki is a guardian, a servant, a time keeper, and a guide to souls that are passing on. He is a powerful being who has lived for many years, and has seen the rise and fall of many civilizations. He is often watching over Eartha and its inhabitants, and he is aware of the new threat that has disrupted the balance of Eartha. He might know something about the Spirit King's disappearance, and he might be able to help a powerful Kurai Demon, a Shapeshifting Mage, and a Cursed Celestial Guardian to their journey.",
        "morelore": "https://www.eartha.com/characters/shi-toki",
        "characterImage": "assets/images/characters/shi-toki.png"
      },

      {
        "name": "Nami Hoshizora",
        "age": 18,
        "race": "Elementalist",
        "class": "Multi-Elemental Mage",
        "homeWorld": "Eartha",
        "abilities": "Control over multiple elements (fire, water, earth, air), high intelligence, and the ability to perform powerful elemental spells.",
        "funfact": "Nami Hoshizora is a talented young mage who has the rare ability to control multiple elements. She would be a prodigy in the world of magic, but she has been spending most of her time on a island surrounded by water with her village. She has a chieftan father, a mother who passed away, and a whole village of people who are like family. Together, the village works together to fish, trade with other villages on Eartha, and protect each other. Nami has a lot of talent for Elemental Magic, but she has not been been able to use it to its full potential. Recently, her island was invaded by strange people in dark cloaks. They caused a powerful storm that ripped through the island and caused most of its inhabitants to be taken away or flee. Nami barely escaped and runs into a shape shifter named Mimoskei Yamamoto. He saves her life and both encounter a powerful Kurai Demon, a Cursed Celestial Guardian, and a Shapeshifting Mage. Together they will try to find out who is behind the attack on Nami's island, and if it is connected to the new threat on Eartha.",
        "morelore": "https://www.eartha.com/characters/nami-hoshizora",
        "characterImage": "assets/images/characters/nami-hoshizora.png"
      },

      {
        "name": "Celine Arashi",
        "age": 30,
        "race": "Half-Gayan, Half-Human",
        "class": "Gayan-Human Hybrid Warrior and Bard",
        "homeWorld": "Eartha",
        "abilities": "Enhanced strength, agility, and magical abilities inherited from both Gayan and Human lineage. Can also inspire and lead others through her bardic talents.",
        "funfact": "Celine Arashi is a unique hybrid warrior who combines the strengths of both Gayan and Human heritage. She is known for her exceptional combat skills and her ability to inspire and lead others through her bardic talents. She is often spotted in taverns, shops, and even on the battlefield, where she uses her charisma and combat prowess to rally allies and turn the tide of battle. Celine has a mysterious past, and is known for her wide range of connections across each relm. She has a lot of information to share for the right price. She will encounter a powerful Kurai Demon, a Shapeshifting Mage, and a Cursed Celestial Guardian to help them on their journey.",
        "morelore": "https://www.eartha.com/characters/celine-arashi",
        "characterImage": "assets/images/characters/celine-arashi.png"
      },

      {
        "name": "Riku Takahashi",
        "age": 28,
        "race": "Human",
        "class": "Adventurer and Treasure Hunter",
        "homeWorld": "Eartha",
        "abilities": "Skilled in combat, exploration, and treasure hunting. Has a keen eye for hidden secrets and traps, and is adept at navigating dangerous environments.",
        "funfact": "Riku Takahashi is a daring adventurer and treasure hunter who has made a name for himself by exploring ancient ruins, uncovering hidden secrets, and braving dangerous environments. He is known for his resourcefulness, quick thinking, and ability to navigate treacherous terrain. Riku has a knack for finding rare artifacts and treasures, and he often takes on risky quests that others would shy away from. He will encounter a powerful Kurai Demon, a Shapeshifting Mage, and a Cursed Celestial Guardian to help them on their journey.",
        "morelore": "https://www.eartha.com/characters/riku-takahashi",
        "characterImage": "assets/images/characters/riku-takahashi.png"
      }
    ];
}
