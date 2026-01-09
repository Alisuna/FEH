import { Injectable, WritableSignal, signal } from '@angular/core';

import { LocalStorageService } from './local-storage-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: WritableSignal<string | null>;
  private key: string = "auth-key";

  constructor(private storage: LocalStorageService) {
    const savedToken = this.storage.get(this.key);
    this.token = signal<string | null>(savedToken);
  }

  setToken(token: string): void {
    if (!token) {
        return;
    }
    const role = this.getRoleFromToken(token) ?? '';
    this.storage.set(token, role);
    this.token.set(token);
  }

  getToken(): string | null {
    return this.token()
  }

  removeToken(): void {
    this.storage.remove(this.key);
    this.token.set(null)
  }

  logout() {
    this.token.set(null);
    this.storage.remove(this.key);
  }

  private getRoleFromToken(token: any): string | null {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log("Role: ", payload);
      return payload.role;
  }
}
