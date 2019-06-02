import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import {UserNamePasswordModel} from '../../models/new/userNamePassword.model';
import {StorageService} from '../../services/storage.service';
import {SessionService} from '../../services/session.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {ResponseBasePermisosModel} from '../../models/new/responseBasePermisos.model';
import {SessionResourceService} from '../../services/siacweb-backend/session-resource.service';
import {MenuResourceService} from '../../services/simaweb-backend/menu-resource.service';

declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userNamePasswordModel: UserNamePasswordModel;

  constructor(private sessionService: SessionService,
              private storageService: StorageService,
              private sessionResourceService: SessionResourceService,
              private menuResourceService: MenuResourceService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.sessionService.isAuthenticated()) {
      swal.fire('Login', `Hola ${this.storageService.usuario.username}, ya estas autenticado!`, 'info');
      this.router.navigate(['']);
    }
    this.userNamePasswordModel = new UserNamePasswordModel();
    document.body.className = 'hold-transition login-page';
  }

  login() {
    if (this.userNamePasswordModel.username == null || this.userNamePasswordModel.password == null) {
      swal.fire('Error Login', 'Nombre de usuario o Contraseña vacías!', 'warning');
      return;
    }

    this.sessionResourceService.login(this.userNamePasswordModel).subscribe(responseBaseLoginModel => {
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

}
