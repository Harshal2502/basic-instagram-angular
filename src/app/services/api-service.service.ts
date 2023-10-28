import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl =
    'https://dznsxr5s1i.execute-api.ap-south-1.amazonaws.com/develop';

  constructor(private http: HttpClient) {}

  async login(username: string, password: string): Promise<any> {
    try {
      const requestBody = {
        username: username,
        password: password,
      };

      return this.http
        .post(`${this.baseUrl}/users/login`, requestBody)
        .toPromise();
    } catch (error) {
      throw error;
    }
  }

  async validUsername(username: string) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/users/isvalidusername?username=${username}`
      );
      return response;
    } catch (err) {
      throw err;
    }
  }

  async generateOTP(email: string) {
    try {
      const response = await axios.post(`${this.baseUrl}/otp/generate`, {
        contactInfo: {
          email: email,
        },
        requestType: 'EMAIL_OTP',
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  async validateOTP(email: string, otp: any) {
    try {
      const response = await axios.post(`${this.baseUrl}/otp/validate`, {
        contactInfo: {
          email: email,
        },
        requestType: 'EMAIL_OTP',
        otp: otp,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }

  async signup(
    username: string,
    password: any,
    email: string,
    transactionId: any
  ) {
    try {
      const response = await axios.post(`${this.baseUrl}/users/signup`, {
        loginInfo: {
          username: username,
          password: password,
        },
        contactInfo: {
          email: email,
        },
        transactionId: transactionId,
      });

      return response;
    } catch (error) {
      throw error;
    }
  }
}
