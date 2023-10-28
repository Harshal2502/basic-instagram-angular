import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api-service.service';
import { ToastService } from '../services/toast-service.service';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../services/loginservice.service';
import { SignupService } from '../services/signup.service';
import { OtpService } from '../services/otp.service';
import { USER_ALERTS } from '../utils/constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  fullName: string = '';
  phoneNumber: string = '';
  email: string = '';
  alertStr: string = '';
  otp: string = '';
  score: number = 0;
  passwordCheck: boolean = false;
  otpBool: boolean = false;

  a: boolean = false;
  b: boolean = false;
  c: boolean = false;
  d: boolean = false;

  constructor(
    private router: Router,
    private API: ApiService,
    private toast: ToastService,
    private cookies: CookieService,
    private loginService: LoginService,
    private signupService: SignupService,
    private otpService: OtpService
  ) {}

  async validUsername() {
    try {
      const res = await this.API.validUsername(this.username);
    } catch (err: any) {
      this.toast.showInfo(err.error.message);
      if (err.response.status !== 200) {
        this.toast.showInfo(USER_ALERTS.USERNAME_NOT_AVAILABLE);
        return;
      }
    }
  }

  async generateOtp() {
    const res = await this.otpService.generateOTP(this.email);
    if (res.sent !== true) {
      this.toast.showInfo(USER_ALERTS.ERROR);
      return;
    }
  }

  async signupAfterOtp(transactionId: any) {
    try {
      const res1 = await this.signupService.signup(
        this.username,
        this.password,
        this.email,
        transactionId
      );

      this.login();
      this.toast.showInfo(USER_ALERTS.REGISTERED);
      this.router.navigate(['/update-profile']);

      return;
    } catch (err) {
      console.log(err);
    }
  }

  async login() {
    try {
      const res = await this.loginService.login(this.username, this.password);

      if (res?.userId !== null) {
        this.cookies.set('authtoken', res.authToken);
        this.cookies.set('userid', res.userId);
        this.cookies.set('refreshToken', res.refreshToken);
      }
    } catch (err: any) {
      if (err.status !== 200) this.toast.showInfo(USER_ALERTS.LOGIN);
      this.router.navigate(['/login']);
    }
  }

  async signup() {
    if (!this.validateUsername(this.username)) {
      this.toast.showInfo(USER_ALERTS.INVALID_USERNAME);
      return;
    } else {
      this.validUsername();
    }

    if (!this.validatePassword(this.password)) {
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.toast.showInfo(USER_ALERTS.PASSWORD_UPPATED);
      return;
    }

    if (this.fullName.length >= 50) {
      this.toast.showInfo(USER_ALERTS.MAX_LENGTH);
      return;
    }

    const fullNamePattern = /^[A-Za-z\s]+$/;
    if (!fullNamePattern.test(this.fullName)) {
      this.toast.showInfo(USER_ALERTS.NO_SPECIAL_CHAR);
      return;
    }

    if (this.phoneNumber === '' && this.email === '') {
      this.toast.showInfo(USER_ALERTS.PHONE_EMAIL_REQUIRED);
      return;
    }

    this.generateOtp();
    this.otpBool = true;
  }

  async validateOTP() {
    if (this.otp == '') {
      this.toast.showInfo(USER_ALERTS.ENTER_OTP);
      return;
    }

    try {
      const res = await this.otpService.validateOTP(this.email, this.otp);
      if (res.transactionId !== null) {
        this.signupAfterOtp(res?.transactionId);
      }
    } catch (err: any) {
      this.toast.showInfo(err.error);
    }
  }

  validateUsername(username: string): boolean {
    const usernamePattern = /^[a-z_]{1,20}$/;
    return usernamePattern.test(username);
  }

  validatePassword(password: string): boolean {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#\$%\^&\*]/.test(password);
    const isLengthValid = password.length >= 8 && password.length <= 30;

    this.passwordCheck =
      hasUppercase && hasLowercase && hasSpecialChar && isLengthValid;
    if (this.passwordCheck) return true;

    this.alertStr = '';

    if (!hasUppercase) this.alertStr += 'an Uppercase character, ';
    if (!hasLowercase) this.alertStr += 'a Lowercase character, ';
    if (!hasSpecialChar) this.alertStr += 'a special character, ';
    if (!isLengthValid)
      this.alertStr += 'more than 8 and less than 30 characters';

    this.toast.showInfo(`${USER_ALERTS.PASSWORD} ${this.alertStr}`);
    return false;
  }

  calculatePasswordStrength(event: any) {
    const password = event.target.value;
    if (password == '') {
      this.score = 0;
      this.a = false;
      this.b = false;
      this.c = false;
      this.d = false;
    }

    if (password.length >= 8 && !this.a) {
      this.score += 25;
      this.a = true;
    }

    if (/[a-z]/.test(password) && !this.b) {
      this.score += 25;
      this.b = true;
    }
    if (/[A-Z]/.test(password) && !this.c) {
      this.score += 25;
      this.c = true;
    }
    if (/[!@#\$%\^&\*]/.test(password) && !this.d) {
      this.score += 25;
      this.d = true;
    }

    if (this.score > 100) {
      this.score = 100;
    }
  }
}
