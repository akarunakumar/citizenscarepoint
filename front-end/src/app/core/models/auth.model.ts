export interface RegisterPayload {
  name: string;
  email: string;
  mobile: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  name: string;
  email: string;
}

export interface Session {
  token: string;
  name: string;
  email: string;
}
