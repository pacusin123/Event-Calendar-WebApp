import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class ErrorException implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private router: Router
  ) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(resp => {
        if (resp instanceof HttpErrorResponse) {
          if (resp.status === 200) {
            return throwError(resp.message);
          }
          if ([401, 403].includes(resp.status)) {

            this.cookieService.delete('token');
            alert("your session was expired")
            this.router.navigate(['user-login'], { queryParams: { isLogin: true } });
          } else {
            alert(resp.error);
          }
        }
        return throwError(resp);
      })
    );
  }
}
