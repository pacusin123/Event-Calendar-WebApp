import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ModalMessageComponent } from 'src/app/core/modal-message/modal-message.component';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userName!: string;
  password!: string;
  user: User;
  constructor(
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService,
    private dialog: MatDialog,
  ) {
    this.user = new User({});
  }
  ngOnInit(): void {
  }

  userLogin() {
    this.userService.userLogin(this.userName, this.password).subscribe(p => {
      this.cookieService.set('token', p.token);
      this.userService.loadUserCurrent(p.token);
      this.router.navigate(['home'])
    })
  }

  createUser() {
    this.userService.saveUser(this.user).subscribe(() => {
      this.dialog.open(ModalMessageComponent, {
        data: 'User Created',
      });
    })
  }
}
