import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ModalMessageComponent } from 'src/app/core/modal-message/modal-message.component';
import { User } from 'src/app/models/user';
import { UserLoginService } from 'src/app/services/user-login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  userForm !: FormGroup;
  userName!: string;
  password!: string;
  user: User;
  isLogin!: boolean;
  constructor(
    private userLoginService: UserLoginService,
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService,
    private dialog: MatDialog,
    private routerActive: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.user = new User({});
  }
  ngOnInit(): void {
    // this.userName = 'marco';
    // this.password = '123';
    // this.userLogin();
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.routerActive.queryParams.subscribe(params => {
      this.isLogin = (params['isLogin'] === "true");
    });
  }

  userLogin() {
    this.userLoginService.userLogin(this.userName, this.password).subscribe(p => {
      if (p.token) {
        this.cookieService.set('token', p.token);
        this.userLoginService.loadUserCurrent(p.token);
        this.router.navigate(['home'])
      } else {
        alert("Your credentials are incorrects, please try again")
      }
    })
  }

  createUser() {
    if (this.userForm.valid) {
      var user = this.userForm.value as User;
      this.userService.saveUser(user).subscribe(() => {
        alert("User saved successfull!")
        this.userForm.reset();
        this.isLogin = true;
      })
    } else {
      alert("fill in the required fields *")
    }

  }
}
