import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../models/config.model';
import {Respuesta} from '../models/new/respuesta.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  readonly configUrl = 'assets/config.json';
  config: Config;

  constructor(private http: HttpClient) {
  }

  getConfig() {
    return this.http.get<Config>(this.configUrl);
  }

  get() {
    this.getConfig()
      .subscribe((data: Config) => {
        console.log('DATA: ');
        console.log(data);
        this.config = data;
        console.log(this.config.appId);
        // localStorage.setItem('appId', this.config.appId);
      });
    return this.config;
  }
}
