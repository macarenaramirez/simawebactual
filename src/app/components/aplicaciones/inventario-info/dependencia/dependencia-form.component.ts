import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InventarioInfoBackendService} from '../../../../services/inventarioInfoBackend/inventario-info-backend.service';
import {Dependencia} from '../../../../models/dependencia.model';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dependencia-form',
  templateUrl: './dependencia-form.component.html',
  styleUrls: ['./dependencia-form.component.css']
})
export class DependenciaFormComponent implements OnInit {
  titulo: string;
  lista: string[];

  rForm: FormGroup;
  post: any;
  description: string;
  name = '';
  dependencia: Dependencia;

  constructor(private fb: FormBuilder,
              private inventarioInfoBackendService: InventarioInfoBackendService,
              private router: Router) {
    this.titulo = 'Nueva Dependencia';
    this.lista = ['Menu Inventario Informatica', 'Mantenimientos', 'Dependencias'];
    this.lista.push(this.titulo);


    this.rForm = fb.group({
      'nombre': [null, Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }

  ngOnInit() {
  }

  addPost(post) {
    console.log('post' + post.nombre);
    this.dependencia = new class implements Dependencia {
      id: number;
      nombre: string;
    };
    this.dependencia.nombre = post.nombre;
    this.inventarioInfoBackendService.createDependencia(this.dependencia).subscribe((data2: any) => {
        console.log(data2);
        this.router.navigate(['menu-inventario-informatica/mantenimientos/dependencias']);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      });
  }

}
