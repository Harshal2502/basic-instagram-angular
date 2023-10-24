import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api-service.service';
import { CookieService } from 'ngx-cookie-service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  err1: Boolean = false;
  err2: Boolean = false;

  constructor(private router: Router, private API: ApiService, private cookies: CookieService) { }

  async login() {

    if(this.username == ''){
      this.err1 = true;
      return;
    }
    
    if(this.password == ''){
      this.err2 = true;
      return;
    }

    if(this.username != '' && this.password != '') {

      try {
        const res = await this.API.login(this.username, this.password);
        console.log(res);

        if(res?.userId !== null) {
          this.cookies.set('authtoken', res.authToken);
          this.cookies.set('userid', res.userId);
          this.cookies.set('refreshToken', res.refreshToken);
          
          this.router.navigate(['/homepage']);
        }
      }

      catch (err: any) {
        console.log(err);
        if(err.status === 400)alert("User does not exist");
        if(err.status === 401)alert("Re-check username or password");
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
