import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

import { Router } from '@angular/router';
import { LocalStorageService } from './service/local-storage-service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatDividerModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('FireEmblemHeroes');

  logout(): void {
    this.storage.remove('auth-key');
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    return this.storage.isLoggedIn();
  }

  get isAdmin(): boolean {
    return this.storage.isAdmin();
  }

  constructor(private router: Router, private storage: LocalStorageService) {}
}
