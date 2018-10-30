import {Component, Input, OnInit} from '@angular/core';
import {UtilsService} from '../../../../../../services/utils/utils.service';
import {InventarioInfoBackendDependenciaService} from '../../../../../../services/inventario-info-backend/inventario-info-backend-dependencia.service';
import {Subject} from 'rxjs/Subject';
import {error} from 'util';
import {e} from '../../../../../../../../node_modules/@angular/core/src/render3/index';
import {Dependencia} from '../../../../../../models/dependencia.model';
import {DependenciaPage} from '../../../../../../models/dependenciaPage.model';
import {HttpErrorResponse} from '@angular/common/http';
import {SimaBackendSessionService} from '../../../../../../services/sima-backend/sima-backend-session.service';
import {TokenAppId} from '../../../../../../models/tokenAppId.model';
import {LoginUser} from '../../../../../../models/new/loginUser.model';


@Component({
  selector: 'app-dependencia-list',
  templateUrl: './dependencia-list.component.html',
  styleUrls: ['./dependencia-list.component.css']
})
export class DependenciaListComponent implements OnInit {
  titulo: string;
  lista: string[];

  dependencias: Array<Dependencia> = [];
  page: DependenciaPage;
  campo: string;
  orden: string;

  btnNuevaDependencia = true;
  tokenAppId: TokenAppId;

  constructor(private simaBackendService: SimaBackendSessionService,
              private inventarioInfoBackendService: InventarioInfoBackendDependenciaService) {
    this.titulo = 'Dependencias';
    this.lista = ['Menu Inventario Informatica', 'Mantenimientos', this.titulo];
  }

  ngOnInit() {
    this.campo = 'id';
    this.orden = 'asc';
    this.getDependencias(0, 10, 'id', 'asc');
  }

  getDependencias(page: number, size: number, campo: string, orden: string) {
    const loginUser = new class implements LoginUser {
      username: string;
      password: string;
    };
    loginUser.username = localStorage.getItem('username');
    loginUser.password = '';
    this.simaBackendService.getTokenAppId(loginUser).subscribe(data => {
        if (data.status) {
          this.tokenAppId = data.object;
          this.inventarioInfoBackendService.getAllDependencia(page, size, campo, orden, this.tokenAppId).subscribe(
            res => {
              if (res.status) {
                this.page = res.object;
                this.dependencias = this.page.content;
              }
            },
            (errors) => {
              console.log(errors.error.message);
            }
          );

        } else {
          window.alert('Ocurrio un problema');
        }
      },
      (err: HttpErrorResponse) => {
        window.alert(err.message);
      });


  }


  // getTokenAppId() {
  //   this.simaBackendService.getTokenAppId().subscribe(data => {
  //       if (data.status) {
  //         this.tokenAppId = data.object;
  //       } else {
  //         window.alert('Ocurrio un problema');
  //       }
  //     },
  //     (err: HttpErrorResponse) => {
  //       window.alert(err.message);
  //     });
  // }

  changePage(event) {
    this.getDependencias(event.page, event.size, this.campo, this.orden);
  }

  sortingPage(campo: string) {
    this.campo = campo;
    if (this.orden === 'asc') {
      this.orden = 'desc';
    } else {
      this.orden = 'asc';
    }
    this.getDependencias(this.page.number, this.page.size, this.campo, this.orden);
  }

  setClasses(campo: string) {
    let classes = 'sorting_asc';
    if (this.campo === campo && this.orden === 'desc') {
      classes = 'sorting_desc';
    }
    return classes;
  }

}

