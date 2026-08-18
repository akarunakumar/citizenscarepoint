import { Injectable } from '@angular/core';
import { ServiceItem } from './models/service.model';

@Injectable({ providedIn: 'root' })
export class ServiceCatalogService {
  private readonly items: ServiceItem[] = [
    {
      id: 'salary-slip',
      name: 'Salary Slip Generator',
      description: 'Generate a salary slip instantly and keep a short history of recent slips.',
      seal: 'S',
      status: 'available',
      fragment: 'salary-slip-tool'
    },
    {
      id: 'gst-calculator',
      name: 'GST Calculator',
      description: 'Work out GST-inclusive and GST-exclusive amounts for your invoices and purchases, instantly.',
      seal: 'G',
      status: 'available',
      fragment: 'gst-calculator-tool'
    },
    {
      id: 'freshers-hub',
      name: "Freshers' Career Hub",
      description: 'Tutorials to get started, plus practice interview questions from top companies.',
      seal: 'F',
      status: 'available',
      fragment: 'freshers-hub-tool'
    },
    {
      id: 'insurance-agents',
      name: 'Insurance Agents',
      description: 'Connect with verified insurance agents for life, health and vehicle insurance guidance.',
      seal: 'I',
      status: 'available',
      fragment: 'service-request-tool',
      requestType: 'INSURANCE'
    },
    {
      id: 'it-support',
      name: 'IT Support for Developers',
      description: 'Get help and mentorship for Java and full-stack development.',
      seal: 'D',
      status: 'available',
      fragment: 'service-request-tool',
      requestType: 'IT_SUPPORT'
    },
    {
      id: 'housekeeping',
      name: 'Housekeeping Services',
      description: 'Request trusted housekeeping help for your home or office.',
      seal: 'H',
      status: 'available',
      fragment: 'service-request-tool',
      requestType: 'HOUSEKEEPING'
    },
    {
      id: 'certificate-services',
      name: 'Certificate Services',
      description: 'Apply for caste certificates, income certificates and other commonly needed government certifications.',
      seal: 'C',
      status: 'available',
      fragment: 'service-request-tool',
      requestType: 'CERTIFICATE'
    },
    
  ];

  getAll(): ServiceItem[] {
    return this.items;
  }
}
