import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

interface GstResult {
  base: number;
  gst: number;
  total: number;
}

@Component({
  selector: 'app-gst-calculator',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './gst-calculator.component.html'
})
export class GstCalculatorComponent {
  private fb = new FormBuilder();

  form = this.fb.group({
    amount: [null as number | null, [Validators.required, Validators.min(0)]],
    rate: [null as number | null, [Validators.required, Validators.min(0)]],
    mode: ['exclusive' as 'exclusive' | 'inclusive']
  });

  result = signal<GstResult | null>(null);
  errorMessage = signal<string | null>(null);

  calculate(): void {
    if (this.form.invalid) {
      this.errorMessage.set('Please enter a valid amount and GST rate.');
      this.result.set(null);
      return;
    }

    const { amount, rate, mode } = this.form.value;
    const a = Number(amount);
    const r = Number(rate);

    let computed: GstResult;
    if (mode === 'exclusive') {
      const gst = (a * r) / 100;
      computed = { base: a, gst, total: a + gst };
    } else {
      const base = a / (1 + r / 100);
      computed = { base, gst: a - base, total: a };
    }

    this.errorMessage.set(null);
    this.result.set(computed);
  }
}
