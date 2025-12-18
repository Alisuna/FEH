import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';

@Injectable({
  providedIn: 'root',
})
export class IntegrationService {

  login(request: LoginRequest) {
    console.log('login');
  }

}
