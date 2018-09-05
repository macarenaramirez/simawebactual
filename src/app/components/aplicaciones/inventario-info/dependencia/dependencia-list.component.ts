import {Component, Input, OnInit} from '@angular/core';
import {UtilsService} from '../../../../services/utils/utils.service';
import {InventarioInfoBackendService} from '../../../../services/inventarioInfoBackend/inventario-info-backend.service';
import {Subject} from 'rxjs/Subject';
import {error} from 'util';
import {e} from '../../../../../../node_modules/@angular/core/src/render3';
import {Dependencia} from '../../../../models/dependencia.model';
import {DependenciaPage} from '../../../../models/dependenciaPage.model';


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

  constructor(public utilsService: UtilsService,
              private inventarioInfoBackendService: InventarioInfoBackendService) {
    this.titulo = 'Dependencias';
    this.lista = ['Menu Inventario Informatica', 'Mantenimientos', this.titulo];
  }

  ngOnInit() {
    this.campo = 'id';
    this.orden = 'asc';
    this.getDependencias(0, 10, 'id', 'asc');
  }

  getDependencias(page: number, size: number, campo: string, orden: string) {
    this.inventarioInfoBackendService.getAllDependencia(page, size, campo, orden).subscribe(
      res => {
        this.page = res;
        this.dependencias = this.page.content;
      },
      (errors) => {
        console.log(errors.error.message);
      }
    );
  }

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

