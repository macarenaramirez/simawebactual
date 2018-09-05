import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  private token: string;
  private appId: string;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = localStorage.getItem('token');
    this.appId = localStorage.getItem('appId');
    if (this.token != null && this.appId != null) {
      req = req.clone({headers: req.headers.set('Authorization', this.token)});
      req = req.clone({headers: req.headers.set('app_id', this.appId)});
      return next.handle(req);
    }
    return next.handle(req);
  }
}
