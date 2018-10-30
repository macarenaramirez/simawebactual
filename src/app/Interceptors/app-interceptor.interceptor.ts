import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SimaBackendSessionService} from '../services/sima-backend/sima-backend-session.service';
import {TokenAppId} from '../models/tokenAppId.model';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  private token: string;
  private appId: string;

  tokenAppId: TokenAppId;

  constructor(private simaBackendService: SimaBackendSessionService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this.getTokenAppId();
    // this.token = this.tokenAppId.token;
    // this.appId = this.tokenAppId.app_id;
    // if (this.token != null && this.appId != null) {
    //   req = req.clone({headers: req.headers.set('token', this.token)});
    //   req = req.clone({headers: req.headers.set('app_id', this.appId)});
    //   return next.handle(req);
    // }
    return next.handle(req);
  }

  // getTokenAppId() {
  //   this.simaBackendService.getTokenAppId().subscribe(data => {
  //       if (data.status) {
  //         this.tokenAppId = data.object;
  //       } else {
  //         window.alert('Ocurrio un problema');
  //       }
  //     },
  //     (err: HttpErrorResponse) => {
  //       window.alert(err.message);
  //     });
  // }


}
