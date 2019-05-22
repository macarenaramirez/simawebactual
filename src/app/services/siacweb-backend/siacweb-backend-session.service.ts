import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Respuesta} from '../../models/new/respuesta.model';
import {Observable} from 'rxjs';
import {UserNameModel} from '../../models/new/userName.model';
import {UserNamePermiso} from '../../models/new/userNamePermiso.model';
import {ConfigService} from '../config.service';
import {Config} from '../../models/config.model';
import {UserNamePasswordAppIdModel} from '../../models/new/userNamePasswordAppId.model';
import {ResponseBodyModel} from '../../models/new/responseBody.model';

@Injectable({
  providedIn: 'root'
})
export class SiacwebBackendSessionService {

  readonly rootUrl = '/siacweb-backend/api/session/';

  private headers: HttpHeaders;
  private loggedInStatus = false;
  // config: Config;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    // this.getConf();
    // this.config = configService.get();
  }

  // login(userNamePasswordAppIdModel: UserNamePasswordAppIdModel) {
  //   console.log('appId: ' + this.config.appId);
  //   userNamePasswordAppIdModel.app_id = this.config.appId;
  //   this.headers.append('Content-Type', 'application/json');
  //   return this.http.post<ResponseBodyModel>(this.rootUrl + 'login', userNamePasswordAppIdModel, {headers: this.headers});
  // }

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

  // getConf() {
  //   this.configService.getConfig()
  //     .subscribe((data: Config) => {
  //       this.config = data;
  //       localStorage.setItem('appId', this.config.appId);
  //     });
  //
  // }
}
