import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { Request } from '../models/request';

import { IntegrationService } from '../service/integration-service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../service/local-storage-service';

@Component({
  selector: 'app-register',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

    request: Request = {};
    hide = signal(true);

    fb = new FormBuilder();
    form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*\\d).+$')]]
    });

    register() {
      this.request.username = this.form.value.username!;
      this.request.password = this.form.value.password!;

      this.integration.register(this.request).subscribe({
        next: (response) => {
          console.log('Registered: ', response.token);
          this.form.reset();
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Failed to log in', err);
        }
      });
    }

    clickEvent(event: MouseEvent): void {
      this.hide.update(v => !v);
      event.stopPropagation();
    }

    login(): void {
      this.router.navigate(['/login']);
    }

    get username() {
      return this.form.get('username');
    }

    get password() {
      return this.form.get('password');
    }

    constructor(private integration: IntegrationService, private router: Router, private storage : LocalStorageService) {}
  }
