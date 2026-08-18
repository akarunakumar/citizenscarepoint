import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private fb = new FormBuilder();
  private authService = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  });

  statusMessage = signal<{ text: string; isError: boolean } | null>(null);

  submit(): void {
    const { name, email, mobile, password, confirmPassword } = this.form.value;

    if (this.form.invalid) {
      this.statusMessage.set({ text: 'Please fill in every field correctly.', isError: true });
      return;
    }
    if (password !== confirmPassword) {
      this.statusMessage.set({ text: 'Passwords do not match.', isError: true });
      return;
    }

    this.authService.registerAndLogin(
      { name: name!, email: email!, mobile: mobile!, password: password! },
      () => {
        this.statusMessage.set({ text: 'Account created. Redirecting…', isError: false });
        setTimeout(() => this.router.navigateByUrl('/'), 1000);
      },
      (message) => this.statusMessage.set({ text: message, isError: true })
    );
  }
}
