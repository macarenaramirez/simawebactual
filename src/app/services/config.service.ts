import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../models/config.model';

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

  getAppId() {
    this.getConfig()
      .subscribe((data: Config) => {
        this.config = data;
      });
    return this.config.appId;
  }
}
