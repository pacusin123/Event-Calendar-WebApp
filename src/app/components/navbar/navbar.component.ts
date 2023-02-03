import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  labelLogin = 'LogIn'
  constructor(
    private cookieService: CookieService,
    public userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.login();
    this.userService.currentUser.subscribe(p=> {
      if(!p) {
        this.labelLogin = 'Login'
      } else {
        this.labelLogin = 'LogOut';
      }
    })
  }

  login() {
    const token = this.cookieService.get('token');
    this.cookieService.delete('token');    
    this.router.navigate(['user-login']);
    this.labelLogin = 'LogIn';   
  }

}
