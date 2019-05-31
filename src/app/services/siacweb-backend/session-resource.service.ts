import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseBaseLoginModel} from '../../models/new/responseBaseLogin.model';
import {ResponseBaseUserModel} from '../../models/new/responseBaseUser.model';
import {ResponseBaseModel} from '../../models/new/responseBase.model';
import {ResponseBasePermisosModel} from '../../models/new/responseBasePermisos.model';
import {ConfigService} from '../config.service';
import {UserNamePasswordModel} from '../../models/new/userNamePassword.model';

@Injectable({
  providedIn: 'root'
})
export class SessionResourceService {

  readonly rootUrl = '/siacweb-backend/api/session/';

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private configService: ConfigService) {
  }

  login(userNamePasswordModel: UserNamePasswordModel) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'app_id': this.configService.configModel.appId});
    return this.http.post<ResponseBaseLoginModel>(this.rootUrl + 'login', userNamePasswordModel, {headers: this.httpHeaders});
  }

  logout(sessionId: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'sessionId': sessionId});
    return this.http.get<ResponseBaseUserModel>(this.rootUrl + 'logout', {headers: this.httpHeaders});
  }

  getUser(sessionId: string): Observable<ResponseBaseUserModel> {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'sessionId': sessionId});
    return this.http.get<ResponseBaseUserModel>(this.rootUrl + 'user/data', {headers: this.httpHeaders});
  }

  getUserAuthorizations(sessionId: string): Observable<ResponseBasePermisosModel> {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'sessionId': sessionId});
    return this.http.get<ResponseBasePermisosModel>(this.rootUrl + 'user/authorizations', {headers: this.httpHeaders});
  }

  isSession(sessionId: string): Observable<ResponseBaseModel> {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'sessionId': sessionId});
    return this.http.get<ResponseBaseModel>(this.rootUrl + 'issession', {headers: this.httpHeaders});
  }

  // isAuthorized(permiso: string): boolean {
  //   let pemitido: boolean = false;
  //   this._permisos = JSON.parse(sessionStorage.getItem('permisos')) as Array<string>;
  //   if (this._permisos.includes(permiso)) {
  //     pemitido = true;
  //   }
  //   return pemitido;
  // }

  istoken(sessionId: string): Observable<ResponseBaseModel> {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'sessionId': sessionId});
    return this.http.get<ResponseBaseModel>(this.rootUrl + 'token/istoken', {headers: this.httpHeaders});
  }

}
