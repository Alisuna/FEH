import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';

import { Hero } from '../../models/hero';
import { HeroType } from '../../models/heroType';

@Component({
  selector: 'hero-edit',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './hero-edit.html',
  styleUrl: './hero-edit.scss',
})
export class HeroEdit {

  @Input() hero: Hero | null = null;
  @Output() updatedHero = new EventEmitter<Hero>();

  fb = new FormBuilder();
  submitted = false;
  form = this.fb.group({
    type: [this.hero?.type, [Validators.required]],
    level: [this.hero?.level, [Validators.required]],
    name: [this.hero?.name, [Validators.required]],
    hp: [this.hero?.hp, [Validators.required]],
    atk: [this.hero?.atk, [Validators.required]],
    spd: [this.hero?.spd, [Validators.required]],
    def: [this.hero?.def, [Validators.required]],
    res: [this.hero?.res, [Validators.required]],
  });

  onSubmit(): void {
    if (this.hero) {
      const updated: Hero = {
        id: this.hero.id,
        type: this.form.value.type!,
        level: this.form.value.level!,
        name: this.form.value.name!,
        hp: this.form.value.hp!,
        atk: this.form.value.atk!,
        spd: this.form.value.spd!,
        def: this.form.value.def!,
        res: this.form.value.res!
      };
      this.updatedHero.emit(updated);
    }
  }

}
