import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '../../../../node_modules/@angular/common/http';
import {Observable} from 'rxjs';
import {DependenciaPage} from '../../models/dependenciaPage.model';
import {Dependencia} from '../../models/dependencia.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioInfoBackendService {

  readonly appId = localStorage.getItem('appId');
  readonly rootUrl = '/api/inventario-info-backend/';

  private headers: HttpHeaders;
  private token: string;

  // http://localhost:8088/api/inventario-info-backend/dependencia

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    this.headers = new HttpHeaders();
    // this.headers.set('Authorization', this.token);
    // this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // this.headers.append('accept', '*/*');
    // this.headers.append('Content-Type', 'application/json');
  }

  getAllDependencia(page: number, size: number, campo: string, orden: string): Observable<DependenciaPage> {
    return this.http.get(this.rootUrl + `dependencias?page=${page}&size=${size}&sort=${campo},${orden}`,
      {headers: this.headers}).map((res: DependenciaPage) => res);
  }

  createDependencia(dependencia: Dependencia): Observable<Dependencia> {
    this.headers.append('accept', '*/*');
    this.headers.append('Content-Type', 'application/json');
    return this.http.post(this.rootUrl + `dependencias`, dependencia,
      {headers: this.headers}).map((res: Dependencia) => res);
  }
}
