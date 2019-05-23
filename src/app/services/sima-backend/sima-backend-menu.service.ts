import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Respuesta} from '../../models/new/respuesta.model';
import {MenuFormModel} from '../../models/new/menuForm.model';
import {BodyUserNameModelMenuFormModel} from '../../models/new/bodyUserNameModelMenuFormModel.model';
import {UserNameModel} from '../../models/new/userName.model';


@Injectable({
  providedIn: 'root'
})
export class SimaBackendMenuServiceService {

  readonly rootUrl = '/sima-backend/api/menu/';

  private headers: HttpHeaders;

  bodyUserNameModelMenuFormModel: BodyUserNameModelMenuFormModel;

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.bodyUserNameModelMenuFormModel = new BodyUserNameModelMenuFormModel();
  }

  getMenu(userNameModel: UserNameModel) {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + 'menuLateral', userNameModel, {headers: this.headers});
  }

  listMenuByIdPadre(idPadre: number, page: number, size: number, campo: string, orden: string, userNameModel: UserNameModel) {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + `listByIdPadre?id_padre=${idPadre}&page=${page}&size=${size}&sort=${campo},${orden}`,
      userNameModel, {headers: this.headers});
  }

  getMenuById(id: number, userNameModel: UserNameModel) {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + `getMenuById?id=${id}`,
      userNameModel, {headers: this.headers});
  }

  create(menuFormModel: MenuFormModel, userNameModel: UserNameModel) {
    this.bodyUserNameModelMenuFormModel.userNameModel = userNameModel;
    this.bodyUserNameModelMenuFormModel.menuFormModel = menuFormModel;
    this.headers.append('accept', '*/*');
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + `create`, this.bodyUserNameModelMenuFormModel,
      {headers: this.headers});
  }

  edit(menuFormModel: MenuFormModel, userNameModel: UserNameModel) {
    this.bodyUserNameModelMenuFormModel.userNameModel = userNameModel;
    this.bodyUserNameModelMenuFormModel.menuFormModel = menuFormModel;
    this.headers.append('accept', '*/*');
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + `edit`, this.bodyUserNameModelMenuFormModel,
      {headers: this.headers});
  }

}
