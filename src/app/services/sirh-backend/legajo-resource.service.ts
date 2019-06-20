import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Respuesta} from '../../models/new/respuesta.model';
import {MenuFormModel} from '../../models/new/menuForm.model';
import {BodySessionIdMenuFormModel} from '../../models/new/bodySessionIdMenuForm.model';
import {ResponseBasePersonasModel} from '../../models/new/responseBasePersonas.model';
import {ResponseBasePageModel} from '../../models/new/responseBasePage.model';
import {ResponseBasePersonaModel} from '../../models/new/responseBasePersona.model';


@Injectable({
  providedIn: 'root'
})
export class LegajoResourceService {

  readonly rootUrl = '/sirh-backend/api/legajo';

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders();
  }

  getPersona(sessionId: string, nro_documento: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'sessionId': sessionId});
    return this.http.get<ResponseBasePersonaModel>(this.rootUrl + `/persona/+${nro_documento}`, {headers: this.httpHeaders});
  }

  getPersonaByRelacionLaboral(sessionId: string, relacion_laboral: string) {
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
