import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserService } from '../service/user-service';
import { User } from '../models/user';
import { UserResponse } from '../models/user-response';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserResolver implements Resolve<UserResponse> {
  constructor(private userService: UserService) {}

  resolve(): Observable<UserResponse> {
    return this.userService.getUsers();
  }
}
