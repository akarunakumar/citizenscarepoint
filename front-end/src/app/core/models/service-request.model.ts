export type ServiceRequestType = 'CERTIFICATE' | 'INSURANCE' | 'HOUSEKEEPING' | 'IT_SUPPORT';

export interface ServiceRequestPayload {
  serviceType: ServiceRequestType;
  name: string;
  email: string;
  phone: string;
  details: string;
}

export interface ServiceRequest extends ServiceRequestPayload {
  id: number;
  status: 'NEW' | 'IN_PROGRESS' | 'RESOLVED';
  createdAt: string;
}
