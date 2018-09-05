import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '../../../../../node_modules/@angular/common/http';
import {AuthenticatorService} from '../../../services/authenticator/authenticator.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  user: string;
  email: string;
  documento: string;
  nombre: string;
  apellido: string;
  direccionGeneral: string;
  direccion: string;
  departamento: string;
  unidad: string;

  constructor(private authenticatorService: AuthenticatorService, private router: Router) {
  }

  ngOnInit() {
    this.user = localStorage.getItem('userName');
    this.email = localStorage.getItem('email');
    this.documento = localStorage.getItem('documento');
    this.nombre = localStorage.getItem('nombre');
    this.apellido = localStorage.getItem('apellido');
    this.direccionGeneral = localStorage.getItem('direccionGeneral');
    this.direccion = localStorage.getItem('direccion');
    this.departamento = localStorage.getItem('departamento');
    this.unidad = localStorage.getItem('unidad');
  }

  Logout() {
    this.authenticatorService.invalidateToken().subscribe((data: any) => {
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
        location.reload();
        this.router.navigate(['/login']);
      },
      (err: HttpErrorResponse) => {
        console.log('Error');
      });
  }

}
