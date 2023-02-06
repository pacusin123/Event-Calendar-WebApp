import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from '../models/role';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class RoleService {

  baseUrl = environment.baseUrl;
  roleId: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(
    private httpService: HttpClient,
  ) { }

  saveRole(role: Role): Observable<Role> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    if (role.RoleId)
      return this.httpService.put<Role>(this.baseUrl + '/role/UpdateRole', JSON.stringify(role), httpOptions);
    else
      return this.httpService.post<Role>(this.baseUrl + '/role/SaveRole', JSON.stringify(role), httpOptions);
  }

  getRoles(): Observable<Array<Role>> {
    return this.httpService.get<Array<Role>>(this.baseUrl + '/role/GetRoles');
  }

  deleteRole(id: number): Observable<any> {
    return this.httpService.delete<any>(this.baseUrl + '/role/deleteRole/' + id);
  }

  verifyRoleExist(id: Number): Observable<boolean> {
    return this.httpService.get<boolean>(this.baseUrl + '/role/verifyRoleExist/' + id);
  }

  getRoleByUserId(id: Number): Observable<Role> {
    return this.httpService.get<Role>(this.baseUrl + '/role/getRoleByUserId/' + id);
  }
}
