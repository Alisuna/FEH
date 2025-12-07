import { Component, OnInit } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

import { Hero } from '../models/hero';
import { HeroType } from '../models/heroType';
import { HeroService } from '../service/hero-service';

@Component({
  selector: 'hero-view',
  imports: [
    MatCardModule,
    MatListModule
  ],
  providers: [HeroService],
  templateUrl: './hero-view.html',
  styleUrl: './hero-view.scss',
})
export class HeroView {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.heroService.getHeroes().subscribe(heroes => {
      console.log('HEROES RECEIVED:', heroes);
      this.heroes = heroes;
    });
  }
}
