import {Component, OnInit} from '@angular/core';
import {UsuarioModel} from '../../../models/new/usuario.model';
import {SessionService} from '../../../services/session.service';
import {StorageService} from '../../../services/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuarioModel: UsuarioModel;

  constructor(private sessionService: SessionService,
              private storageService: StorageService,
              private router: Router) {
  }

  ngOnInit() {
    this.usuarioModel = this.storageService.usuario;
  }

  logout() {
    this.sessionService.logout();
    this.router.navigate(['login']);
  }

}
