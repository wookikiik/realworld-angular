import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  private JWT_TOKEN = 'JWT_TOKEN';

  getToken(): string {
    return window.localStorage.getItem(this.JWT_TOKEN);
  }

  setToken(jwtToken: string): void {
    window.localStorage.setItem(this.JWT_TOKEN, jwtToken);
  }

  purgeToken(): void {
    window.localStorage.removeItem(this.JWT_TOKEN);
  }
}
