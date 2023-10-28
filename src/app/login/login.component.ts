import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast-service.service';
import { LoginService } from '../services/loginservice.service';
import { USER_ALERTS } from '../utils/constants';
import { CookiesService } from '../coockies.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  err1: Boolean = false;
  err2: Boolean = false;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private cookies: CookiesService,
    private toast: ToastService
  ) {}

  async login() {
    if (this.username == '') {
      this.err1 = true;
      return;
    }

    if (this.password == '') {
      this.err2 = true;
      return;
    }

    if (this.username != '' && this.password != '') {
      try {
        const res = await this.loginService.login(this.username, this.password);

        if (res?.userId !== null) {
          this.cookies.setAuthToken(res.authToken);
          this.cookies.setUserId(res.userId);
          this.cookies.setRefreshToken(res.refreshToken);

          this.router.navigate(['/homepage']);
        }
      } catch (err: any) {
        if (err.status === 400)
          this.toast.showInfo(USER_ALERTS.USER_NOT_EXISTS);
        if (err.status === 401) this.toast.showInfo(USER_ALERTS.WRONG_PASSWORD);
      }
    }
  }

  onUsernameInput() {
    this.err1 = false;
  }

  onPasswordInput() {
    this.err2 = false;
  }
}
