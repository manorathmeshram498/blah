import { Component, OnInit , Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ValidatorFn} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  submitted = false;
  form: FormGroup;

  constructor(
              private router: Router,
              private snackbar: MatSnackBar,
              @Inject(FormBuilder) fb: FormBuilder) {

    this.form = fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      passwords: fb.group({
        password: ['', Validators.required],
        repeat: ['', Validators.required]
      }, {validator: this.areEqual})
    });
  }

  areEqual: ValidatorFn = (g: FormGroup) => {
    return g.get('password').value === g.get('repeat').value
      ? null : { 'mismatch ': true};
  }

  onSubmit = () => {
    this.submitted = true;

  }

  Onfail(msg?: string) {
    this.snackbar.open(msg, '', {
      duration: 3000
    });
    console.log(msg);
    this.submitted = false;
  }

  ngOnInit(): void {
  }

}
