import { Component, OnInit, signal } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';

import { Hero } from '../models/hero';
import { HeroType } from '../models/heroType';
import { HeroService } from '../service/hero-service';
import { HeroDetail } from './hero-detail/hero-detail';
import { HeroEdit } from './hero-edit/hero-edit';

@Component({
  selector: 'hero-view',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatDividerModule,
    HeroEdit,
    HeroDetail
  ],
  providers: [HeroService],
  templateUrl: './hero-view.html',
  styleUrl: './hero-view.scss',
})
export class HeroView {

  updated = signal(false);
  disabled = signal(false);
  selectedHero = signal<Hero | null>(null);
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.refresh();
  }

  refresh(): void {
    this.heroService.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
    });
  }

  heroSelected(hero: Hero): void {
    this.selectedHero.set(hero);
  }

  updateHero(updatedHero: Hero): void {
    this.heroService.updateHero(updatedHero).subscribe({
      next: (hero) => {
        this.refresh();
        console.log('Hero updated', hero);
      },
      error: (err) => {
        console.error('Update fehlgeschlagen', err);
      }
    });
    this.toggleHeroButtons();
  }

  toggleHeroButtons(): void {
    this.disabled.update(v => !v);
    this.updated.update(v => !v);
    console.log(this.updated());

  }

}
