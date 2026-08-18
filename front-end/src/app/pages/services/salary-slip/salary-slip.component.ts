import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { SalarySlipService } from '../../../core/salary-slip.service';
import { SalarySlip } from '../../../core/models/salary-slip.model';

@Component({
  selector: 'app-salary-slip',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './salary-slip.component.html'
})
export class SalarySlipComponent implements OnInit {
  private fb = new FormBuilder();
  private salarySlipService = inject(SalarySlipService);

  form = this.fb.group({
    name: ['', Validators.required],
    month: ['', Validators.required],
    basicPay: [null as number | null, [Validators.required, Validators.min(0.01)]],
    allowances: [0, [Validators.min(0)]],
    deductions: [0, [Validators.min(0)]]
  });

  history = signal<SalarySlip[]>([]);
  preview = signal<SalarySlip | null>(null);
  errorMessage = signal<string | null>(null);
  historyError = signal<string | null>(null);

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.historyError.set(null);
    this.salarySlipService.list().subscribe({
      next: (slips) => this.history.set(slips),
      error: () => this.historyError.set('Could not reach the backend. Is it running?')
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.errorMessage.set('Please fill in name, month and a valid basic pay.');
      return;
    }

    const { name, month, basicPay, allowances, deductions } = this.form.value;

    this.salarySlipService.create({
      name: name!,
      month: month!,
      basicPay: Number(basicPay),
      allowances: Number(allowances) || 0,
      deductions: Number(deductions) || 0
    }).subscribe({
      next: (slip) => {
        this.errorMessage.set(null);
        this.preview.set(slip);
        this.form.reset({ allowances: 0, deductions: 0 });
        this.loadHistory();
      },
      error: (err) => {
        this.errorMessage.set(err?.error?.message || 'The backend rejected this slip.');
      }
    });
  }

  view(slip: SalarySlip): void {
    this.preview.set(slip);
  }

  remove(id: number): void {
    this.salarySlipService.remove(id).subscribe({
      next: () => this.loadHistory(),
      error: () => this.historyError.set('Could not delete — is the backend running?')
    });
  }
}
