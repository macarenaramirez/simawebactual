import {Component, OnInit} from '@angular/core';
import {UsuarioModel} from '../../../models/new/usuario.model';
import {AuthorizationService} from '../../../services/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuarioModel: UsuarioModel;

  constructor(private authorizationService: AuthorizationService) {

  }

  ngOnInit() {
    this.usuarioModel = new UsuarioModel;
    this.usuarioModel = this.authorizationService.usuario;
  }

  logout() {
    this.authorizationService.logout();
  }

}
