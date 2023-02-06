import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {

  baseUrl = environment.baseUrl;
  constructor(
    private httpService: HttpClient,
  ) { }

  saveUser(user: User): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    if (user.UserId)
      return this.httpService.put<User>(this.baseUrl + '/user/UpdateUser', JSON.stringify(user), httpOptions);
    else
      return this.httpService.post<User>(this.baseUrl + '/user/SaveUser', JSON.stringify(user), httpOptions);
  }

  getUsers(): Observable<Array<User>> {
    return this.httpService.get<Array<User>>(this.baseUrl + '/user/GetUsers');
  }

  deleteUser(id: number): Observable<any> {
    return this.httpService.delete<any>(this.baseUrl + '/user/deleteUser/' + id);
  }
}
