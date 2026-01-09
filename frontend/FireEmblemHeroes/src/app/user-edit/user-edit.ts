import { Component, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

import { UserResponse } from '../models/user-response';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'user-edit',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatDividerModule
  ],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.scss',
})
export class UserEdit implements OnInit {

  users: User[] = [];
  user?: User;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.refresh();
  }

  refresh(): void {
    this.users = this.route.snapshot.data['usersData'].users || [];
  }
}
