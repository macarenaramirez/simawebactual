import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {SimaBackendSessionService} from '../../services/sima-backend/sima-backend-session.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserNamePassword} from '../../models/new/userNamePassword.model';

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
    const userNamePassword = new class implements UserNamePassword {
      username: string;
      password: string;
    };
    // userNamePassword.username = post.username;
    // userNamePassword.password = post.password;
    userNamePassword.username = 'vinsfran';
    userNamePassword.password = 'vinsfran01';
    this.simaBackendSessionService.login(userNamePassword).subscribe(data => {
        if (data.status) {
          localStorage.setItem('username', userNamePassword.username);
          localStorage.setItem('message', '');
          console.log('username: ' + userNamePassword.username);
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
