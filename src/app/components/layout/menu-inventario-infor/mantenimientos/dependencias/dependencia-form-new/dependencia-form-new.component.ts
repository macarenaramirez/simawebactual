import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InventarioInfoBackendDependenciaService} from '../../../../../../services/inventario-info-backend/inventario-info-backend-dependencia.service';
import {Dependencia} from '../../../../../../models/dependencia.model';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {SimaBackendSessionService} from '../../../../../../services/sima-backend/sima-backend-session.service';
import {TokenAppId} from '../../../../../../models/tokenAppId.model';
import {LoginUser} from '../../../../../../models/new/loginUser.model';

@Component({
  selector: 'app-dependencia-form-new',
  templateUrl: './dependencia-form-new.component.html',
  styleUrls: ['./dependencia-form-new.component.css']
})
export class DependenciaFormNewComponent implements OnInit {
  titulo: string;
  lista: string[];

  rForm: FormGroup;
  post: any;
  description: string;
  name = '';
  dependencia: Dependencia;

  tokenAppId: TokenAppId;
  error = false;
  mensajeError: string;

  constructor(private simaBackendService: SimaBackendSessionService,
              private fb: FormBuilder,
              private inventarioInfoBackendDependenciaService: InventarioInfoBackendDependenciaService,
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
    const loginUser = new class implements LoginUser {
      username: string;
      password: string;
    };
    loginUser.username = localStorage.getItem('username');
    loginUser.password = '';
    this.simaBackendService.getTokenAppId(loginUser).subscribe(data => {
        if (data.status) {
          this.tokenAppId = data.object;
          this.dependencia = new class implements Dependencia {
            id: number;
            nombre: string;
          };
          this.dependencia.id = 0;
          this.dependencia.nombre = post.nombre;
          this.inventarioInfoBackendDependenciaService.createDependencia(this.dependencia, this.tokenAppId).subscribe(res => {
              console.log(res);
              if (res.status) {
                this.router.navigate(['menu-inventario-informatica/mantenimientos/dependencias']);
              } else {
                this.error = true;
                this.mensajeError = res.message;
              }

            },
            (err: HttpErrorResponse) => {
              console.log(err);
            });
        } else {
          window.alert('Ocurrio un problema');
        }
      },
      (err: HttpErrorResponse) => {
        window.alert(err.message);
      });


  }

}
