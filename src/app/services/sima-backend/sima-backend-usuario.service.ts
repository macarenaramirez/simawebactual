import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Respuesta} from '../../models/new/respuesta.model';
import {UserNameModel} from '../../models/new/userName.model';
import {UsuarioModel} from '../../models/new/usuario.model';
import {BodyUserNameModelUsuarioModel} from '../../models/new/bodyUserNameModelUsuarioModel.model';
import {MenuFormModel} from '../../models/new/menuForm.model';

@Injectable({
  providedIn: 'root'
})
export class SimaBackendUsuarioServiceService {

  readonly rootUrl = '/sima-backend/api/usuario/';

  private headers: HttpHeaders;

  bodyUserNameModelUsuarioModel = new class implements BodyUserNameModelUsuarioModel {
    userNameModel: UserNameModel;
    usuarioModel: UsuarioModel;
  };

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
  }

  listAll(page: number, size: number, campo: string, orden: string, userNameModel: UserNameModel) {
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + `listAll?page=${page}&size=${size}&sort=${campo},${orden}`,
      userNameModel, {headers: this.headers});
  }

  create(usuarioModel: UsuarioModel, userNameModel: UserNameModel) {
    console.log(JSON.stringify(usuarioModel));
    this.bodyUserNameModelUsuarioModel.userNameModel = userNameModel;
    this.bodyUserNameModelUsuarioModel.usuarioModel = usuarioModel;
    this.headers.append('accept', '*/*');
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + `create`, this.bodyUserNameModelUsuarioModel,
      {headers: this.headers});
  }

  edit(usuarioModel: UsuarioModel, userNameModel: UserNameModel) {
    this.bodyUserNameModelUsuarioModel.userNameModel = userNameModel;
    this.bodyUserNameModelUsuarioModel.usuarioModel = usuarioModel;
    this.headers.append('accept', '*/*');
    this.headers.append('Content-Type', 'application/json');
    return this.http.post<Respuesta>(this.rootUrl + `edit`, this.bodyUserNameModelUsuarioModel,
      {headers: this.headers});
  }

}