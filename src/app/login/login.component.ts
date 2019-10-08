import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;
  error = '';
  registerMode = false;
  loginMode = true;
  numberOfUsers: number = null;

  constructor(private backendService: BackendService, private router: Router, private cookieService: CookieService) { }

  ngOnInit() {
    this.cookieService.deleteAll();
    this.setNumberOfUsers();
  }

  login() {
    this.backendService.login(this.userName, this.password).then(
      (loginSuccessful) => {
        if (loginSuccessful) {
          this.router.navigate(['/todos']);
        } else {
          this.error = 'Incorrect Username or Password';
        }
      }
    );
  }

  register() {
    this.backendService.registerUser(this.userName, this.password).then(
      (registerationSuccessful) => {
        if (registerationSuccessful) {
          this.router.navigate(['/todos']);
        } else {
          this.error = 'Incorrect Username or Password';
        }
      }
    );
  }

  setNumberOfUsers() {
    this.backendService.numberOfUsers().then(
      (users) => {
        this.numberOfUsers = users.count;
      }
    )
  }
}
