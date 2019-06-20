import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Respuesta} from '../../models/new/respuesta.model';
import {MenuFormModel} from '../../models/new/menuForm.model';
import {BodySessionIdMenuFormModel} from '../../models/new/bodySessionIdMenuForm.model';
import {ResponseBasePersonasModel} from '../../models/new/responseBasePersonas.model';
import {ResponseBasePageModel} from '../../models/new/responseBasePage.model';
import {ResponseBasePatenteModel} from '../../models/new/responseBasePatente.model';


@Injectable({
  providedIn: 'root'
})
export class PatenteResourceService {

  readonly rootUrl = '/sirec-backend/api/patentes';

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders();
  }

  getPatente(sessionId: string, nroPatente: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'sessionId': sessionId});
    return this.http.get<ResponseBasePatenteModel>(this.rootUrl + `/comerciales?nroPatente=${nroPatente}`, {headers: this.httpHeaders});
  }

  /*getPersonaByRelacionLaboral(sessionId: string, relacion_laboral: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'sessionId': sessionId});
    return this.http.get<ResponseBasePersonasModel>(this.rootUrl + `/personas/+${relacion_laboral}`, {headers: this.httpHeaders});
  }
/*
  listMenuByIdPadre(idPadre: number, page: number, size: number, campo: string, orden: string, sessionId: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'sessionId': sessionId});
    return this.http.get<ResponseBasePageModel>(
      this.rootUrl + `/page/by-padre?idPadre=${idPadre}&page=${page}&size=${size}&sort=${campo},${orden}`, {headers: this.httpHeaders});
  }

  getMenuById(id: number, sessionId: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'sessionId': sessionId});
    return this.http.get<ResponseBaseMenuModel>(this.rootUrl + `/${id}`, {headers: this.httpHeaders});
  }

  create(menuFormModel: MenuFormModel, sessionId: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'sessionId': sessionId});
    return this.http.post<Respuesta>(this.rootUrl, menuFormModel, {headers: this.httpHeaders});
  }

  edit(menuFormModel: MenuFormModel, sessionId: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'sessionId': sessionId});
    return this.http.put<Respuesta>(this.rootUrl, menuFormModel, {headers: this.httpHeaders});
  }*/

}
