import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {MenuFormModel} from '../../../../../models/new/menuForm.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-reclamos-form-edit',
  templateUrl: './reclamos-form-edit.component.html',
  styleUrls: ['./reclamos-form-edit.component.css']
})
export class MenuFormEditComponent implements OnInit {
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

  constructor(private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    const datosRetorno = this.router.getNavigatedData();
    this.menuSeleccionado = datosRetorno[0];
    this.menuPadre = datosRetorno[1];
    this.titulo = 'Editar ' + this.menuSeleccionado.nombre;
    this.lista = ['Menu Informatica', 'Panel de Control', this.menuPadre.nombre];
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
  }

  back() {
    this.router.navigateByData({
      url: ['menu-informatica/panel-de-control/reclamos/list'],
      data: [this.menuPadre]
    });
  }

}
