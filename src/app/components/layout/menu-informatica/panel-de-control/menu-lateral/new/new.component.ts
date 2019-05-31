import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {MenuFormModel} from '../../../../../../models/new/menuForm.model';
import swal from 'sweetalert2';
import {MenuResourceService} from '../../../../../../services/simaweb-backend/menu-resource.service';
import {StorageService} from '../../../../../../services/storage.service';

@Component({
  selector: 'app-menu-lateral-form-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  titulo: string;
  lista: string[];

  rForm: FormGroup;
  name = '';

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

  menuHijo = new class implements MenuFormModel {
    id: number;
    nombre: string;
    idPadre: number;
    permiso: string;
    routerLink: string;
    nivel: number;
    orden: number;
    status: boolean;
  };

  constructor(private fb: FormBuilder,
              private menuResourceService: MenuResourceService,
              private storageService: StorageService,
              private router: Router) {
  }

  ngOnInit() {
    const datosRetorno = this.router.getNavigatedData();
    this.menuPadre = datosRetorno[0];
    this.titulo = 'Nuevo Sub Menu para ' + this.menuPadre.nombre;
    this.lista = ['Menu Informatica', 'Panel de Control', this.menuPadre.nombre];
    this.lista.push(this.titulo);
    this.rForm = this.fb.group({
      'nombre': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'permiso': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'routerLink': [null],
      'orden': [null, Validators.compose([Validators.required, Validators.minLength(1)])],
      'status': [null, Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }

  save(post) {
    this.menuHijo.id = 0;
    this.menuHijo.idPadre = this.menuPadre.id;
    this.menuHijo.nivel = this.menuPadre.nivel + 1;
    this.menuHijo.nombre = post.nombre;
    this.menuHijo.permiso = post.permiso;
    this.menuHijo.routerLink = 'not_link';
    if (this.menuHijo.nivel > 2) {
      this.menuHijo.routerLink = post.routerLink;
    }
    this.menuHijo.orden = post.orden;
    this.menuHijo.status = post.status;
    this.menuResourceService.create(this.menuHijo, this.storageService.sessionId).subscribe(res => {
        console.log(res);
        if (res.status) {
          this.back();
        } else {
          swal.fire('Ocurrió un problema al guardar el Menu', res.message, 'warning');
        }
      },
      (err: HttpErrorResponse) => {
        swal.fire('Ocurrió un error al guardar el Menu, err.message', 'error');
      });
  }

  back() {
    this.router.navigateByData({
      url: ['menu-informatica/panel-de-control/menu-lateral/list'],
      data: [this.menuPadre]
    });
  }

}
