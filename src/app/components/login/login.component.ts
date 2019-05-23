import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {ConfigService} from '../../services/config.service';
import {UserNamePasswordAppIdModel} from '../../models/new/userNamePasswordAppId.model';
import swal from 'sweetalert2';
import {SiacwebBackendSessionService} from '../../services/siacweb-backend/siacweb-backend-session.service';
import {ResponseBodyPermisosModel} from '../../models/new/responseBodyPermisos.model';
import {MenuAndSubMenuModel} from '../../models/new/menuAndSubMenu.model';
import {UserNameModel} from '../../models/new/userName.model';
import {SimaBackendMenuServiceService} from '../../services/sima-backend/sima-backend-menu.service';

declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userNamePasswordAppIdModel: UserNamePasswordAppIdModel;
  appId: string;
  menus: MenuAndSubMenuModel[];
  usernameModel: UserNameModel;

  constructor(private fb: FormBuilder,
              private config: ConfigService,
              private siacwebBackendSessionService: SiacwebBackendSessionService,
              private simaBackendMenuServiceService: SimaBackendMenuServiceService,
              private router: Router) {
    this.userNamePasswordAppIdModel = new UserNamePasswordAppIdModel();
    this.usernameModel = new UserNameModel();
  }

  ngOnInit() {
    this.appId = this.config.getAppId();
    document.body.className = 'hold-transition login-page';
  }

  login() {
    if (this.userNamePasswordAppIdModel.username == null || this.userNamePasswordAppIdModel.password == null) {
      swal.fire('Error Login', 'Nombre de usuario o Contraseña vacías!', 'warning');
      return;
    }

    this.userNamePasswordAppIdModel.app_id = this.config.getAppId();
    this.siacwebBackendSessionService.login(this.userNamePasswordAppIdModel).subscribe(login => {
        if (login.status) {
          localStorage.setItem('username', this.userNamePasswordAppIdModel.username);
          localStorage.setItem('sessionId', login.sessionId);
          this.siacwebBackendSessionService.getUserAuthorizations().subscribe((getUserAuthorizations: ResponseBodyPermisosModel) => {
              if (getUserAuthorizations.status) {
                localStorage.setItem('permisos', JSON.stringify(getUserAuthorizations.permisos));
                this.usernameModel.username = this.userNamePasswordAppIdModel.username;
                this.simaBackendMenuServiceService.getMenu(this.usernameModel).subscribe(getMenu => {
                    if (getMenu.status) {
                      localStorage.setItem('menus', JSON.stringify(getMenu.object));
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
          swal.fire('Error Login', login.message, 'warning');
        }
      },
      (err: HttpErrorResponse) => {
        swal.fire('Error Login', err.message, 'error');
      });
  }

}
