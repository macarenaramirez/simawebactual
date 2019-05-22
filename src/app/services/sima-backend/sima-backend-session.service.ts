import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Respuesta} from '../../models/new/respuesta.model';
import {Observable} from 'rxjs';
import {UserNameModel} from '../../models/new/userName.model';
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
    const params = new URLSearchParams();
    params.set('username', userNamePassword.username);
    params.set('password', userNamePassword.password);
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'login', userNamePassword, {headers: this.headers});
  }

  isLoggedIn(userNameModel: UserNameModel): Observable<Respuesta> {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'isloggedin', userNameModel, {headers: this.headers});
  }

  logout(userNameModel: UserNameModel) {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'logout', userNameModel, {headers: this.headers});
  }

  getUser(userNameModel: UserNameModel) {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'user', userNameModel, {headers: this.headers});
  }

  getTokenAppId(userNameModel: UserNameModel) {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'token-appId', userNameModel, {headers: this.headers});
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
