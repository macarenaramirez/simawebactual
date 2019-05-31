import {Injectable} from '@angular/core';
import {UsuarioModel} from '../models/new/usuario.model';
import {MenuModel} from '../models/new/menu.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _sessionId: string;
  private _usuario: UsuarioModel;
  private _permisos: string[];
  private _menus: MenuModel[];

  constructor() {
  }

  public get sessionId(): string {
    if (this._sessionId != null) {
      return this._sessionId;
    } else if (this._sessionId == null && sessionStorage.getItem('sessionId') != null) {
      this._sessionId = sessionStorage.getItem('sessionId');
      return this._sessionId;
    }
    return null;
  }

  guardarSessionId(sessionId: string): void {
    this._sessionId = sessionId;
    sessionStorage.setItem('sessionId', sessionId);
  }

  public get usuario(): UsuarioModel {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as UsuarioModel;
      return this._usuario;
    }
    return new UsuarioModel();
  }

  guardarUsuario(usuario: UsuarioModel): void {
    this._usuario = new UsuarioModel();
    this._usuario.username = usuario.username;
    this._usuario.email = usuario.email;
    this._usuario.exp = usuario.exp;
    this._usuario.nombre = usuario.nombre;
    this._usuario.apellido = usuario.apellido;
    this._usuario.documento = usuario.documento;
    this._usuario.direccionGeneral = usuario.direccionGeneral;
    this._usuario.direccion = usuario.direccion;
    this._usuario.departamento = usuario.departamento;
    this._usuario.unidad = usuario.unidad;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  public get permisos(): string[] {
    if (this._permisos != null) {
      return this._permisos;
    } else if (this._permisos == null && sessionStorage.getItem('permisos') != null) {
      this._permisos = JSON.parse(sessionStorage.getItem('permisos')) as string[];
      return this._permisos;
    }
    return new Array();
  }

  guardarPermisos(permisos: string[]): void {
    sessionStorage.setItem('permisos', JSON.stringify(permisos));
  }

  public get menus(): MenuModel[] {
    if (this._menus != null) {
      return this._menus;
    } else if (this._menus == null && sessionStorage.getItem('menus') != null) {
      this._menus = JSON.parse(sessionStorage.getItem('menus')) as MenuModel[];
      return this._menus;
    }
    return new Array();
  }

  guardarMenus(menus: any): void {
    sessionStorage.setItem('menus', JSON.stringify(menus));
  }

  clearStorage(): void {
    this._sessionId = null;
    this._usuario = null;
    this._permisos = null;
    this._menus = null;
    sessionStorage.clear();
    localStorage.clear();
  }
}
