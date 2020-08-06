import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  lines = [];
  submitted = false;
  user = {
    name: '',
    email: '',
    mobile_no: '',
    insta_id: '',
    college: '',
    class: '',
    profession: '',
    date_of_birth: '',
    language: '',
    prev_assoc: '',
    prev_exp: '',
    pincode: '',
    address: '',
    city: '',
    state: '',
    gender: '',

  };




  show = false;
//  (click)="show = !show"
title = 'form';
}


