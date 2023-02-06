import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserLoginService {

  baseUrl = environment.baseUrl;
  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  jwtHelperService = new JwtHelperService();
  constructor(
    private httpService: HttpClient,
  ) { }

  userLogin(userName: string, password: string): Observable<any> {
    const params: HttpParams = new HttpParams()
      .append('userName', userName)
      .append('password', password);
    return this.httpService.post<any>(this.baseUrl + '/userLogin/login', null, { params });
  }

  loadUserCurrent(token: string) {
    const userInfo = token ? this.jwtHelperService.decodeToken(token) : null;
    const data = userInfo ? {
      UserId: userInfo.UserId,
      FirstName: userInfo.FirstName,
      LastName: userInfo.LastName,
      Email: userInfo.Email,
      Role: userInfo.Role
    } : null;
    this.currentUser.next(userInfo);
  }
}
