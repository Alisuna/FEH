import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';
import { UserResponse } from '../models/user-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>(this.baseUrl);
  }

  toggleAdminStatus(user: User): Observable<User> {
    return this.http.post<User>(
     `${this.baseUrl}/changeRole`,
     user
    );
  }

  deleteUser(user: User): Observable<User> {
    return this.http.delete<User>(
      `${this.baseUrl}/delete/${user.id}`
    )
  }

}
