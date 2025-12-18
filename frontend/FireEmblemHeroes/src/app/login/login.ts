import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { LoginRequest } from '../models/login-request';

import { IntegrationService } from '../service/integration-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  request: LoginRequest = {};

  fb = new FormBuilder();
  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  login() {
    this.request.username = this.form.value.username!;
    this.request.password = this.form.value.password!;

    this.integration.login(this.request).subscribe({
      next: (response) => {
        console.log('Logged in: ', response);
        this.form.reset();
        this.router.navigate(['/heroes']);
      },
      error: (err) => console.error('Failed to log in', err)
    });
  }

  register() {
    //this.router.navigate(['/register']);
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  constructor(private integration: IntegrationService, private router: Router) {}
}
