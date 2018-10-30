import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {SimaBackendSessionService} from '../services/sima-backend/sima-backend-session.service';
import {map} from 'rxjs/operators';
import {LoginUser} from '../models/new/loginUser.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private router: Router, private simaBackendService: SimaBackendSessionService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // if (this.simaBackendService.isLoggedInStatus) {
    //   console.log('ENTRA');
    //   return true;
    // }

    const loginUser = new class implements LoginUser {
      username: string;
      password: string;
    };
    loginUser.username = localStorage.getItem('username');
    loginUser.password = '';

    return this.simaBackendService.isLoggedIn(loginUser).pipe(map(data => {
      console.log('ENTRA2');
      if (data.status) {
        this.simaBackendService.setLoggedInStatus(true);
        return true;
      } else {
        localStorage.setItem('message', data.message);
        this.simaBackendService.setLoggedInStatus(false);
        this.router.navigate(['login']);
        return false;
      }
    }));
  }
}
