import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ROUTES } from '../utils/constants';
import { ContactInfo, OtpRequest } from '../model/API-data.model';

@Injectable({
  providedIn: 'root',
})
export class OtpService {
  constructor(private http: HttpClient) {}

  async validateOTP(email: string, otp: any): Promise<any> {
    try {
      const contactInfo = new ContactInfo(email);
      const otpRequest = new OtpRequest(contactInfo, 'EMAIL_OTP', otp);

      const response = await this.http
        .post(API_ROUTES.VALIDATE_OTP, {
          contactInfo: {
            email: email,
          },
          requestType: 'EMAIL_OTP',
          otp: otp,
        })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async generateOTP(email: string): Promise<any> {
    try {
      const contactInfo = new ContactInfo(email);
      const otpRequest = new OtpRequest(contactInfo, 'EMAIL_OTP');

      const response = await this.http
        .post(API_ROUTES.GENERATE_OTP, {
          contactInfo: {
            email: email,
          },
          requestType: 'EMAIL_OTP',
        })
        .toPromise();
      return response;
    } catch (error) {
      throw error;
    }
  }
}
