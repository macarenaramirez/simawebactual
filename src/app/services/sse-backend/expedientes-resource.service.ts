import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Respuesta} from '../../models/new/respuesta.model';
import {MenuFormModel} from '../../models/new/menuForm.model';
import {BodySessionIdMenuFormModel} from '../../models/new/bodySessionIdMenuForm.model';
import {ResponseBasePersonasModel} from '../../models/new/responseBasePersonas.model';
import {ResponseBasePageModel} from '../../models/new/responseBasePage.model';
import {ResponseBasePersonaExpedientesModel} from '../../models/new/responseBasePersonaExpedientes.model';
import {ResponseBaseMovimientosExpedientesModel} from '../../models/new/responseBaseMovimientosExpedientes.model';
@Injectable({
  providedIn: 'root'
})
export class ExpedientesResourceService {

  readonly rootUrl = '/sse-backend/api/expedientes/';

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders();
  }

  getExpedientes(sessionId: string, indTipdocide:string, nroDocide: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'sessionId': sessionId,'indTipdocide':indTipdocide, 'nroDocide':nroDocide});
    return this.http.get<ResponseBasePersonaExpedientesModel>(this.rootUrl + `by-titular?indTipdocide=${indTipdocide}&nroDocide=${nroDocide}`, {headers: this.httpHeaders});
  }

  getMovimientos(sessionId: string, indEjefiscar:number, nroCarpeta: number) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'sessionId': sessionId});
    //, 'indEjefiscar':indEjefiscar, 'nroCarpeta':nroCarpeta
    return this.http.get<ResponseBaseMovimientosExpedientesModel>(this.rootUrl + `movimientos?indEjefiscar=${indEjefiscar}&nroCarpeta=${nroCarpeta}`, {headers: this.httpHeaders});
  }

/*
  getPersonaByRelacionLaboral(sessionId: string, relacion_laboral: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'sessionId': sessionId});
    return this.http.get<ResponseBasePersonasModel>(this.rootUrl + `/personas/+${relacion_laboral}`, {headers: this.httpHeaders});
  }

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
