import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api-config';
import { ServiceRequest, ServiceRequestPayload } from './models/service-request.model';

@Injectable({ providedIn: 'root' })
export class ServiceRequestService {
  private http = inject(HttpClient);
  private baseUrl = `${API_BASE_URL}/api/service-requests`;

  create(payload: ServiceRequestPayload): Observable<ServiceRequest> {
    return this.http.post<ServiceRequest>(this.baseUrl, payload);
  }

  list(): Observable<ServiceRequest[]> {
    return this.http.get<ServiceRequest[]>(this.baseUrl);
  }
}
