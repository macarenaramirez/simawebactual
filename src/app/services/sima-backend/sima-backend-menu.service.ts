import {Injectable} from '@angular/core';
import {LoginUser} from '../../models/new/loginUser.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Respuesta} from '../../models/new/respuesta.model';

@Injectable({
  providedIn: 'root'
})
export class SimaBackendMenuServiceService {

  readonly rootUrl = '/sima-backend/api/menu/';

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
  }

  getMenu(login: LoginUser) {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'menuLateral', login, {headers: this.headers});
  }

}
