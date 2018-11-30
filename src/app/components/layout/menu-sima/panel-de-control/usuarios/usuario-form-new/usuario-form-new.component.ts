import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {SimaBackendSessionService} from '../../../../../../services/sima-backend/sima-backend-session.service';
import {UserNameModel} from '../../../../../../models/new/userName.model';
import {UsuarioModel} from '../../../../../../models/new/usuario.model';
import {LugarOperativoModel} from '../../../../../../models/new/lugarOperativo.model';
import {SimaBackendUsuarioServiceService} from '../../../../../../services/sima-backend/sima-backend-usuario.service';
import {SimaBackendLugarOperativoServiceService} from '../../../../../../services/sima-backend/sima-backend-lugar-operativo.service';

@Component({
  selector: 'app-usuario-form-new',
  templateUrl: './usuario-form-new.component.html',
  styleUrls: ['./usuario-form-new.component.css']
})
export class UsuarioFormNewComponent implements OnInit {
  titulo: string;
  lista: string[];

  rForm: FormGroup;
  name = '';

  userNameModel = new class implements UserNameModel {
    username: string;
  };

  usuarioSeleccionado = new class implements UsuarioModel {
    id: number;
    userName: string;
    sessionTime: number;
    lugarOperativo: LugarOperativoModel;
  };

  error = false;
  mensajeError: string;

  lugaresOperativos: Array<LugarOperativoModel> = [];

  lugarOperativoModel = new class implements LugarOperativoModel {
    id: number;
    nombre: string;
    codLugar: number;
  };

  constructor(private simaBackendService: SimaBackendSessionService,
              private fb: FormBuilder,
              private simaBackendUsuarioServiceService: SimaBackendUsuarioServiceService,
              private simaBackendLugarOperativoServiceService: SimaBackendLugarOperativoServiceService,
              private router: Router) {
  }

  ngOnInit() {
    this.userNameModel.username = localStorage.getItem('username');
    this.titulo = 'Nuevo Usuario';
    this.lista = ['Menu Sima', 'Panel de Control', 'Usuarios'];
    this.lista.push(this.titulo);
    this.rForm = this.fb.group({
      'username': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      'sessionTime': [null, Validators.compose([Validators.required])],
      'lugarOperativo': [null, Validators.compose([Validators.required])]
    });

    // this.lugarOperativoModel.id = 10;
    // this.lugarOperativoModel.nombre = 'prueba';
    // this.lugarOperativoModel.codLugar = 11;
    // this.lugaresOperativos.push(this.lugarOperativoModel);

    this.getListLugarOperativo();
  }

  save(post) {
    console.log(JSON.stringify(post));
    this.usuarioSeleccionado.id = 0;
    this.usuarioSeleccionado.userName = post.userName;
    this.usuarioSeleccionado.sessionTime = post.sessionTime;
    this.lugarOperativoModel.id = post.lugarOperativo;
    this.lugarOperativoModel.nombre = '';
    this.lugarOperativoModel.codLugar = 0;
    this.usuarioSeleccionado.lugarOperativo = this.lugarOperativoModel;
    console.log(JSON.stringify(this.usuarioSeleccionado));

    this.simaBackendUsuarioServiceService.save(this.usuarioSeleccionado, this.userNameModel).subscribe(res => {
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

  getListLugarOperativo() {
    this.simaBackendLugarOperativoServiceService.listAll(this.userNameModel).subscribe(
      res => {
        if (res.status) {
          console.log(res);
          this.lugaresOperativos = res.object;
        } else {
          window.alert('Ocurrio un problema');
        }
      },
      (errors) => {
        window.alert(errors.message);
      }
    );
  }

  back() {
    this.router.navigateByData({
      url: ['menu-sima/panel-de-control/usuarios/list'],
      data: ['']
    });
  }

}
