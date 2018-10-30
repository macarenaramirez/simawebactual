import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {SimaBackendSessionService} from '../../services/sima-backend/sima-backend-session.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginUser} from '../../models/new/loginUser.model';

declare var $;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  rForm: FormGroup;
  loginUser: LoginUser;

  isLoginError = false;
  mensaje: string;

  constructor(private fb: FormBuilder,
              private simaBackendService: SimaBackendSessionService,
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
    this.loginUser = new class implements LoginUser {
      username: string;
      password: string;
    };
    // this.loginUser.username = post.username;
    // this.loginUser.password = post.password;
    this.loginUser.username = 'vinsfran';
    this.loginUser.password = 'vinsfran01';
    this.simaBackendService.login(this.loginUser).subscribe(data => {
        this.mensaje = data.message;
        if (data.status) {
          localStorage.setItem('username', this.loginUser.username);
          localStorage.setItem('message', '');
          this.router.navigate(['']);
          this.isLoginError = false;
        } else {
          this.isLoginError = true;
        }
      },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
        this.mensaje = err.message;
      });
  }

}
