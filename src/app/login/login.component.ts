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
        // console.log(res);

        if(res.status != 201) {
          alert("Invalid Credentials");
          return;
        }

        if(res.status == 201) {
          this.cookies.set('authtoken', res.data.authToken);
          this.cookies.set('userid', res.data.userId);
          this.cookies.set('refreshToken', res.data.refreshToken);
          
          this.router.navigate(['/homepage']);
        }
      }

      catch (err) {
        console.log(err);
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
