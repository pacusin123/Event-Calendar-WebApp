import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class UserService {

  url = ''
  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  jwtHelperService = new JwtHelperService();
  constructor(
    private httpService: HttpClient,
  ) { }

  saveUser(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    if (user.UserId)
      return this.httpService.put<User>('https://localhost:7124/api/user/UpdateUser', JSON.stringify(user), httpOptions);
    else
      return this.httpService.post<User>('https://localhost:7124/api/user/SaveUser', JSON.stringify(user), httpOptions);
  }

  getUsers(): Observable<Array<User>> {
    return this.httpService.get<Array<User>>('https://localhost:7124/api/user/GetUsers');
  }
  

  userLogin(userName: string, password: string): Observable<any> {
    const params: HttpParams = new HttpParams()
      .append('userName', userName)
      .append('password', password);
    return this.httpService.post<any>('https://localhost:7124/api/user/login', null, { params });
  }

  deleteUser(id: number): Observable<any> {
    return this.httpService.delete<any>('https://localhost:7124/api/user/deleteUser/' + id);
  }

  loadUserCurrent(token: string) {
    const userInfo = token ? this.jwtHelperService.decodeToken(token) : null;
    const data = userInfo ? {
      UserId: userInfo.UserId,
      FirstName: userInfo.FirstName,
      LastName: userInfo.LastName,
      Email: userInfo.Email
    } : null;
    this.currentUser.next(userInfo);
  }
}
