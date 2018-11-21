import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Respuesta} from '../../models/new/respuesta.model';
import {UserName} from '../../models/new/userName.model';
import {MenuForm} from '../../models/new/menuForm.model';
import {BodyUserNameMenuForm} from '../../models/new/bodyUserNameMenuForm.model';

@Injectable({
  providedIn: 'root'
})
export class SimaBackendMenuServiceService {

  readonly rootUrl = '/sima-backend/api/menu/';

  private headers: HttpHeaders;

  bodyUserNameMenuForm = new class implements BodyUserNameMenuForm {
    userName: UserName;
    menuForm: MenuForm;
  };

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
  }

  getMenu(userName: UserName) {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'menuLateral', userName, {headers: this.headers});
  }

  listMenuByIdPadre(idPadre: number, page: number, size: number, campo: string, orden: string, userName: UserName) {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + `listByIdPadre?id_padre=${idPadre}&page=${page}&size=${size}&sort=${campo},${orden}`,
      userName, {headers: this.headers});
  }

  getMenuById(id: number, userName: UserName) {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + `getMenuById?id=${id}`,
      userName, {headers: this.headers});
  }

  save(menuForm: MenuForm, userName: UserName) {
    this.bodyUserNameMenuForm.userName = userName;
    this.bodyUserNameMenuForm.menuForm = menuForm;
    this.headers.append('accept', '*/*');
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + `save`, this.bodyUserNameMenuForm,
      {headers: this.headers});
  }

}
