import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserLoginService } from 'src/app/services/user-login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  labelLogin = 'LogIn'
  constructor(
    private cookieService: CookieService,
    public userLoginService: UserLoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.login(true);
    this.userLoginService.currentUser.subscribe(p => {
      if (!p) {
        this.labelLogin = 'Login'
      } else {
        this.labelLogin = 'LogOut';
      }
    })
  }

  login(isLogin: boolean) {
    this.cookieService.delete('token');
    this.userLoginService.currentUser.next(null);
    this.router.navigate(['user-login'], { queryParams: { isLogin: isLogin } });
  }

}
