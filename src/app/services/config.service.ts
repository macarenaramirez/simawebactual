import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigModel} from '../models/new/config.model';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  readonly configUrl = 'assets/config.json';
  configModel: ConfigModel;

  constructor(private http: HttpClient) {
  }

  get(): Observable<ConfigModel> {
    return this.http.get<ConfigModel>(this.configUrl);
  }

  getConfig() {
    this.get().subscribe(configModel => {
        if (configModel != null) {
          this.configModel = configModel;
        } else {
          console.log('Error: configModel es null');
        }
      },
      (err: HttpErrorResponse) => {
        console.log('Error: configModel ' + err.message);
      });
    return this.configModel;
  }

}
