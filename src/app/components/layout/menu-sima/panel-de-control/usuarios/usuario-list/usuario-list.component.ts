import {Component, OnInit} from '@angular/core';
import {SimaBackendSessionService} from '../../../../../../services/sima-backend/sima-backend-session.service';
import {UserNamePermiso} from '../../../../../../models/new/userNamePermiso.model';
import {HttpErrorResponse} from '@angular/common/http';
import {UserNameModel} from '../../../../../../models/new/userName.model';
import {PageModel} from '../../../../../../models/new/page.model';
import {Router} from '@angular/router';
import {SimaBackendUsuarioServiceService} from '../../../../../../services/sima-backend/sima-backend-usuario.service';
import {UsuarioModel} from '../../../../../../models/new/usuario.model';
import {LugarOperativoModel} from '../../../../../../models/new/lugarOperativo.model';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

  titulo: string;
  lista: string[];

  usuarios: Array<UsuarioModel> = [];

  usuarioSeleccionado = new class implements UsuarioModel {
    id: number;
    userName: string;
    sessionTime: number;
    lugarOperativo: LugarOperativoModel;
  };

  page: PageModel;
  campo: string;
  orden: string;

  btnNew = false;
  btnEdit = false;

  userNameModel = new class implements UserNameModel {
    username: string;
  };
  userNamePermiso = new class implements UserNamePermiso {
    username: string;
    permiso: string;
  };

  constructor(private simaBackendService: SimaBackendSessionService,
              private simaBackendUsuarioServiceService: SimaBackendUsuarioServiceService,
              private router: Router) {
  }

  ngOnInit() {
    this.userNameModel.username = localStorage.getItem('username');
    this.userNamePermiso.username = this.userNameModel.username;
    this.userNamePermiso.permiso = 'sima_crear_usuario';
    this.simaBackendService.isAuthorized(this.userNamePermiso).subscribe(
      data => {
        this.btnNew = data.status;
      },
      (err: HttpErrorResponse) => {
        window.alert(err.message);
      });

    this.userNamePermiso.permiso = 'sima_editar_usuario';
    this.simaBackendService.isAuthorized(this.userNamePermiso).subscribe(
      data => {
        this.btnEdit = data.status;
      },
      (err: HttpErrorResponse) => {
        window.alert(err.message);
      });

    this.usuarioSeleccionado.id = 0;
    this.usuarioSeleccionado.userName = '';
    this.usuarioSeleccionado.sessionTime = 30;
    this.usuarioSeleccionado.lugarOperativo = null;
    this.titulo = 'Usuarios';
    this.lista = ['Menu Sima', 'Panel de Control', this.titulo];
    this.campo = 'id';
    this.orden = 'asc';
    this.listAll(0, 10, this.campo, this.orden);
  }

  listAll(page: number, size: number, campo: string, orden: string) {
    this.simaBackendUsuarioServiceService.listAll(page, size, campo, orden, this.userNameModel).subscribe(
      res => {
        if (res.status) {
          this.page = res.object;
          this.usuarios = this.page.content;
        } else {
          window.alert('Ocurrio un problema');
        }
      },
      (errors) => {
        window.alert(errors.message);
      }
    );
  }

  changePage(event) {
    this.listAll(event.page, event.size, this.campo, this.orden);
  }

  sortingPage(campo: string) {
    this.campo = campo;
    if (this.orden === 'asc') {
      this.orden = 'desc';
    } else {
      this.orden = 'asc';
    }
    this.listAll(this.page.number, this.page.size, this.campo, this.orden);
  }

  setClasses(campo: string) {
    let classes = 'sorting_asc';
    if (this.campo === campo && this.orden === 'desc') {
      classes = 'sorting_desc';
    }
    return classes;
  }

  nuevo() {
    this.router.navigateByData({
      url: ['/menu-sima/panel-de-control/usuarios/form-new'],
      data: [this.usuarioSeleccionado]
    });
  }

  edit(usuarioEdit: UsuarioModel) {
    this.router.navigateByData({
      url: ['/menu-sima/panel-de-control/usuarios/form-edit'],
      data: [usuarioEdit]
    });
  }
}
