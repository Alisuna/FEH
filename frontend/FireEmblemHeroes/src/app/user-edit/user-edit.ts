import { Component, OnInit, signal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { UserResponse } from '../models/user-response';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../service/user-service';
import { LocalStorageService } from '../service/local-storage-service';

@Component({
  selector: 'user-edit',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.scss',
})
export class UserEdit implements OnInit {

  users: User[] = [];
  username = signal<string | null>(null);

  constructor(private route: ActivatedRoute, private userService: UserService, private storage: LocalStorageService) {}

  ngOnInit() {
    this.users = this.route.snapshot.data['usersData'].users || [];
    this.username.set(this.getUsername());
    console.log(this.username());

  }

  refresh(): void {
    this.userService.getUsers().subscribe(response => {
      this.users = response.users;
    })
  }

  isAdmin(user: User): boolean {
    return user.role === "ADMIN";
  }

  toggleAdminStatus(user: User): void {
    this.userService.toggleAdminStatus(user).subscribe({
      next: (user) => {
        console.log('Status of User changed to:', user.role);
        this.refresh();
      },
      error: (err) => {
        console.error('There has always to be one Admin active', err);
      }
    });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user).subscribe({
      next: (user) => {
        console.log("User deleted with the Id:", user.id);
        this.refresh();
      },
      error: (err) => {
        console.error('There has always to be one Admin active', err);
      }
    });
  }

  getUsername(): string | null {
    const token = this.storage.get('auth-key');
    if(token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub;
    } else {
      return null;
    }
  }

}
