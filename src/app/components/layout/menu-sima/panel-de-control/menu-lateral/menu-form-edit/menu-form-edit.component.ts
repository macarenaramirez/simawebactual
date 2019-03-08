import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {SimaBackendSessionService} from '../../../../../../services/sima-backend/sima-backend-session.service';
import {UserNameModel} from '../../../../../../models/new/userName.model';
import {MenuFormModel} from '../../../../../../models/new/menuForm.model';
import {SimaBackendMenuServiceService} from '../../../../../../services/sima-backend/sima-backend-menu.service';

@Component({
  selector: 'app-menu-form-edit',
  templateUrl: './menu-form-edit.component.html',
  styleUrls: ['./menu-form-edit.component.css']
})
export class MenuFormEditComponent implements OnInit {
  titulo: string;
  lista: string[];

  rForm: FormGroup;
  name = '';

  userNameModel = new class implements UserNameModel {
    username: string;
  };

  menuPadre = new class implements MenuFormModel {
    id: number;
    nombre: string;
    idPadre: number;
    permiso: string;
    routerLink: string;
    nivel: number;
    orden: number;
    status: boolean;
  };

  menuSeleccionado = new class implements MenuFormModel {
    id: number;
    nombre: string;
    idPadre: number;
    permiso: string;
    routerLink: string;
    nivel: number;
    orden: number;
    status: boolean;
  };

  error = false;
  mensajeError: string;

  constructor(private simaBackendService: SimaBackendSessionService,
              private fb: FormBuilder,
              private simaBackendMenuServiceService: SimaBackendMenuServiceService,
              private router: Router) {
  }

  ngOnInit() {
    this.userNameModel.username = localStorage.getItem('username');
    const datosRetorno = this.router.getNavigatedData();
    this.menuSeleccionado = datosRetorno[0];
    this.menuPadre = datosRetorno[1];
    this.titulo = 'Editar ' + this.menuSeleccionado.nombre;
    this.lista = ['Menu Sima', 'Panel de Control', this.menuPadre.nombre];
    this.lista.push(this.titulo);
    this.rForm = this.fb.group({
      'nombre': [this.menuSeleccionado.nombre, Validators.compose([Validators.required, Validators.minLength(3)])],
      'permiso': [this.menuSeleccionado.permiso, Validators.compose([Validators.required, Validators.minLength(3)])],
      'routerLink': [this.menuSeleccionado.routerLink],
      'orden': [this.menuSeleccionado.orden, Validators.compose([Validators.required, Validators.minLength(1)])],
      'status': [this.menuSeleccionado.status, Validators.required]
    });
  }

  save(post) {
    this.menuSeleccionado.nombre = post.nombre;
    this.menuSeleccionado.permiso = post.permiso;
    this.menuSeleccionado.routerLink = 'not_link';
    if (this.menuSeleccionado.nivel > 2) {
      this.menuSeleccionado.routerLink = post.routerLink;
    }
    this.menuSeleccionado.orden = post.orden;
    this.menuSeleccionado.status = post.status;
    this.simaBackendMenuServiceService.edit(this.menuSeleccionado, this.userNameModel).subscribe(res => {
        console.log(res);
        if (res.status) {
          this.back();
        } else {
          this.error = true;
          this.mensajeError = res.message;
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      });
  }

  back() {
    this.router.navigateByData({
      url: ['menu-sima/panel-de-control/menu-lateral/list'],
      data: [this.menuPadre]
    });
  }

}
