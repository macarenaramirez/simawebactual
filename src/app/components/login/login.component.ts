import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {SimaBackendSessionService} from '../../services/sima-backend/sima-backend-session.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserNamePassword} from '../../models/new/userNamePassword.model';
import {SiacwebBackendSessionService} from '../../services/siacweb-backend/siacweb-backend-session.service';
import {UserNamePasswordAppIdModel} from '../../models/new/userNamePasswordAppId.model';

declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rForm: FormGroup;

  isLoginError = false;
  mensaje: string;

  constructor(private fb: FormBuilder,
              private simaBackendSessionService: SimaBackendSessionService,
              private siacwebBackendSessionService: SiacwebBackendSessionService,
              private router: Router) {
    this.rForm = fb.group({
      'username': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(3)])]
    });
    this.rForm.setValue({
      'username': ['vinsfran'],
      'password': ['vinsfran01']
    });
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

  login(post) {
    const userNamePasswordAppIdModel = new class implements UserNamePasswordAppIdModel {
      username: string;
      password: string;
      app_id: string;
    };
    // userNamePassword.username = post.username;
    // userNamePassword.password = post.password;
    userNamePasswordAppIdModel.username = 'vinsfran';
    userNamePasswordAppIdModel.password = 'vinsfran01';
    userNamePasswordAppIdModel.app_id = '';
    this.siacwebBackendSessionService.login(userNamePasswordAppIdModel).subscribe(data => {
        if (data.status) {
          localStorage.setItem('username', userNamePasswordAppIdModel.username);
          localStorage.setItem('message', '');
          console.log('sessionId: ' + data.data);
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
