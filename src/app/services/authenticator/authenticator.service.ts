import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Login} from '../../models/login.model';
import {InvalidateToken} from '../../models/invalidateToken.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  readonly appId = localStorage.getItem('appId');
  readonly rootUrl = '/api/jwt/';

  constructor(private http: HttpClient) {
  }

  getToken(userName: string, password: string) {
    const login: Login = {
      app_id: this.appId,
      username: userName,
      password: password
    };
    // let reqHeader = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    const reqHeader = new HttpHeaders();
    reqHeader.append('Content-Type', 'application/json');
    // reqHeader.append('accept', 'application/json');
    // reqHeader.append('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization');
    return this.http.post(this.rootUrl + 'token', login, {headers: reqHeader});
  }

  invalidateToken() {
    const invalidateToken: InvalidateToken = {
      app_id: this.appId,
      token: localStorage.getItem('token')
    };
    const reqHeader = new HttpHeaders();
    reqHeader.append('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(this.rootUrl + 'invalidate', invalidateToken, {headers: reqHeader});
  }
}
