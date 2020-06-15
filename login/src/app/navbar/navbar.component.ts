import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Location } from '@angular/common';
import {LoggedUserService} from '../services/logged-user.service';
import {Funcs} from '../utility/functions';
import {AngularFirestore} from 'angularfire2/firestore';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public loginService: LoggedUserService,
              private router: Router,
              private functions: Funcs,
              private location: Location,
              private afs: AngularFirestore) {
}

logout = () => {
this.loginService.logout()
.then(() => this.router.navigate(['login']))
.catch(err => this.functions.handleError(err.message));
}

goBack(){
this.location.back();
}
quickload(){
this.afs.collection('/test').valueChanges().subscribe(() => console.log('hi hackers'));
}

  ngOnInit(): void {
  }

}
