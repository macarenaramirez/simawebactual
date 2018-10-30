import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SimaBackendSessionService} from '../../../services/sima-backend/sima-backend-session.service';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../../../models/new/user';
import {LoginUser} from '../../../models/new/loginUser.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(private simaBackendService: SimaBackendSessionService, private router: Router) {
    this.user = new class implements User {
      apellido: string;
      codLugarOperativo: number;
      departamento: string;
      direccion: string;
      direccionGeneral: string;
      documento: string;
      email: string;
      nombre: string;
      nombreLugarOperativo: string;
      unidad: string;
      username: string;
    };
  }

  ngOnInit() {
    this.getUser();
  }

  logout() {
    const loginUser = new class implements LoginUser {
      username: string;
      password: string;
    };
    loginUser.username = localStorage.getItem('username');
    loginUser.password = '';
    this.simaBackendService.logout(loginUser).subscribe(data => {
        if (data.status) {
          localStorage.removeItem('username');
          this.router.navigate(['login']);
          this.simaBackendService.setLoggedInStatus(false);
        } else {
          window.alert('Ocurrio un problema');
        }
      },
      (err: HttpErrorResponse) => {
        window.alert(err.message);
      });
  }

  getUser() {
    const loginUser = new class implements LoginUser {
      username: string;
      password: string;
    };
    loginUser.username = localStorage.getItem('username');
    loginUser.password = '';
    this.simaBackendService.getUser(loginUser).subscribe(data => {
        if (data.status) {
          this.user = data.object;
        } else {
          window.alert('Ocurrio un problema');
        }
      },
      (err: HttpErrorResponse) => {
        window.alert(err.message);
      });
  }

}
