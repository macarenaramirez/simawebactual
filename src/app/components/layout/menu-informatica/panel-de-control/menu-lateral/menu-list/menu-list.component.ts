import {Component, OnInit} from '@angular/core';
import {SimaBackendSessionService} from '../../../../../../services/sima-backend/sima-backend-session.service';
import {SessionIdPermissionModel} from '../../../../../../models/new/sessionIdPermission.model';
import {SimaBackendMenuServiceService} from '../../../../../../services/sima-backend/sima-backend-menu.service';
import {MenuFormModel} from '../../../../../../models/new/menuForm.model';
import {PageModel} from '../../../../../../models/new/page.model';
import {Router} from '@angular/router';
import {SiacwebBackendSessionService} from '../../../../../../services/siacweb-backend/siacweb-backend-session.service';
import {UserNameModel} from '../../../../../../models/new/userName.model';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  titulo: string;
  lista: string[];

  menus: Array<MenuFormModel> = [];

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

  page: PageModel;
  campo: string;
  orden: string;
  btnVerSubMenu: boolean;
  btnVolver: boolean;
  userNameModel: UserNameModel;
  private sessionIdPermissionModel: SessionIdPermissionModel;

  constructor(public siacwebBackendSessionService: SiacwebBackendSessionService,
              private simaBackendService: SimaBackendSessionService,
              private simaBackendMenuServiceService: SimaBackendMenuServiceService,
              private router: Router) {
    this.sessionIdPermissionModel = new SessionIdPermissionModel();
    this.userNameModel = new UserNameModel();
  }

  ngOnInit() {
    this.userNameModel.username = localStorage.getItem('username');
    // this.sessionIdPermissionModel.sessionId = localStorage.getItem('sessionId');
    // this.sessionIdPermissionModel.permission = 'informatica_crear_menu';
    // this.siacwebBackendSessionService.isAuthorized(this.sessionIdPermissionModel).subscribe(
    //   data => {
    //     this.btnNew = data.status;
    //   },
    //   (err: HttpErrorResponse) => {
    //     window.alert(err.message);
    //   });
    //
    // this.userNamePermiso.permiso = 'informatica_editar_menu';
    // this.simaBackendService.isAuthorized(this.userNamePermiso).subscribe(
    //   data => {
    //     this.btnEdit = data.status;
    //   },
    //   (err: HttpErrorResponse) => {
    //     window.alert(err.message);
    //   });

    this.menuSeleccionado.id = 0;
    this.menuSeleccionado.idPadre = 0;
    this.menuSeleccionado.nivel = 0;
    this.menuSeleccionado.nombre = 'Menu Lateral';

    const datosRetorno = this.router.getNavigatedData();
    if (datosRetorno && datosRetorno[0]) {
      this.menuSeleccionado = datosRetorno[0];
    }

    this.titulo = this.menuSeleccionado.nombre;
    this.lista = ['Menu Informatica', 'Panel de Control', this.titulo];
    this.btnVerSubMenu = true;
    this.btnVolver = false;
    if (this.menuSeleccionado.id > 0) {
      this.btnVolver = true;
    }
    if (this.menuSeleccionado.nivel === 2) {
      this.btnVerSubMenu = false;
    }
    this.campo = 'id';
    this.orden = 'asc';
    this.listMenuByIdPadre(this.menuSeleccionado.id, 0, 10, this.campo, this.orden);
  }

  listMenuByIdPadre(idPadre: number, page: number, size: number, campo: string, orden: string) {
    this.simaBackendMenuServiceService.listMenuByIdPadre(idPadre, page, size, campo, orden, this.userNameModel).subscribe(
      res => {
        if (res.status) {
          this.page = res.object;
          this.menus = this.page.content;
        } else {
          window.alert('Ocurrió un problema');
        }
      },
      (errors) => {
        window.alert(errors.message);
      }
    );
  }

  changePage(event) {
    this.listMenuByIdPadre(this.menuSeleccionado.idPadre, event.page, event.size, this.campo, this.orden);
  }

  sortingPage(campo: string) {
    this.campo = campo;
    if (this.orden === 'asc') {
      this.orden = 'desc';
    } else {
      this.orden = 'asc';
    }
    this.listMenuByIdPadre(this.menuSeleccionado.idPadre, this.page.number, this.page.size, this.campo, this.orden);
  }

  setClasses(campo: string) {
    let classes = 'sorting_asc';
    if (this.campo === campo && this.orden === 'desc') {
      classes = 'sorting_desc';
    }
    return classes;
  }

  viewSubMenu(menuSeleccionado: MenuFormModel) {
    this.menuSeleccionado = menuSeleccionado;
    this.titulo = this.menuSeleccionado.nombre;
    if (this.menuSeleccionado.id > 0) {
      this.btnVolver = true;
    }
    if (this.menuSeleccionado.nivel > 1) {
      this.btnVerSubMenu = false;
    }
    this.lista.push(this.titulo);
    this.listMenuByIdPadre(this.menuSeleccionado.id, this.page.number, this.page.size, this.campo, this.orden);
  }

  volver() {
    this.btnVerSubMenu = true;
    if (this.menuSeleccionado.idPadre === 0) {
      this.btnVolver = false;
    }
    this.lista.pop();
    this.listMenuByIdPadre(this.menuSeleccionado.idPadre, this.page.number, this.page.size, this.campo, this.orden);
    this.simaBackendMenuServiceService.getMenuById(this.menuSeleccionado.idPadre, this.userNameModel).subscribe(
      res => {
        this.menuSeleccionado = res.object;
        this.titulo = this.menuSeleccionado.nombre;
      },
      (errors) => {
        window.alert(errors.message);
      }
    );
  }

  nuevo() {
    this.router.navigateByData({
      url: ['/menu-informatica/panel-de-control/menu-lateral/form-new'],
      data: [this.menuSeleccionado]
    });
  }

  edit(menuEdit: MenuFormModel) {
    this.router.navigateByData({
      url: ['/menu-informatica/panel-de-control/menu-lateral/form-edit'],
      data: [menuEdit, this.menuSeleccionado]
    });
  }
}
