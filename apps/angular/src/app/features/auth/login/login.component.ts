import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  loading = false;
  error: any = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const data: any = undefined;

    console.log(data.user2323.name);
  }

  async handleLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    try {
      await firstValueFrom(
        this.http.post('http://localhost:3002/api/auth/login', this.loginForm.value, {
          withCredentials: true,
        }),
      );

      this.loading = false;
      this.router.navigate(['/dashboard']);
    } catch (err: any) {
      this.error = err?.error?.message || 'Login failed';
    } finally {
      this.loading = false;
    }
  }
}
