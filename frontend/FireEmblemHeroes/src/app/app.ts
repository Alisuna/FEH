import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroView } from './hero-view/hero-view';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeroView
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('FireEmblemHeroes');
}
