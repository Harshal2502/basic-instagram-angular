import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ROUTES } from '../utils/constants';
import { ContactInfo, LoginInfo, SignupData } from '../model/API-data.model';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient) {}

  async signup(
    username: string,
    password: string,
    email: string,
    transactionId: any
  ): Promise<any> {
    try {
      const signupData = new SignupData(
        new LoginInfo(username, password),
        new ContactInfo(email),
        transactionId
      );

      const response = await this.http
        .post(API_ROUTES.SIGNUP, {
          loginInfo: {
            username: username,
            password: password,
          },
          contactInfo: {
            email: email,
          },
          transactionId: transactionId,
        })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }
}
