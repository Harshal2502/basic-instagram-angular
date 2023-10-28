import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {
  constructor(private cookies: CookieService) {}

  setAuthToken(token: string) {
    this.cookies.set('authtoken', token);
  }

  setUserId(userId: string) {
    this.cookies.set('userid', userId);
  }

  setRefreshToken(token: string) {
    this.cookies.set('refreshToken', token);
  }

  getAuthToken(): string | undefined {
    return this.cookies.get('authtoken');
  }

  getUserId(): string | undefined {
    return this.cookies.get('userid');
  }

  getRefreshToken(): string | undefined {
    return this.cookies.get('refreshToken');
  }

  clearCookies() {
    this.cookies.delete('authtoken');
    this.cookies.delete('userid');
    this.cookies.delete('refreshToken');
  }
}
