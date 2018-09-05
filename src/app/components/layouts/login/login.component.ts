import {Component, OnInit} from '@angular/core';
import {AuthenticatorService} from '../../../services/authenticator/authenticator.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthenticatorUtilsService} from '../../../services/authenticatorUtils/authenticator-utils.service';

declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginError = false;
  isAutorizacion = false;

  constructor(private authenticatorService: AuthenticatorService,
              private authenticatorUtilsService: AuthenticatorUtilsService,
              private router: Router) {
  }

  ngOnInit() {
    document.body.className = 'hold-transition login-page';
    // $(() => {
    //   $('input').iCheck({
    //     checkboxClass: 'icheckbox_square-blue',
    //     radioClass: 'iradio_square-blue',
    //     increaseArea: '20%' /* optional */
    //   });
    // });
  }

  OnSubmit(userName: string, password: string) {
    this.authenticatorService.getToken(userName, password).subscribe((data: any) => {
        localStorage.setItem('token', data.token);
        this.authenticatorUtilsService.getPermisos().subscribe((data2: any) => {
            this.isAutorizacion = data2.autorizacion;
            localStorage.setItem('autorizacion', data2.autorizacion);
            localStorage.setItem('userName', data2.user.username);
            localStorage.setItem('email', data2.user.email);
            localStorage.setItem('nombre', data2.user.nombre);
            localStorage.setItem('apellido', data2.user.apellido);
            localStorage.setItem('documento', data2.user.documento);
            localStorage.setItem('direccionGeneral', data2.user.direccionGeneral);
            localStorage.setItem('direccion', data2.user.direccion);
            localStorage.setItem('departamento', data2.user.departamento);
            localStorage.setItem('unidad', data2.user.unidad);
            localStorage.setItem('permisos', JSON.stringify(data2.permisos));
            if (this.isAutorizacion) {
              this.router.navigate(['']);
            } else {
              localStorage.removeItem('token');
              localStorage.removeItem('autorizacion');
              localStorage.removeItem('userName');
              localStorage.removeItem('email');
              localStorage.removeItem('nombre');
              localStorage.removeItem('apellido');
              localStorage.removeItem('documento');
              localStorage.removeItem('direccionGeneral');
              localStorage.removeItem('direccion');
              localStorage.removeItem('departamento');
              localStorage.removeItem('unidad');
              localStorage.removeItem('permisos');
              this.isLoginError = true;
            }
          },
          (err: HttpErrorResponse) => {
            this.isLoginError = true;
          });
      },
      (err: HttpErrorResponse) => {
        console.log('Error: ' +  err.message);
        this.isLoginError = true;
      });
  }

}
