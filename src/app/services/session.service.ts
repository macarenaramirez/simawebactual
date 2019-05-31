import {Injectable} from '@angular/core';
import swal from 'sweetalert2';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {SessionResourceService} from './siacweb-backend/session-resource.service';
import {StorageService} from './storage.service';
import {ResponseBasePermisosModel} from '../models/new/responseBasePermisos.model';
import {UserNamePasswordModel} from '../models/new/userNamePassword.model';
import {MenuResourceService} from './simaweb-backend/menu-resource.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private storageService: StorageService,
              private sessionResourceService: SessionResourceService,
              private menuResourceService: MenuResourceService,
              private router: Router) {
  }

  login(userNamePasswordModel: UserNamePasswordModel): void {
    this.sessionResourceService.login(userNamePasswordModel).subscribe(responseBaseLoginModel => {
        if (responseBaseLoginModel.status) {
          this.sessionResourceService.getUser(responseBaseLoginModel.sessionId).subscribe(responseBaseUserModel => {
              if (responseBaseUserModel.status) {
                this.sessionResourceService.getUserAuthorizations(responseBaseLoginModel.sessionId)
                  .subscribe((getUserAuthorizations: ResponseBasePermisosModel) => {
                      if (getUserAuthorizations.status) {
                        this.menuResourceService.getMenus(responseBaseLoginModel.sessionId).subscribe(responseBaseMenusModel => {
                            if (responseBaseMenusModel.status) {
                              this.storageService.guardarSessionId(responseBaseLoginModel.sessionId);
                              this.storageService.guardarUsuario(responseBaseUserModel.usuario);
                              this.storageService.guardarPermisos(getUserAuthorizations.permisos);
                              this.storageService.guardarMenus(responseBaseMenusModel.menus);
                              console.log('login');
                              this.router.navigate(['']);
                            } else {
                              swal.fire('Ocurrió un problema al obtener el Menu', responseBaseMenusModel.message, 'warning');
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
                swal.fire('Ocurrió un problema en Datos del Usuario', responseBaseUserModel.message, 'warning');
              }
            },
            (err: HttpErrorResponse) => {
              swal.fire('Error en Datos del Usuario', err.message, 'error');
            });
        } else {
          swal.fire('Error Login', responseBaseLoginModel.message, 'warning');
        }
      },
      (err: HttpErrorResponse) => {
        swal.fire('Error Login', err.message, 'error');
      });
  }

  logout(): void {
    if (this.storageService.sessionId != null && this.storageService.sessionId.length > 0) {
      this.sessionResourceService.logout(this.storageService.sessionId).subscribe(logout => {
        if (logout.status) {
          console.log('logout() OK' + logout.message);
        } else {
          console.log('logout() ERROR: ' + logout.message);
        }
      });
    }
    this.storageService.clearStorage();
  }

  isAuthenticated(): boolean {
    if (this.storageService.sessionId != null && this.storageService.sessionId.length > 0) {
      return true;
    }
    return false;
  }

  isAuthorized(permiso: string): boolean {
    if (this.storageService.permisos.includes(permiso)) {
      return true;
    }
    return false;
  }

  isTokenExpirado(): boolean {
    const now = new Date().getTime() / 1000;
    console.log('now: ' + now);
    console.log('exp: ' + this.storageService.usuario.exp);
    if (this.storageService.usuario.exp < now) {
      return true;
    }
    return false;
  }
}
