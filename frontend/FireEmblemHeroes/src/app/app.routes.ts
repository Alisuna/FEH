import { Routes } from '@angular/router';
import { HeroView } from './hero-view/hero-view';
import { CreateHero } from './create-hero/create-hero';

export const routes: Routes = [
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },
  { path: 'heroes', component: HeroView },
  { path: 'createHero', component: CreateHero }
];
