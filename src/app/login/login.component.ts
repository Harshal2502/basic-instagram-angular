import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api-service.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from '../services/toast-service.service';

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
    private API: ApiService,
    private cookies: CookieService,
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
        const res = await this.API.login(this.username, this.password);

        if (res?.userId !== null) {
          this.cookies.set('authtoken', res.authToken);
          this.cookies.set('userid', res.userId);
          this.cookies.set('refreshToken', res.refreshToken);

          this.router.navigate(['/homepage']);
        }
      } catch (err: any) {
        if (err.status === 400) this.toast.showInfo('User does not exist');
        if (err.status === 401) this.toast.showInfo('Wrong Password');
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
