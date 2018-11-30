import {LugarOperativoModel} from './lugarOperativo.model';

export interface UsuarioModel {
  id: number;
  userName: string;
  sessionTime: number;
  lugarOperativo: LugarOperativoModel;
}
