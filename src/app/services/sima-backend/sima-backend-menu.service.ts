import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Respuesta} from '../../models/new/respuesta.model';
import {UserName} from '../../models/new/userName.model';
import {MenuForm} from '../../models/new/menuForm.model';
import {BodyUserNameObject} from '../../models/new/bodyUserNameObject.model';

@Injectable({
  providedIn: 'root'
})
export class SimaBackendMenuServiceService {

  readonly rootUrl = '/sima-backend/api/menu/';

  private headers: HttpHeaders;


  bodyUserNameObject: BodyUserNameObject;

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

  createMenu(menu: MenuForm, userName: UserName) {
    this.bodyUserNameObject = new class implements BodyUserNameObject {
      userName: UserName;
      objeto: any;
    };
    this.bodyUserNameObject.userName = userName;
    this.bodyUserNameObject.objeto = menu;

    console.log(JSON.stringify(this.bodyUserNameObject));

    this.headers.append('accept', '*/*');
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + `new`, this.bodyUserNameObject,
      {headers: this.headers});
  }

}
