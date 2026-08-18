import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private fb = new FormBuilder();
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  statusMessage = signal<{ text: string; isError: boolean } | null>(null);

  submit(): void {
    if (this.form.invalid) {
      this.statusMessage.set({ text: 'Please check your email and password.', isError: true });
      return;
    }

    const { email, password } = this.form.value;

    this.authService.loginUser(
      { email: email!, password: password! },
      () => {
        this.statusMessage.set({ text: 'Login successful. Redirecting…', isError: false });
        setTimeout(() => this.router.navigateByUrl('/'), 800);
      },
      (message) => this.statusMessage.set({ text: message, isError: true })
    );
  }
}
