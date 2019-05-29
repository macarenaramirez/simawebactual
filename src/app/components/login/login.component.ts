import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {ConfigService} from '../../services/config.service';
import {LoginModel} from '../../models/new/login.model';
import swal from 'sweetalert2';
import {SiacwebBackendSessionService} from '../../services/siacweb-backend/siacweb-backend-session.service';
import {ResponseBasePermisosModel} from '../../models/new/responseBasePermisos.model';
import {MenuModel} from '../../models/new/menu.model';
import {SimaBackendMenuServiceService} from '../../services/sima-backend/sima-backend-menu.service';
import {UserNamePasswordModel} from '../../models/new/userNamePassword.model';

declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userNamePasswordModel: UserNamePasswordModel;
  menus: MenuModel[];

  constructor(private configService: ConfigService,
              private siacwebBackendSessionService: SiacwebBackendSessionService,
              private simaBackendMenuServiceService: SimaBackendMenuServiceService,
              private router: Router) {
  }

  ngOnInit() {
    this.userNamePasswordModel = new UserNamePasswordModel();
    this.configService.getConfig();
    document.body.className = 'hold-transition login-page';
  }

  login() {
    if (this.userNamePasswordModel.username == null || this.userNamePasswordModel.password == null) {
      swal.fire('Error Login', 'Nombre de usuario o Contraseña vacías!', 'warning');
      return;
    }
    const loginModel = new LoginModel();
    loginModel.username = this.userNamePasswordModel.username;
    loginModel.password = this.userNamePasswordModel.password;
    loginModel.app_id = this.configService.getConfig().appId;
    loginModel.app_name_client = this.configService.getConfig().appNameClient;
    this.siacwebBackendSessionService.login(loginModel).subscribe(login => {
        if (login.status) {
          localStorage.setItem('sessionId', login.sessionId);
          this.siacwebBackendSessionService.getUserAuthorizations().subscribe((getUserAuthorizations: ResponseBasePermisosModel) => {
              if (getUserAuthorizations.status) {
                localStorage.setItem('permisos', JSON.stringify(getUserAuthorizations.permisos));
                this.simaBackendMenuServiceService.getMenus().subscribe(getMenu => {
                    if (getMenu.status) {
                      localStorage.setItem('menus', JSON.stringify(getMenu.menus));
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
