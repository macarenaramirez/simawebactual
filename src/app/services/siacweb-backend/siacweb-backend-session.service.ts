import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Respuesta} from '../../models/new/respuesta.model';
import {Observable} from 'rxjs';
import {LoginModel} from '../../models/new/login.model';
import {ResponseBaseLoginModel} from '../../models/new/responseBaseLogin.model';
import {SessionIdModel} from '../../models/new/sessionId.model';
import {ResponseBaseUserModel} from '../../models/new/responseBaseUser.model';
import {ResponseBaseModel} from '../../models/new/responseBase.model';
import {ResponseBasePermisosModel} from '../../models/new/responseBasePermisos.model';
import {AuthorizationService} from '../authorization.service';
import swal from 'sweetalert2';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SiacwebBackendSessionService {

  readonly rootUrl = '/siacweb-backend/api/session/';

  private httpHeaders: HttpHeaders;
  private loggedInStatus = false;
  private _permisos: string[];

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  }

  login(loginModel: LoginModel) {
    this.httpHeaders.append('app_id', loginModel.app_id);
    return this.http.post<ResponseBaseLoginModel>(this.rootUrl + 'login', loginModel, {headers: this.httpHeaders});
  }

  getUser(sessionId: string): Observable<ResponseBaseUserModel> {
    const sessionIdModel: SessionIdModel = new SessionIdModel();
    sessionIdModel.sessionId = sessionId;
    // this.headers.append('Content-Type', 'application/json');
    return this.http.post<ResponseBaseUserModel>(this.rootUrl + 'getUserData', sessionIdModel, {headers: this.httpHeaders});
  }

  getUserAuthorizations(sessionId: string): Observable<ResponseBasePermisosModel> {
    const sessionIdModel: SessionIdModel = new SessionIdModel();
    sessionIdModel.sessionId = sessionId;
    // this.headers.append('Content-Type', 'application/json');
    return this.http.post<ResponseBasePermisosModel>(this.rootUrl + 'getUserAuthorizations', sessionIdModel, {headers: this.httpHeaders});
  }


  setLoggedInStatus(loggedInStatus: boolean) {
    this.loggedInStatus = loggedInStatus;
  }


  // isAuthorized(sessionIdPermissionModel: SessionIdPermissionModel): Observable<ResponseBaseModel> {
  //   this.headers.append('Content-Type', 'application/json');
  //   return this.http.post<ResponseBaseModel>(this.rootUrl + 'isauthorized', sessionIdPermissionModel, {headers: this.headers});
  // }

  isAuthorized(permiso: string): boolean {
    let pemitido: boolean = false;
    this._permisos = JSON.parse(sessionStorage.getItem('permisos')) as Array<string>;
    if (this._permisos.includes(permiso)) {
      pemitido = true;
    }
    return pemitido;
  }

  logout(sessionId: string): Observable<boolean> {
    const sessionIdModel: SessionIdModel = new SessionIdModel();
    sessionIdModel.sessionId = sessionId;
    // this.headers.append('Content-Type', 'application/json');
    return this.http.post(this.rootUrl + 'logout', sessionIdModel, {headers: this.httpHeaders})
      .pipe(
        map((logout: ResponseBaseModel) => {
          if (logout.status) {
            return true;
          } else {
            return false;
          }
        })
      );
  }

  istoken(sessionId: string): Observable<boolean> {
    const sessionIdModel: SessionIdModel = new SessionIdModel();
    sessionIdModel.sessionId = sessionId;
    // this.headers.append('Content-Type', 'application/json');
    return this.http.post(this.rootUrl + 'istoken', sessionIdModel, {headers: this.httpHeaders})
      .pipe(
        map((istoken: ResponseBaseModel) => {
          if (istoken.status) {
            return true;
          } else {
            return false;
          }
        })
      );
  }

  getTokenAppId(sessionIdModel: SessionIdModel): Observable<Respuesta> {
    // this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'token-appId', sessionIdModel, {headers: this.httpHeaders});
  }


}
