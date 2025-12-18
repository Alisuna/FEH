import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';

import { Hero } from '../models/hero';
import { HeroType } from '../models/heroType';
import { HeroService } from '../service/hero-service';

import { Router } from '@angular/router';

@Component({
  selector: 'create-hero',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatOptionModule,
    ReactiveFormsModule
  ],
  providers: [HeroService],
  templateUrl: './create-hero.html',
  styleUrl: './create-hero.scss',
})
export class CreateHero {

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

  onSubmit(): void {
    this.submitted = true;
    const newHero: Hero = {
      type: this.form.value.type as HeroType,
      level: Number(this.form.value.level),
      name: this.form.value.name!,
      hp: Number(this.form.value.hp),
      atk: Number(this.form.value.atk),
      spd: Number(this.form.value.spd),
      def: Number(this.form.value.def),
      res: Number(this.form.value.res)
    };
    this.heroService.createHero(newHero).subscribe({
      next: (hero) => {
        console.log('Hero created', hero);
        this.form.reset();
        this.router.navigate(['/heroes']);
      },
      error: (err) => console.error('Failed to create hero', err)
    });
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

  constructor(private heroService: HeroService, private router: Router) {}
}
