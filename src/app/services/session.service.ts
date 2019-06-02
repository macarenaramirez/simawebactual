import {Injectable} from '@angular/core';
import swal from 'sweetalert2';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {SessionResourceService} from './siacweb-backend/session-resource.service';
import {StorageService} from './storage.service';
import {ResponseBasePermisosModel} from '../models/new/responseBasePermisos.model';
import {UserNamePasswordModel} from '../models/new/userNamePassword.model';
import {MenuResourceService} from './simaweb-backend/menu-resource.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private storageService: StorageService,
              private sessionResourceService: SessionResourceService,
              private menuResourceService: MenuResourceService,
              private router: Router) {
  }

  logout(): void {
    if (this.storageService.sessionId != null && this.storageService.sessionId.length > 0) {
      this.sessionResourceService.logout(this.storageService.sessionId).subscribe(logout => {
        if (logout.status) {
          console.log('logout() OK: ' + logout.message);
        } else {
          console.log('logout() ERROR: ' + logout.message);
        }
      });
    }
    this.storageService.clearStorage();
  }

  isAuthenticated(): boolean {
    if (this.storageService.sessionId != null && this.storageService.sessionId.length > 0) {
      return true;
    }
    return false;
  }

  isAuthorized(permiso: string): boolean {
    if (this.storageService.permisos.includes(permiso)) {
      return true;
    }
    return false;
  }

  isTokenExpirado(): boolean {
    const now = new Date().getTime() / 1000;
    if (this.storageService.usuario.exp < now) {
      return true;
    }
    return false;
  }
}
