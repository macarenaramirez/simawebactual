import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {SimaBackendSessionService} from '../../../../../../services/sima-backend/sima-backend-session.service';
import {TokenAppId} from '../../../../../../models/tokenAppId.model';
import {UserName} from '../../../../../../models/new/userName.model';
import {MenuForm} from '../../../../../../models/new/menuForm.model';
import {SimaBackendMenuServiceService} from '../../../../../../services/sima-backend/sima-backend-menu.service';

@Component({
  selector: 'app-menu-form-new',
  templateUrl: './menu-form-new.component.html',
  styleUrls: ['./menu-form-new.component.css']
})
export class MenuFormNewComponent implements OnInit {
  titulo: string;
  lista: string[];

  rForm: FormGroup;
  post: any;
  description: string;
  name = '';

  userName = new class implements UserName {
    username: string;
  };

  menuPadre = new class implements MenuForm {
    id: number;
    nombre: string;
    idPadre: number;
    permiso: string;
    routerLink: string;
    nivel: number;
    orden: number;
    status: boolean;
  };

  menuHijo = new class implements MenuForm {
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

    this.userName.username = localStorage.getItem('username');
    // this.menu = JSON.parse(JSON.stringify(this.router.getNavigatedData()[0]));
    this.menuPadre = this.router.getNavigatedData()[0];

    // if (this.menuPadre.nivel === 0) {
    //   this.titulo = 'Nuevo ' + this.menuPadre.nombre;
    // } else {
    //
    // }
    this.titulo = 'Nuevo Sub Menu para ' + this.menuPadre.nombre;
    this.lista = ['Menu Sima', 'Panel de Control', this.menuPadre.nombre];
    this.lista.push(this.titulo);

    this.rForm = this.fb.group({
      'nombre': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'permiso': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'routerLink': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'orden': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'status': [null, Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }

  addPost(post) {

    this.menuHijo.id = 0;
    this.menuHijo.idPadre = this.menuPadre.id;
    this.menuHijo.nivel = this.menuPadre.nivel + 1;
    this.menuHijo.nombre = post.nombre;
    this.menuHijo.permiso = post.permiso;
    this.menuHijo.routerLink = post.routerLink;
    this.menuHijo.orden = post.orden;
    this.menuHijo.status = post.status;

    this.simaBackendMenuServiceService.createMenu(this.menuHijo, this.userName).subscribe(res => {
        console.log(res);
        if (res.status) {
          this.router.navigateByData({
            url: ['menu-sima/panel-de-control/menu-lateral/list'],
            data: [this.menuPadre]
          });
        } else {
          this.error = true;
          this.mensajeError = res.message;
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      });


  }

}
