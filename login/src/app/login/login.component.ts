import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {LoggedUserService} from '../services/logged-user.service';
import {Funcs} from '../utility/functions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;

  constructor(private loginService: LoggedUserService, private functions: Funcs,
              private router: Router) {
  }

  onSubmit = (username: string, password: string): void => {
    this.submitted = true;
    this.loginService.signIn(username, password)
      .then(() => {
        console.log('logged in');
        this.router.navigate(['dashboard']);
    }).catch((err) => {
      this.submitted = false;
      this.functions.handleError(err.message);
    });
  }

  ngOnInit(): void {
  }

}
