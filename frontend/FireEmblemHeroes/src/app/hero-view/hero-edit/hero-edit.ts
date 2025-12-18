import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';

import { Hero } from '../../models/hero';
import { HeroType } from '../../models/heroType';

@Component({
  selector: 'hero-edit',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatOptionModule,
    ReactiveFormsModule
  ],
  templateUrl: './hero-edit.html',
  styleUrl: './hero-edit.scss',
})
export class HeroEdit {

  @Input() hero: Hero | null = null;
  @Output() updatedHero = new EventEmitter<Hero>();

  HeroType = HeroType;

  fb = new FormBuilder();
  submitted = false;
  form = this.fb.group({
    type: [HeroType.RED as HeroType, [Validators.required]],
    level: [0, [Validators.required, Validators.min(1), Validators.max(40)]],
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    hp: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
    atk: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
    spd: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
    def: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
    res: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
  });

  ngOnChanges(changes: SimpleChanges) {
  if (changes['hero'] && this.hero) {
    this.form.patchValue({
      type: this.hero.type,
      level: this.hero.level,
      name: this.hero.name,
      hp: this.hero.hp,
      atk: this.hero.atk,
      spd: this.hero.spd,
      def: this.hero.def,
      res: this.hero.res
    });
  }
}

  onSubmit(): void {
    if (this.hero) {
      this.submitted = true;
      const updated: Hero = {
        id: this.hero.id,
        type: this.form.value.type as HeroType,
        level: Number(this.form.value.level),
        name: this.form.value.name!,
        hp: Number(this.form.value.hp),
        atk: Number(this.form.value.atk),
        spd: Number(this.form.value.spd),
        def: Number(this.form.value.def),
        res: Number(this.form.value.res)
      };
      this.updatedHero.emit(updated);
    }
  }

  get type() {
    return this.form.get('type');
  }

  get level() {
    return this.form.get('level');
  }

  get name() {
    return this.form.get('name');
  }

  get hp() {
    return this.form.get('hp');
  }

  get atk() {
    return this.form.get('atk');
  }

  get spd() {
    return this.form.get('spd');
  }

  get def() {
    return this.form.get('def');
  }

  get res() {
    return this.form.get('res');
  }
}
