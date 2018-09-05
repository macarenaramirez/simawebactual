import {Component, OnInit} from '@angular/core';
import {UtilsService} from '../../../services/utils/utils.service';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit {

  user: string;
  email: string;
  documento: string;
  nombre: string;
  apellido: string;

  constructor(public utilsService: UtilsService) {
  }

  ngOnInit() {
    this.user = localStorage.getItem('userName');
    this.email = localStorage.getItem('email');
    this.documento = localStorage.getItem('documento');
    this.nombre = localStorage.getItem('nombre');
    this.apellido = localStorage.getItem('apellido');
  }

}
