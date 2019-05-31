import {Component, OnInit} from '@angular/core';
import {SessionIdPermissionModel} from '../../../../../../models/new/sessionIdPermission.model';
import {MenuFormModel} from '../../../../../../models/new/menuForm.model';
import {PageModel} from '../../../../../../models/new/page.model';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {MenuResourceService} from '../../../../../../services/simaweb-backend/menu-resource.service';
import {SessionService} from '../../../../../../services/session.service';
import {StorageService} from '../../../../../../services/storage.service';

@Component({
  selector: 'app-menu-lateral-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  titulo: string;
  lista: string[];

  menus: MenuFormModel[];

  menuSeleccionado: MenuFormModel;

  page: PageModel;
  campo: string;
  orden: string;
  btnVerSubMenu: boolean;
  btnVolver: boolean;

  private sessionIdPermissionModel: SessionIdPermissionModel;

  constructor(public sessionService: SessionService,
              private storageService: StorageService,
              private menuResourceService: MenuResourceService,
              private router: Router) {
    this.sessionIdPermissionModel = new SessionIdPermissionModel();
    this.menuSeleccionado = new MenuFormModel();
  }

  ngOnInit() {
    this.menuSeleccionado.id = 0;
    this.menuSeleccionado.idPadre = 0;
    this.menuSeleccionado.nivel = 0;
    this.menuSeleccionado.nombre = 'Menu Lateral';

    const datosRetorno = this.router.getNavigatedData();
    if (datosRetorno && datosRetorno[0]) {
      this.menuSeleccionado = datosRetorno[0];
    }

    this.lista = ['Menu Informatica', 'Panel de Control', this.menuSeleccionado.nombre];
    this.setTitulo();
    this.btnVerSubMenu = true;
    this.btnVolver = false;
    if (this.menuSeleccionado.id > 0) {
      this.btnVolver = true;
    }
    if (this.menuSeleccionado.nivel === 2) {
      this.btnVerSubMenu = false;
    }
    this.campo = 'orden';
    this.orden = 'asc';
    this.listMenuByIdPadre(this.menuSeleccionado.id, 0, 10, this.campo, this.orden);
  }

  listMenuByIdPadre(idPadre: number, page: number, size: number, campo: string, orden: string) {
    this.menuResourceService.listMenuByIdPadre(idPadre, page, size, campo, orden, this.storageService.sessionId).subscribe(
      res => {
        if (res.status) {
          this.page = res.page;
          this.menus = this.page.content;
        } else {
          swal.fire('Ocurrió un problema al listar los Menus', res.message, 'warning');
        }
      },
      (errors) => {
        swal.fire('Ocurrió un error al listar los Menus', errors.message, 'error');
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
    this.lista.push(this.menuSeleccionado.nombre);

    if (this.menuSeleccionado.id > 0) {
      this.btnVolver = true;
    }
    if (this.menuSeleccionado.nivel > 1) {
      this.btnVerSubMenu = false;
    }
    this.listMenuByIdPadre(this.menuSeleccionado.id, this.page.number, this.page.size, this.campo, this.orden);
    this.setTitulo();
  }

  volver() {
    this.btnVerSubMenu = true;
    if (this.menuSeleccionado.idPadre === 0) {
      this.btnVolver = false;
    }
    this.listMenuByIdPadre(this.menuSeleccionado.idPadre, this.page.number, this.page.size, this.campo, this.orden);
    this.menuResourceService.getMenuById(this.menuSeleccionado.idPadre, this.storageService.sessionId).subscribe(
      res => {
        this.menuSeleccionado = res.menu;

      },
      (errors) => {
        window.alert(errors.message);
      }
    );
    this.lista.pop();
    this.setTitulo();
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

  setTitulo() {
    this.titulo = this.lista[this.lista.length - 1];
  }
}
