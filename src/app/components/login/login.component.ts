import {Component, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import {UserNamePasswordModel} from '../../models/new/userNamePassword.model';
import {StorageService} from '../../services/storage.service';
import {SessionService} from '../../services/session.service';
import {Router} from '@angular/router';

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
    this.sessionService.login(this.userNamePasswordModel);
  }

}
