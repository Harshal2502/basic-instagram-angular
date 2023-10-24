import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api-service.service';

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

  constructor(private router: Router, private API: ApiService) { }

  async login() {
    if(this.username == '')this.err1 = true;
    if(this.password == '')this.err2 = true;

    if(this.username != '' && this.password != '') {

      try {
        const res = await this.API.login(this.username, this.password);
        console.log(res);
      }

      catch (err) {
        console.log("LOGIN API ERROR: " + err);
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
