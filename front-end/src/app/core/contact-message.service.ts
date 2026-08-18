import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api-config';
import { ContactMessagePayload } from './models/contact-message.model';

@Injectable({ providedIn: 'root' })
export class ContactMessageService {
  private http = inject(HttpClient);
  private baseUrl = `${API_BASE_URL}/api/contact-messages`;

  create(payload: ContactMessagePayload): Observable<unknown> {
    return this.http.post(this.baseUrl, payload);
  }
}
