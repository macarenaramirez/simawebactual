import {Component, OnInit} from '@angular/core';
import {SessionIdPermissionModel} from '../../../../../models/new/sessionIdPermission.model';
import {MenuFormModel} from '../../../../../models/new/menuForm.model';
import {PageModel} from '../../../../../models/new/page.model';
import {Router} from '@angular/router';
import {SessionResourceService} from '../../../../../services/siacweb-backend/session-resource.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-reclamos-list',
  templateUrl: './reclamos-list.component.html',
  styleUrls: ['./reclamos-list.component.css']
})
export class MenuListComponent implements OnInit {

  titulo: string;
  lista: string[];

  menus: Array<MenuFormModel> = [];

  menuSeleccionado: MenuFormModel;

  page: PageModel;
  campo: string;
  orden: string;
  btnVerSubMenu: boolean;
  btnVolver: boolean;

  private sessionIdPermissionModel: SessionIdPermissionModel;

  constructor(public siacwebBackendSessionService: SessionResourceService,
              private router: Router) {
    this.sessionIdPermissionModel = new SessionIdPermissionModel();
    this.menuSeleccionado = new MenuFormModel();
  }

  ngOnInit() {
    this.menuSeleccionado.id = 0;
    this.menuSeleccionado.idPadre = 0;
    this.menuSeleccionado.nivel = 0;
    this.menuSeleccionado.nombre = 'Listado de Reclamos';

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
  }

  nuevo() {
    this.router.navigateByData({
      url: ['/menu-informatica/panel-de-control/dashboard_soporte/form-new'],
      data: [this.menuSeleccionado]
    });
  }

  edit(menuEdit: MenuFormModel) {
    this.router.navigateByData({
      url: ['/menu-informatica/panel-de-control/lista_componentes/form-edit'],
      data: [menuEdit, this.menuSeleccionado]
    });
  }
}
