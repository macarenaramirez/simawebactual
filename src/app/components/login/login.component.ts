import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../../services/config.service';
import {LoginModel} from '../../models/new/login.model';
import swal from 'sweetalert2';
import {UserNamePasswordModel} from '../../models/new/userNamePassword.model';
import {AuthorizationService} from '../../services/authorization.service';
import {Router} from '@angular/router';

declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userNamePasswordModel: UserNamePasswordModel;

  constructor(private configService: ConfigService,
              private authorizationService: AuthorizationService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.authorizationService.isAuthenticated()) {
      swal.fire('Login', `Hola ${this.authorizationService.usuario.username}, ya estas autenticado!`, 'info');
      this.router.navigate(['']);
    }
    this.userNamePasswordModel = new UserNamePasswordModel();
    // this.usuario = new UsuarioModel();
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
    this.authorizationService.login(loginModel);
  }

}
