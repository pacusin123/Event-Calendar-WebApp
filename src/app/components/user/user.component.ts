import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm !: FormGroup;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.data) {
      this.userForm.controls['firstName'].setValue(this.data.FirstName);
      this.userForm.controls['lastName'].setValue(this.data.LastName);
      this.userForm.controls['email'].setValue(this.data.Email);
      this.userForm.controls['username'].setValue(this.data.UserName);
      this.userForm.controls['password'].setValue(this.data.Password);
    }
  }

  createUser() {
    if (this.userForm.valid) {
      var user = this.userForm.value as User;

      if (this.data?.UserId)
        user.UserId = this.data.UserId;

      this.userService.saveUser(user).subscribe({});
      this.userForm.reset();
      this.dialogRef.close('save');
    }
  }

}
