import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SiacwebBackendSessionService} from '../services/siacweb-backend/siacweb-backend-session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private router: Router, private siacwebBackendSessionService: SiacwebBackendSessionService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.controlSession();
  }

  controlSession() {
    return this.siacwebBackendSessionService.istoken().pipe(map(data => {
      if (data.status) {
        this.siacwebBackendSessionService.setLoggedInStatus(true);
        return true;
      } else {
        this.siacwebBackendSessionService.setLoggedInStatus(false);
        this.router.navigate(['login']);
        return false;
      }
    }));
  }
}
