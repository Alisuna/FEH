import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  isLoggedInSignal = signal<boolean>(!!localStorage.getItem('auth-key'));
  role = signal<string | null>(localStorage.getItem('role'));

  constructor() {}

  set(token: string, role: string): void {
    localStorage.setItem('auth-key', token);
    localStorage.setItem('role', role);
    this.isLoggedInSignal.set(true);
    this.role.set(role);
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  remove(key: any): void {
    localStorage.removeItem(key);
    localStorage.removeItem('role');
    this.isLoggedInSignal.set(false);
    this.role.set(null);
  }

  isAdmin(): boolean {
    return this.role() === "ADMIN";
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSignal();
  }

  hasToken(): boolean {
  return !!this.get('auth-key');
}

}
