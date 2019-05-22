import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {ConfigService} from '../../services/config.service';
import {UserNamePasswordAppIdModel} from '../../models/new/userNamePasswordAppId.model';
import swal from 'sweetalert2';
import {SiacwebBackendSessionService} from '../../services/siacweb-backend/siacweb-backend-session.service';

declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginError = false;
  mensaje: string;
  userNamePasswordAppIdModel: UserNamePasswordAppIdModel;

  constructor(private fb: FormBuilder,
              private config: ConfigService,
              private siacwebBackendSessionService: SiacwebBackendSessionService,
              private router: Router) {
    this.userNamePasswordAppIdModel = new UserNamePasswordAppIdModel();
  }

  ngOnInit() {
    this.mensaje = localStorage.getItem('message');
    if (this.mensaje !== '') {
      this.isLoginError = true;
    }
    document.body.className = 'hold-transition login-page';
    // $(() => {
    //   $('input').iCheck({
    //     checkboxClass: 'icheckbox_square-blue',
    //     radioClass: 'iradio_square-blue',
    //     increaseArea: '20%' /* optional */
    //   });
    // });
  }

  login() {
    if (this.userNamePasswordAppIdModel.username == null || this.userNamePasswordAppIdModel.password == null) {
      swal.fire('Error Login', 'Nombre de usuario o Contraseña vacías!', 'error');
      return;
    }

    // userNamePassword.username = post.username;
    // // userNamePassword.password = post.password;
    // this.userNamePasswordAppIdModel.username = 'vinsfran';
    // this.userNamePasswordAppIdModel.password = 'vinsfran01';
    if (this.config.getAppId()) {
      this.userNamePasswordAppIdModel.app_id = this.config.getAppId();
    }
    this.siacwebBackendSessionService.login(this.userNamePasswordAppIdModel).subscribe(data => {
        if (data.status) {
          localStorage.setItem('username', this.userNamePasswordAppIdModel.username);
          localStorage.setItem('message', '');
          console.log('app_id: ' + this.userNamePasswordAppIdModel.app_id);
          // console.log('sessionId: ' + data.data);
          this.router.navigate(['']);
          this.isLoginError = false;
        } else {
          this.mensaje = data.message;
          this.isLoginError = true;
        }
      },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
        this.mensaje = err.message;
      });
  }

}
