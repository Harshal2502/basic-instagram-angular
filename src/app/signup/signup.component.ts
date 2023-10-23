import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api-service.service';

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
  otp: string = '';
  email: string = '';
  alertStr: string = '';
  score: number = 0;
  passwordCheck: boolean = false;
  otpBool: boolean = false;

  a: boolean = false;
  b: boolean = false;
  c: boolean = false;
  d: boolean = false;

  constructor(private router: Router, private API: ApiService) {}

  async signup() {
    if (!this.validateUsername(this.username)) {
      alert('invalid username');
      return;
    } else {
      try {
        const res = await this.API.validUsername(this.username);

        if (res.status != 200) {
          alert('Username not available');
          return;
        }
      } catch (err) {
        console.log('VALIDATE USERNAME API CALL: ' + err);
      }
    }

    if (!this.validatePassword(this.password)) {
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (this.fullName.length >= 50) {
      alert('max length of fullname should be 50');
      return;
    }

    const fullNamePattern = /^[A-Za-z\s]+$/;
    if (!fullNamePattern.test(this.fullName)) {
      alert('Full Name can only contain letters and spaces.');
      return;
    }

    if (this.phoneNumber === '' && this.email === '') {
      alert('Phone numer or Email is required');
      return;
    }

    this.otpBool = !this.otpBool;

    const res = await this.API.generateOTP(this.email);
    console.log(res);

  }

  async validateOTP() {
    if(this.otp == '')  {
      alert("Enter OTP to Proceed");
      return;
    }

    const res = await this.API.validateOTP(this.email, this.otp);
    console.log(res);
    
    if(res.status === 200) {
      const transactionId = res.data.transactionId;

      const res1 = await this.API.signup(this.username, this.password, this.email, transactionId);
      console.log(res1);

      if(res1.status === 201) {
        this.router.navigate(['/update-profile']);
        return;
      } 
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

    alert(`Password must contain ${this.alertStr}`);
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
