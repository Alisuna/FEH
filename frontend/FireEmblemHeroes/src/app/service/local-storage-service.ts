import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  isLoggedInSignal = signal<boolean>(false);

  constructor() {}

  set(key: any, value: any): void {
    localStorage.setItem(key, value);
    this.isLoggedInSignal.set(true);
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
    this.isLoggedInSignal.set(false);
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSignal();
  }

}
