import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from './api-config';
import { AuthResponse, LoginPayload, RegisterPayload, Session } from './models/auth.model';

const SESSION_KEY = 'ccp_session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = `${API_BASE_URL}/api/auth`;

  // Signal-based session state — the header component reacts to this
  // automatically, no manual DOM updates needed (replaces the old
  // updateHeaderAuthUI() pattern from vanilla auth.js).
  private sessionSignal = signal<Session | null>(this.readStoredSession());

  session = this.sessionSignal.asReadonly();
  isLoggedIn = computed(() => this.sessionSignal() !== null);

  private readStoredSession(): Session | null {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  private setSession(session: Session): void {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    this.sessionSignal.set(session);
  }

  registerAndLogin(payload: RegisterPayload, onSuccess: () => void, onError: (msg: string) => void): void {
    this.http.post<AuthResponse>(`${this.baseUrl}/register`, payload).subscribe({
      next: (res) => {
        this.setSession({ token: res.token, name: res.name, email: res.email });
        onSuccess();
      },
      error: (err) => onError(err?.error?.message || 'Registration failed.')
    });
  }

  loginUser(payload: LoginPayload, onSuccess: () => void, onError: (msg: string) => void): void {
    this.http.post<AuthResponse>(`${this.baseUrl}/login`, payload).subscribe({
      next: (res) => {
        this.setSession({ token: res.token, name: res.name, email: res.email });
        onSuccess();
      },
      error: (err) => onError(err?.error?.message || 'Login failed.')
    });
  }

  logout(): void {
    localStorage.removeItem(SESSION_KEY);
    this.sessionSignal.set(null);
  }

  getToken(): string | null {
    return this.sessionSignal()?.token ?? null;
  }
}
