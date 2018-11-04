import {Component, OnInit} from '@angular/core';
import {SimaBackendSessionService} from '../../../../../../services/sima-backend/sima-backend-session.service';
import {UserNamePermiso} from '../../../../../../models/new/userNamePermiso.model';
import {HttpErrorResponse} from '@angular/common/http';
import {SimaBackendMenuServiceService} from '../../../../../../services/sima-backend/sima-backend-menu.service';
import {UserName} from '../../../../../../models/new/userName.model';
import {Menu} from '../../../../../../models/new/menu.model';
import {MenuPage} from '../../../../../../models/new/menuPage.model';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  titulo: string;
  lista: string[];

  menus: Array<Menu> = [];
  menu: Menu;
  menuNivel1: Menu;
  menuNivel2: Menu;
  page: MenuPage;
  campo: string;
  orden: string;

  btnNuevaDependencia = false;
  idPadre: number;

  btnVerSubMenu: boolean;
  btnVolver: boolean;

  constructor(private simaBackendService: SimaBackendSessionService,
              private simaBackendMenuServiceService: SimaBackendMenuServiceService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.titulo = 'Menus';
    this.lista = ['Menu Informatica', 'Panel de Control', 'Menus'];
  }

  ngOnInit() {
    this.btnVerSubMenu = true;
    this.btnVolver = false;
    this.campo = 'id';
    this.orden = 'asc';
    this.idPadre = 0;
    // this.activatedRoute.params.subscribe(params => {
    //   console.log(params['id']);
    //   this.idPadre = params['id'];
    // });
    this.listMenuByIdPadre(this.idPadre, 0, 10, this.campo, this.orden);
    const userNamePermiso = new class implements UserNamePermiso {
      username: string;
      permiso: string;
    };
    userNamePermiso.username = localStorage.getItem('username');
    userNamePermiso.permiso = 'inventario_informatica_crear_dependencia';
    this.simaBackendService.isAuthorized(userNamePermiso).subscribe(data => {
        this.btnNuevaDependencia = data.status;
      },
      (err: HttpErrorResponse) => {
        window.alert(err.message);
      });
  }

  listMenuByIdPadre(idPadre: number, page: number, size: number, campo: string, orden: string) {
    const userName = new class implements UserName {
      username: string;
    };
    userName.username = localStorage.getItem('username');

    this.simaBackendMenuServiceService.listMenuByIdPadre(idPadre, page, size, campo, orden, userName).subscribe(
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
    this.listMenuByIdPadre(this.idPadre, event.page, event.size, this.campo, this.orden);
  }

  sortingPage(campo: string) {
    this.campo = campo;
    if (this.orden === 'asc') {
      this.orden = 'desc';
    } else {
      this.orden = 'asc';
    }
    this.listMenuByIdPadre(this.idPadre, this.page.number, this.page.size, this.campo, this.orden);
  }

  setClasses(campo: string) {
    let classes = 'sorting_asc';
    if (this.campo === campo && this.orden === 'desc') {
      classes = 'sorting_desc';
    }
    return classes;
  }

  verSubMenu(menu: Menu) {
    this.menu = menu;
    if (this.menu.nivel === 1) {
      this.menuNivel1 = this.menu;
    }
    if (this.menu.nivel === 2) {
      this.menuNivel2 = this.menu;
      this.btnVerSubMenu = false;
    }
    this.idPadre = this.menu.id;
    if (this.menu.nivel > 0) {
      this.btnVolver = true;
    }
    this.lista.push(this.menu.nombre);
    // this.router.navigate(['/menu-sima/panel-de-control/menus', idPadre]);
    this.listMenuByIdPadre(this.idPadre, this.page.number, this.page.size, this.campo, this.orden);
  }

  volver() {
    this.btnVerSubMenu = true;
    if (this.menu.nivel === 1) {
      this.idPadre = this.menuNivel1.idPadre;
      this.btnVolver = false;
    }
    if (this.menu.nivel === 2) {
      this.idPadre = this.menuNivel2.idPadre;
      this.menu.nivel = 1;
    }
    this.lista.pop();
    this.listMenuByIdPadre(this.idPadre, this.page.number, this.page.size, this.campo, this.orden);
  }
}
