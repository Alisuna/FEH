import { Component, Input, Output, EventEmitter } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

import { Hero } from '../../models/hero';
import { HeroType } from '../../models/heroType';

@Component({
  selector: 'hero-detail',
  imports: [
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './hero-detail.html',
  styleUrl: './hero-detail.scss',
})
export class HeroDetail {

  @Input() hero: Hero | null = null;
  @Output() toggleAdmin = new EventEmitter<void>();

  toggle(): void {
    this.toggleAdmin.emit();
  }

}
