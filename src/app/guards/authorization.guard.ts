import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {SessionService} from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private router: Router,
              private sessionService: SessionService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.sessionService.isAuthenticated()) {
      if (this.sessionService.isTokenExpirado()) {
        this.sessionService.logout();
        this.router.navigate(['login']);
        return false;
      }
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }


}
