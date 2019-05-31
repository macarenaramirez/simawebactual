import {APP_INITIALIZER, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ConfigModel} from '../models/new/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  readonly configUrl = 'assets/config.json';
  configModel: ConfigModel;

  constructor(private http: HttpClient) {
  }

  load() {
    return this.http.get<ConfigModel>(this.configUrl).subscribe(configModel => {
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

export function ConfigFactory(config: ConfigService) {
  return () => config.load();
}

export function init() {
  return {
    provide: APP_INITIALIZER,
    useFactory: ConfigFactory,
    deps: [ConfigService],
    multi: true
  };
}

const ConfigModule = {
  init: init
};

export {ConfigModule};
