import {Component} from '@angular/core';
import {ConfigService} from './services/config/config.service';
import {Config} from './models/config.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  config: Config;

  constructor(private configService: ConfigService) {
    this.getConf();
  }

  getConf() {
    this.configService.getConfig()
      .subscribe((data: Config) => {
        this.config = data;
        localStorage.setItem('appId', this.config.appId);
      });

  }
}
