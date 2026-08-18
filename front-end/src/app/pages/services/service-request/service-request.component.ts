import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceRequestService } from '../../../core/service-request.service';
import { ServiceRequest, ServiceRequestType } from '../../../core/models/service-request.model';

const TYPE_LABELS: Record<ServiceRequestType, string> = {
  CERTIFICATE: 'Certificate Services',
  INSURANCE: 'Insurance Agents',
  HOUSEKEEPING: 'Housekeeping',
  IT_SUPPORT: 'IT Support'
};

@Component({
  selector: 'app-service-request',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './service-request.component.html'
})
export class ServiceRequestComponent implements OnInit {
  private fb = new FormBuilder();
  private serviceRequestService = inject(ServiceRequestService);
  private route = inject(ActivatedRoute);

  typeLabels = TYPE_LABELS;

  form = this.fb.group({
    serviceType: ['CERTIFICATE' as ServiceRequestType, Validators.required],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    details: ['', Validators.required]
  });

  history = signal<ServiceRequest[]>([]);
  statusMessage = signal<{ text: string; isError: boolean } | null>(null);

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const type = params.get('service') as ServiceRequestType | null;
      if (type && type in TYPE_LABELS) {
        this.form.patchValue({ serviceType: type });
      }
    });

    this.loadHistory();
  }

  loadHistory(): void {
    this.serviceRequestService.list().subscribe({
      next: (requests) => this.history.set(requests),
      error: () => { /* silent — history panel just stays empty, form still usable */ }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.statusMessage.set({ text: 'Please fill in every field.', isError: true });
      return;
    }

    const value = this.form.getRawValue();

    this.serviceRequestService.create({
      serviceType: value.serviceType!,
      name: value.name!,
      email: value.email!,
      phone: value.phone!,
      details: value.details!
    }).subscribe({
      next: () => {
        this.statusMessage.set({ text: "Request submitted. We'll be in touch.", isError: false });
        this.form.reset({ serviceType: value.serviceType });
        this.loadHistory();
      },
      error: (err) => {
        this.statusMessage.set({
          text: err?.error?.message || 'The backend rejected this request.',
          isError: true
        });
      }
    });
  }
}
