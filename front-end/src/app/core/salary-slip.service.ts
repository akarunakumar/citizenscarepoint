import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api-config';
import { SalarySlip, SalarySlipRequest } from './models/salary-slip.model';

@Injectable({ providedIn: 'root' })
export class SalarySlipService {
  private http = inject(HttpClient);
  private baseUrl = `${API_BASE_URL}/api/salary-slips`;

  create(payload: SalarySlipRequest): Observable<SalarySlip> {
    return this.http.post<SalarySlip>(this.baseUrl, payload);
  }

  list(): Observable<SalarySlip[]> {
    return this.http.get<SalarySlip[]>(this.baseUrl);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
