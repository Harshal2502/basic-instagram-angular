import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private cookies: CookiesService,
    private toast: ToastService,
    private fb: FormBuilder, // Inject FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async login() {
    if (this.loginForm.valid) {
      try {
        const res = await this.loginService.login(
          this.loginForm.value.username,
          this.loginForm.value.password
        );

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
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
