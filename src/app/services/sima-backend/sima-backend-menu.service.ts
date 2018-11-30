import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Respuesta} from '../../models/new/respuesta.model';
import {UserNameModel} from '../../models/new/userName.model';
import {MenuFormModel} from '../../models/new/menuForm.model';
import {BodyUserNameModelMenuFormModel} from '../../models/new/bodyUserNameModelMenuFormModel.model';

@Injectable({
  providedIn: 'root'
})
export class SimaBackendMenuServiceService {

  readonly rootUrl = '/sima-backend/api/menu/';

  private headers: HttpHeaders;

  bodyUserNameModelMenuFormModel = new class implements BodyUserNameModelMenuFormModel {
    userNameModel: UserNameModel;
    menuFormModel: MenuFormModel;
  };

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
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

  save(menuFormModel: MenuFormModel, userNameModel: UserNameModel) {
    this.bodyUserNameModelMenuFormModel.userNameModel = userNameModel;
    this.bodyUserNameModelMenuFormModel.menuFormModel = menuFormModel;
    this.headers.append('accept', '*/*');
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + `save`, this.bodyUserNameModelMenuFormModel,
      {headers: this.headers});
  }

}
