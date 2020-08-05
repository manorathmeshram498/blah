import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent implements OnInit {

  profileForm = this.fb.group({
    Name: this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['']
    }),

    contact: this.fb.group({
      mobilenumber: ['', Validators.required],
      instaid: ['', Validators.required]
    }),

    dob: this.fb.group({
      date: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required]
    }),

    address: this.fb.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
  });

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.profileForm.value);
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
