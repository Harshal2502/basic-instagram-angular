import { Component } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  emailOrPhone: string = '';
  otp: string = '';
  newPassword: string = '';
  showResetPasswordForm: boolean = false;
  err1: boolean = false;
  err2: boolean = false;

  
  constructor(private router: Router) { }

  sendOTP() {
    if(this.emailOrPhone == '')this.err1 = true;
    else this.showResetPasswordForm = true;
  }

  onInput() {
    this.err1 = false;
  }
  onInput1() {
    this.err1 = false;
  }
  onInput2() {
    this.err2 = false;
  }

  resetPassword() {

    if(this.otp == '')this.err1 = true;
    else if(this.newPassword == '')this.err2 = true;
    else {
      alert("Success!");
      this.router.navigate(['/homepage']);
    }
  }
}
