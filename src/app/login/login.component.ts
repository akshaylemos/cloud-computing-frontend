import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string;
  password: string;
  error = '';

  constructor(private backendService: BackendService, private router: Router) { }

  ngOnInit() {
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

}
