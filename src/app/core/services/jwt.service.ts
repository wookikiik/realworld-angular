import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  getToken(): string {
    return window.localStorage.getItem('jwtToken') || null;
  }

  setToken(jwtToken: string): void {
    window.localStorage.setItem('jwtToken', jwtToken);
  }

  destroyToken(): void {
    window.localStorage.removeItem('jwtToken');
  }
}
