import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Respuesta} from '../../models/new/respuesta.model';
import {MenuFormModel} from '../../models/new/menuForm.model';
import {BodySessionIdMenuFormModel} from '../../models/new/bodySessionIdMenuForm.model';
import {ResponseBaseMenusModel} from '../../models/new/responseBaseMenus.model';
import {ResponseBasePageModel} from '../../models/new/responseBasePage.model';
import {ResponseBaseMenuModel} from '../../models/new/responseBaseMenu.model';


@Injectable({
  providedIn: 'root'
})
export class MenuResourceService {

  readonly rootUrl = '/simaweb-backend/api/menus';

  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders();
  }

  getMenus(sessionId: string) {
    this.httpHeaders = new HttpHeaders({'Content-Type': 'application/json', 'sessionId': sessionId});
    return this.http.get<ResponseBaseMenusModel>(this.rootUrl + '/', {headers: this.httpHeaders});
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
  }

}
