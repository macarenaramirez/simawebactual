import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UtilsService} from './services/utils/utils.service';
import {DataTablesModule} from 'angular-datatables';
import {AuthorizationInterceptor} from './Interceptors/authorization.interceptor';
import {PagareComponent} from './components/modulos/recaudaciones/pagare/pagare.component';
import {PolizaListComponent} from './components/modulos/contratos/poliza/poliza-list.component';
import {PolizaFormComponent} from './components/modulos/contratos/poliza/poliza-form.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthorizationGuard} from './guards/authorization.guard';
import 'angular2-navigate-with-data';
import {SessionResourceService} from './services/siacweb-backend/session-resource.service';
import {registerLocaleData} from '@angular/common';
import localeEsPy from '@angular/common/locales/es-PY';
import {ConfigModule, ConfigService} from './services/config.service';
import {MenuResourceService} from './services/simaweb-backend/menu-resource.service';
import {SessionService} from './services/session.service';
import {StorageService} from './services/storage.service';

registerLocaleData(localeEsPy);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PagareComponent,
    PolizaListComponent,
    PolizaFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DataTablesModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es_PY'},
    {provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true},
    ConfigService,
    ConfigModule.init(),
    ConfigService,
    AuthorizationGuard,
    StorageService,
    SessionService,
    SessionResourceService,
    MenuResourceService,
    UtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
