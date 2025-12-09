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

  isAdmin = signal(false);
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
        // Update erfolgreich, jetzt Array refreshen
        this.refresh();
        // Optional: selectedHero auf den neuen Hero setzen
        this.selectedHero.set(hero);
        this.isAdmin.set(false)
      },
      error: (err) => {
        console.error('Update fehlgeschlagen', err);
      }
    });
  }

  handleToggleAdmin(): void {
    this.isAdmin.update(v => !v)
  }
}
