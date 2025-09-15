import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Auth } from '../../../core/authentication/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(Auth);

  loginForm = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });

  isSubmitting = false;
  loginError = '';

  login() {
    if (this.loginForm.valid) {
      const { login, password } = this.loginForm.value;

      this.isSubmitting = true;
      this.loginError = '';

      this.auth.login(login!, password!)
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/');
          },
          error: () => {
            this.loginError = 'Invalid credentials';
            this.isSubmitting = false;
          },
          complete: () => {
            this.isSubmitting = false;
          }
        });
    }
  }
}
