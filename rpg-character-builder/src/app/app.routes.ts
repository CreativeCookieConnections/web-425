import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { GameComponent } from './game/game.component';
import { CharacterCodexComponent} from './character-codex/character-codex.component';
import { CharacterCreationComponent } from './character-creation/character-creation.component';
import { CharacterManagementComponent } from './character-management/character-management.component';
import { ResourcesComponent } from './resources/resources.component';
import { RpgWorldsComponent } from './rpg-worlds/rpg-worlds.component';
import { CommunityComponent } from './community/community.component';
import { GuildComponent } from './guild/guild.component';
import { NewsComponent } from './news/news.component';
import { ShopComponent } from './shop/shop.component';
import { SupportComponent } from './support/support.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'game', component: GameComponent },
  { path: 'character-codex', component: CharacterCodexComponent },
  { path: 'character-creation', component: CharacterCreationComponent },
  { path: 'character-management', component: CharacterManagementComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'rpg-worlds', component: RpgWorldsComponent },
  { path: 'community', component: CommunityComponent },
  { path: 'guild', component: GuildComponent },
  { path: 'news', component: NewsComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'support', component: SupportComponent }

];
