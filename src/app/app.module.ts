import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UtilsService} from './services/utils/utils.service';
import {DataTablesModule} from 'angular-datatables';
import {InventarioInfoBackendDependenciaService} from './services/inventario-info-backend/inventario-info-backend-dependencia.service';
import {AuthorizationInterceptor} from './Interceptors/authorization.interceptor';
import {PagareComponent} from './components/modulos/recaudaciones/pagare/pagare.component';
import {PolizaListComponent} from './components/modulos/contratos/poliza/poliza-list.component';
import {PolizaFormComponent} from './components/modulos/contratos/poliza/poliza-form.component';
import {AppRoutingModule} from './app-routing.module';
import {SimaBackendMenuServiceService} from './services/sima-backend/sima-backend-menu.service';
import {AuthorizationGuard} from './guards/authorization.guard';
import 'angular2-navigate-with-data';
import {ConfigService} from './services/config.service';
import {SiacwebBackendSessionService} from './services/siacweb-backend/siacweb-backend-session.service';
import {registerLocaleData} from '@angular/common';
import localeEsPy from '@angular/common/locales/es-PY';

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
    AuthorizationGuard,
    SimaBackendMenuServiceService,
    UtilsService,
    InventarioInfoBackendDependenciaService,
    SiacwebBackendSessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
