import {ResponseBodyBaseModel} from './responseBodyBase.model';
import {UsuarioModel} from './usuario.model';

export class ResponseBodyUserModel extends ResponseBodyBaseModel {
  usuario: UsuarioModel;
}
