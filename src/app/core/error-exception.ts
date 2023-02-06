import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { catchError, Observable, throwError } from "rxjs";
import { UserLoginService } from "../services/user-login.service";
import { UserService } from "../services/user.service";

@Injectable()
export class ErrorException implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private userLoginService: UserLoginService,
    private router: Router
  ) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError(resp => {
        if (resp instanceof HttpErrorResponse) {
          switch (resp.status) {
            case 0:
              alert('can`t connect to server');
              break;
            case 200:
              break;
            case 400:
              alert(resp.error.title)
              break;
            case 401:
              this.cookieService.delete('token');
              this.userLoginService.currentUser.next(null);
              alert("your session was expired")
              this.router.navigate(['user-login'], { queryParams: { isLogin: true } });
              break;
            case 403:
              alert("Access denied")
              this.router.navigate(['home']);
              break;
            case 500:
              alert(resp.error);
              break;

            default:
              break;
          }
        }
        return throwError(resp);
      })
    );
  }
}
