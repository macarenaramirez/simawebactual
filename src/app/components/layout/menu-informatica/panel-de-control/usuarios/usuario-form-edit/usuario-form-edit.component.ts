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
  selector: 'app-usuario-form-edit',
  templateUrl: './usuario-form-edit.component.html',
  styleUrls: ['./usuario-form-edit.component.css']
})
export class UsuarioFormEditComponent implements OnInit {
  titulo: string;
  lista: string[];

  rForm: FormGroup;
  name = '';

  userNameModel = new class implements UserNameModel {
    username: string;
  };

  usuarioEdit = new class implements UsuarioModel {
    id: number;
    userName: string;
    sessionTime: number;
    lugarOperativo = new class implements LugarOperativoModel {
      id: number;
      nombre: string;
      codLugar: number;
    };
  };

  error = false;
  mensajeError: string;

  lugaresOperativos: Array<LugarOperativoModel> = [];

  constructor(private simaBackendService: SimaBackendSessionService,
              private fb: FormBuilder,
              private simaBackendUsuarioServiceService: SimaBackendUsuarioServiceService,
              private simaBackendLugarOperativoServiceService: SimaBackendLugarOperativoServiceService,
              private router: Router) {
  }

  ngOnInit() {
    this.userNameModel.username = localStorage.getItem('username');
    const datosRetorno = this.router.getNavigatedData();
    this.usuarioEdit = datosRetorno[0];
    console.log(JSON.stringify(this.usuarioEdit));
    this.titulo = 'Editar Usuario';
    this.lista = ['Menu Sima', 'Panel de Control', 'Usuarios'];
    this.lista.push(this.titulo);
    this.rForm = this.fb.group({
      'userName': [this.usuarioEdit.userName, Validators.compose([Validators.required, Validators.minLength(5)])],
      'sessionTime': [this.usuarioEdit.sessionTime, Validators.compose([Validators.required])],
      'lugarOperativo': [this.usuarioEdit.lugarOperativo.id, Validators.compose([Validators.required])]
    });
    this.getListLugarOperativo();
  }

  save(post) {
    // console.log(JSON.stringify(post));
    this.usuarioEdit.userName = post.userName;
    this.usuarioEdit.sessionTime = post.sessionTime;

    console.log(JSON.stringify(this.lugaresOperativos));


    this.usuarioEdit.lugarOperativo.id = post.lugarOperativo;
    console.log('SAVEEDIT: ' + JSON.stringify(this.usuarioEdit));

    this.simaBackendUsuarioServiceService.edit(this.usuarioEdit, this.userNameModel).subscribe(res => {
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
