import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenAppId} from '../../models/tokenAppId.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorUtilsService {

  readonly appId = localStorage.getItem('appId');
  readonly rootUrl = '/api/utils/';

  constructor(private http: HttpClient) {
  }

  getPermisos() {
    const tokenAppId: TokenAppId = {
      app_id: this.appId,
      token: localStorage.getItem('token')
    };
    const reqHeader = new HttpHeaders();
    reqHeader.append('accept', 'application/json');
    return this.http.post(this.rootUrl + 'tokenToPermisos', tokenAppId, {headers: reqHeader});
  }
}
