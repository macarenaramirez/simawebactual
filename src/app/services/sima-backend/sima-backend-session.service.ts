import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Respuesta} from '../../models/new/respuesta.model';
import {Observable} from 'rxjs';
import {UserName} from '../../models/new/userName.model';
import {UserNamePassword} from '../../models/new/userNamePassword.model';
import {UserNamePermiso} from '../../models/new/userNamePermiso.model';

@Injectable({
  providedIn: 'root'
})
export class SimaBackendSessionService {

  readonly rootUrl = '/sima-backend/api/session/';

  private headers: HttpHeaders;
  private loggedInStatus = false;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
  }

  login(userNamePassword: UserNamePassword) {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'login', userNamePassword, {headers: this.headers});
  }

  isLoggedIn(userName: UserName): Observable<Respuesta> {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'isloggedin', userName, {headers: this.headers});
  }

  logout(userName: UserName) {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'logout', userName, {headers: this.headers});
  }

  getUser(userName: UserName) {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'user', userName, {headers: this.headers});
  }

  getTokenAppId(userName: UserName) {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'token-appId', userName, {headers: this.headers});
  }

  isAuthorized(userNamePermiso: UserNamePermiso): Observable<Respuesta> {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'isauthorized', userNamePermiso, {headers: this.headers});
  }

  setLoggedInStatus(loggedInStatus: boolean) {
    this.loggedInStatus = loggedInStatus;
  }

  get isLoggedInStatus() {
    return this.loggedInStatus;
  }
}
