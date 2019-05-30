import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UsuarioModel} from '../models/new/usuario.model';
import swal from 'sweetalert2';
import {SiacwebBackendSessionService} from './siacweb-backend/siacweb-backend-session.service';
import {SimaBackendMenuServiceService} from './sima-backend/sima-backend-menu.service';
import {Router} from '@angular/router';
import {ResponseBasePermisosModel} from '../models/new/responseBasePermisos.model';
import {LoginModel} from '../models/new/login.model';
import {MenuModel} from '../models/new/menu.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private _sessionId: string;
  private _usuario: UsuarioModel;
  private _menus: MenuModel[];

  constructor(private http: HttpClient,
              private siacwebBackendSessionService: SiacwebBackendSessionService,
              private simaBackendMenuServiceService: SimaBackendMenuServiceService,
              private router: Router) {
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

  public get sessionId(): string {
    if (this._sessionId != null) {
      return this._sessionId;
    } else if (this._sessionId == null && sessionStorage.getItem('sessionId') != null) {
      this._sessionId = sessionStorage.getItem('sessionId');
      return this._sessionId;
    }
    return null;
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

  login(loginModel: LoginModel) {
    this.siacwebBackendSessionService.login(loginModel).subscribe(login => {
        if (login.status) {
          this.siacwebBackendSessionService.getUser(login.sessionId).subscribe(getUser => {
              if (getUser.status) {
                this.siacwebBackendSessionService.getUserAuthorizations(login.sessionId).subscribe((getUserAuthorizations: ResponseBasePermisosModel) => {
                    if (getUserAuthorizations.status) {
                      this.simaBackendMenuServiceService.getMenus(login.sessionId).subscribe(getMenu => {
                          if (getMenu.status) {
                            this.guardarSessionId(login.sessionId);
                            this.guardarUsuario(getUser.usuario);
                            this.guardarPermisos(getUserAuthorizations.permisos);
                            this.guardarMenus(getMenu.menus);
                            this.router.navigate(['']);
                          } else {
                            swal.fire('Ocurrió un problema al obtener el Menu', getMenu.message, 'warning');
                          }
                        },
                        (err: HttpErrorResponse) => {
                          swal.fire('Error al obtener el Menu', err.message, 'error');
                        });
                    } else {
                      swal.fire('Error Login', getUserAuthorizations.message, 'warning');
                    }
                  },
                  (err: HttpErrorResponse) => {
                    swal.fire('Error Login', err.message, 'error');
                  });
              } else {
                swal.fire('Ocurrió un problema en Datos del Usuario', getUser.message, 'warning');
              }
            },
            (err: HttpErrorResponse) => {
              swal.fire('Error en Datos del Usuario', err.message, 'error');
            });
        } else {
          swal.fire('Error Login', login.message, 'warning');
        }
      },
      (err: HttpErrorResponse) => {
        swal.fire('Error Login', err.message, 'error');
      });
  }

  guardarSessionId(sessionId: string): void {
    this._sessionId = sessionId;
    sessionStorage.setItem('sessionId', sessionId);
  }

  guardarUsuario(usuario: UsuarioModel): void {
    this._usuario = new UsuarioModel();
    this._usuario.username = usuario.username;
    this._usuario.email = usuario.email;
    this._usuario.nombre = usuario.nombre;
    this._usuario.apellido = usuario.apellido;
    this._usuario.documento = usuario.documento;
    this._usuario.direccionGeneral = usuario.direccionGeneral;
    this._usuario.direccion = usuario.direccion;
    this._usuario.departamento = usuario.departamento;
    this._usuario.unidad = usuario.unidad;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  guardarPermisos(permisos: string[]): void {
    sessionStorage.setItem('permisos', JSON.stringify(permisos));
  }

  guardarMenus(menus: any): void {
    sessionStorage.setItem('menus', JSON.stringify(menus));
  }


  logout(): void {
    if (this.siacwebBackendSessionService.logout(this.sessionId).subscribe()) {
      this._sessionId = null;
      this._usuario = null;
      sessionStorage.clear();
      localStorage.clear();
      this.router.navigate(['login']);
    } else {
      swal.fire('Ocurrió un problema al cerrar sesión', 'Ocurrió un problema cerrar la sesión del Usuario', 'warning');
    }
  }

  isAuthenticated(): boolean {
    if (this.sessionId != null && this.sessionId.length > 0) {
      if (this.siacwebBackendSessionService.istoken(this.sessionId).subscribe()) {
        return true;
      }
    }
    return false;
  }

}
