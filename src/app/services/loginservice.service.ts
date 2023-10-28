import { Injectable } from '@angular/core';
import axios from 'axios';
import { API_ROUTES } from '../utils/constants';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  async login(username: string, password: string): Promise<any> {
    try {
      const requestBody = {
        username: username,
        password: password,
      };

      return this.httpClient.post(API_ROUTES.LOGIN, requestBody).toPromise();
    } catch (error) {
      throw error;
    }
  }

}
