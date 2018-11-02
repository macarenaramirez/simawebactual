import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SimaBackendSessionService} from '../../../services/sima-backend/sima-backend-session.service';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../../../models/new/user';
import {UserName} from '../../../models/new/userName.model';

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
    const userName = new class implements UserName {
      username: string;
    };
    userName.username = localStorage.getItem('username');
    this.simaBackendService.logout(userName).subscribe(data => {
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
    const userName = new class implements UserName {
      username: string;
    };
    userName.username = localStorage.getItem('username');
    this.simaBackendService.getUser(userName).subscribe(data => {
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
