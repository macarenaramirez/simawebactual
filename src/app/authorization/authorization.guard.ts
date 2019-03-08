import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {SimaBackendSessionService} from '../services/sima-backend/sima-backend-session.service';
import {map} from 'rxjs/operators';
import {UserNameModel} from '../models/new/userName.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private router: Router, private simaBackendSessionService: SimaBackendSessionService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.controlSession();
  }

  controlSession() {
    const userNameModel = new class implements UserNameModel {
      username: string;
    };
    userNameModel.username = localStorage.getItem('username');
    return this.simaBackendSessionService.isLoggedIn(userNameModel).pipe(map(data => {
      if (data.status) {
        this.simaBackendSessionService.setLoggedInStatus(true);
        return true;
      } else {
        localStorage.setItem('message', data.message);
        this.simaBackendSessionService.setLoggedInStatus(false);
        this.router.navigate(['login']);
        return false;
      }
    }));
  }
}
