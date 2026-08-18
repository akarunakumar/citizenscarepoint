import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ContactMessageService } from '../../core/contact-message.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  private fb = new FormBuilder();
  private contactMessageService = inject(ContactMessageService);

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  statusMessage = signal<{ text: string; isError: boolean } | null>(null);

  submit(): void {
    if (this.form.invalid) {
      this.statusMessage.set({ text: 'Please fix the highlighted fields.', isError: true });
      return;
    }

    const { name, email, phone, message } = this.form.value;

    this.contactMessageService.create({
      name: name!,
      email: email!,
      phone: phone!,
      message: message!
    }).subscribe({
      next: () => {
        this.statusMessage.set({ text: 'Message received. Thank you — we\'ll get back to you.', isError: false });
        this.form.reset();
      },
      error: () => {
        this.statusMessage.set({ text: 'Could not reach the backend. Is it running?', isError: true });
      }
    });
  }
}
