import {Injectable} from '@angular/core';
import {LoginUser} from '../../models/new/loginUser.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Respuesta} from '../../models/new/respuesta.model';
import {Observable} from 'rxjs';

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

  login(login: LoginUser) {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'login', login, {headers: this.headers});
  }

  isLoggedIn(login: LoginUser): Observable<Respuesta> {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'isloggedin', login, {headers: this.headers});
  }

  logout(login: LoginUser) {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'logout', login, {headers: this.headers});
  }

  getUser(login: LoginUser) {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'user', login, {headers: this.headers});
  }

  getTokenAppId(login: LoginUser) {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'token-appId', login, {headers: this.headers});
  }

  setLoggedInStatus(loggedInStatus: boolean) {
    this.loggedInStatus = loggedInStatus;
  }

  get isLoggedInStatus() {
    return this.loggedInStatus;
  }
}
