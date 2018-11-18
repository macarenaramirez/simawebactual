import {Component, OnInit} from '@angular/core';
import {SimaBackendSessionService} from '../../../../../../services/sima-backend/sima-backend-session.service';
import {UserNamePermiso} from '../../../../../../models/new/userNamePermiso.model';
import {HttpErrorResponse} from '@angular/common/http';
import {SimaBackendMenuServiceService} from '../../../../../../services/sima-backend/sima-backend-menu.service';
import {UserName} from '../../../../../../models/new/userName.model';
import {MenuForm} from '../../../../../../models/new/menuForm.model';
import {MenuPage} from '../../../../../../models/new/menuPage.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  titulo: string;
  lista: string[];

  menus: Array<MenuForm> = [];

  menuSeleccionado = new class implements MenuForm {
    id: number;
    nombre: string;
    idPadre: number;
    permiso: string;
    routerLink: string;
    nivel: number;
    orden: number;
    status: boolean;
  };

  page: MenuPage;
  campo: string;
  orden: string;

  btnNew = false;

  btnVerSubMenu: boolean;
  btnVolver: boolean;
  userName = new class implements UserName {
    username: string;
  };
  userNamePermiso = new class implements UserNamePermiso {
    username: string;
    permiso: string;
  };

  constructor(private simaBackendService: SimaBackendSessionService,
              private simaBackendMenuServiceService: SimaBackendMenuServiceService,
              private router: Router) {
  }

  ngOnInit() {
    this.userName.username = localStorage.getItem('username');
    this.userNamePermiso.username = this.userName.username;
    this.userNamePermiso.permiso = 'sima_crear_menu';
    this.simaBackendService.isAuthorized(this.userNamePermiso).subscribe(
      data => {
        this.btnNew = data.status;
      },
      (err: HttpErrorResponse) => {
        window.alert(err.message);
      });

    this.menuSeleccionado.id = 0;
    this.menuSeleccionado.idPadre = 0;
    this.menuSeleccionado.nivel = 0;
    this.menuSeleccionado.nombre = 'Menu Lateral';

    const datosRetorno = this.router.getNavigatedData();
    if (datosRetorno && datosRetorno[0]) {
      this.menuSeleccionado = datosRetorno[0];
    }

    this.titulo = this.menuSeleccionado.nombre;
    this.lista = ['Menu Sima', 'Panel de Control', this.titulo];
    this.btnVerSubMenu = true;
    this.btnVolver = false;
    if (this.menuSeleccionado.id > 0) {
      this.btnVolver = true;
    }
    this.campo = 'id';
    this.orden = 'asc';
    this.listMenuByIdPadre(this.menuSeleccionado.id, 0, 10, this.campo, this.orden);
  }

  listMenuByIdPadre(idPadre: number, page: number, size: number, campo: string, orden: string) {
    this.simaBackendMenuServiceService.listMenuByIdPadre(idPadre, page, size, campo, orden, this.userName).subscribe(
      res => {
        if (res.status) {
          this.page = res.object;
          this.menus = this.page.content;
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

  viewSubMenu(menuSeleccionado: MenuForm) {
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
    this.simaBackendMenuServiceService.getMenuById(this.menuSeleccionado.idPadre, this.userName).subscribe(
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
      url: ['/menu-sima/panel-de-control/menu-lateral/form-new'],
      data: [this.menuSeleccionado]
    });
  }

  edit(menuEdit: MenuForm) {
    this.router.navigateByData({
      url: ['/menu-sima/panel-de-control/menu-lateral/form-edit'],
      data: [menuEdit, this.menuSeleccionado]
    });
  }
}
