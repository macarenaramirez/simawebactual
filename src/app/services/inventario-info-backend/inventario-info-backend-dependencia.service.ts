import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '../../../../node_modules/@angular/common/http';
import {Dependencia} from '../../models/dependencia.model';
import {TokenAppId} from '../../models/tokenAppId.model';
import {Respuesta} from '../../models/new/respuesta.model';
import {Body} from '../../models/new/body.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioInfoBackendDependenciaService {

  readonly appId = localStorage.getItem('appId');
  readonly rootUrl = '/api/inventario-info-backend/dependencias/';

  private headers: HttpHeaders;
  private token: string;

  body: Body;

  // http://localhost:8088/api/inventario-info-backend/dependencia

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    this.headers = new HttpHeaders();
    // this.headers.set('Authorization', this.token);
    // this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // this.headers.append('accept', '*/*');
    // this.headers.append('Content-Type', 'application/json');
  }

  getAllDependencia(page: number, size: number, campo: string, orden: string, tokenAppId: TokenAppId) {
    // console.log('getAllDependencia ' + JSON.stringify(tokenAppId));
    // this.headers.set('token', token);
    // this.headers.set('app_id', appId);
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + `list?page=${page}&size=${size}&sort=${campo},${orden}`, tokenAppId,
      {headers: this.headers});
  }

  createDependencia(dependencia: Dependencia, tokenAppId: TokenAppId) {
    this.body = new class implements Body {
      token_app_id: TokenAppId;
      objeto: any;
    };
    this.body.token_app_id = tokenAppId;
    this.body.objeto = dependencia;

    console.log(JSON.stringify(this.body));

    this.headers.append('accept', '*/*');
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + `new`, this.body,
      {headers: this.headers});
  }
}