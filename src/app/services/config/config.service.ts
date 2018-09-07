import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../../models/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  configUrl = 'assets/config.json';
  config: Config;

  constructor(private http: HttpClient) {
  }

  getConfig() {
    return this.http.get<Config>(this.configUrl);
  }

  get() {
    this.getConfig()
      .subscribe((data: Config) => {
        this.config = data;
        // localStorage.setItem('appId', this.config.appId);
      });
    return this.config;
  }
}
