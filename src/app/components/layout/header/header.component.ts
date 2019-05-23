import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {UsuarioModel} from '../../../models/new/usuario.model';
import {SessionIdModel} from '../../../models/new/sessionId.model';
import {SiacwebBackendSessionService} from '../../../services/siacweb-backend/siacweb-backend-session.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuarioModel: UsuarioModel;
  sessionIdModel: SessionIdModel;

  constructor(private siacwebBackendSessionService: SiacwebBackendSessionService, private router: Router) {
    this.usuarioModel = new UsuarioModel;
    this.sessionIdModel = new SessionIdModel();
  }

  ngOnInit() {
    this.getUser();
  }

  logout() {
    this.sessionIdModel.sessionId = localStorage.getItem('sessionId');
    this.siacwebBackendSessionService.logout(this.sessionIdModel).subscribe(data => {
        if (data.status) {
          localStorage.clear();
          sessionStorage.clear();
          this.siacwebBackendSessionService.setLoggedInStatus(false);
          this.router.navigate(['login']);
        } else {
          swal.fire('Ocurrió un problema cerrar la sesión del Usuario', data.message, 'warning');
        }
      },
      (err: HttpErrorResponse) => {
        swal.fire('Error al cerrar la sesión del Usuario', err.message, 'error');
      });
  }

  getUser() {
    this.sessionIdModel.sessionId = localStorage.getItem('sessionId');
    this.siacwebBackendSessionService.getUser(this.sessionIdModel).subscribe(data => {
        if (data.status) {
          this.usuarioModel = data.usuario;
        } else {
          swal.fire('Ocurrió un problema en Datos del Usuario', data.message, 'warning');
        }
      },
      (err: HttpErrorResponse) => {
        swal.fire('Error en Datos del Usuario', err.message, 'error');
      });
  }

}
