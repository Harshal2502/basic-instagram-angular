import { Injectable } from '@angular/core';
import axios from 'axios';
import { API_ROUTES } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor() { }

  async validateOTP(email: string, otp: any) {
    try {
      const response = await axios.post(API_ROUTES.VALIDATE_OTP, {
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

  async generateOTP(email: string) {
    try {
      const response = await axios.post(API_ROUTES.GENERATE_OTP, {
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

}
