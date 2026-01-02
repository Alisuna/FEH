import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

import { Hero } from '../../models/hero';
import { HeroType } from '../../models/heroType';
import { LocalStorageService } from '../../service/local-storage-service';

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
  @Output() toggleHeroButtons = new EventEmitter<void>();

  toggle(): void {
    this.toggleHeroButtons.emit();
  }

  get isAdmin(): boolean {
    return this.storage.isAdmin();
  }

  constructor(private storage: LocalStorageService, private router: Router) {}
}
