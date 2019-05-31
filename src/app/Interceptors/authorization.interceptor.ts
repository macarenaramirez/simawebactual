import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {SessionService} from '../services/session.service';
import {Observable, throwError} from 'rxjs';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(e => {
        if (e.status === 401) {
          if (!this.sessionService.isAuthenticated()) {
            this.sessionService.logout();
          }
        }

        // if (e.status === 403) {
        //   swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este recurso!`, 'warning');
        //   this.router.navigate(['/clientes']);
        // }
        return throwError(e);
      })
    );
  }

}
