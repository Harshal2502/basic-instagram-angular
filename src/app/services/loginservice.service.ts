import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ROUTES } from '../utils/constants';
import { LoginInfo } from '../model/API-data.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  async login(username: string, password: string): Promise<any> {
    try {
      const loginData = new LoginInfo(username, password);

      const response = await this.http
        .post(API_ROUTES.LOGIN, loginData)
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }
}
