import { Injectable } from '@angular/core';
import axios from 'axios';
import { API_ROUTES } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor() { }

  async signup(
    username: string,
    password: any,
    email: string,
    transactionId: any
  ) {
    try {
      const response = await axios.post(API_ROUTES.SIGNUP, {
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
