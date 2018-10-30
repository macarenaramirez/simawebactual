import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticatorService} from './services/authenticator.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthenticatorUtilsService} from './services/authenticator-utils.service';
import {UtilsService} from './services/utils/utils.service';
import {DataTablesModule} from 'angular-datatables';
import {InventarioInfoBackendDependenciaService} from './services/inventario-info-backend/inventario-info-backend-dependencia.service';
import {AppInterceptor} from './Interceptors/app-interceptor.interceptor';
import {ConfigService} from './services/config.service';
import {PagareComponent} from './components/modulos/recaudaciones/pagare/pagare.component';
import {PolizaListComponent} from './components/modulos/contratos/poliza/poliza-list.component';
import {PolizaFormComponent} from './components/modulos/contratos/poliza/poliza-form.component';
import {SimaBackendSessionService} from './services/sima-backend/sima-backend-session.service';
import {AppRoutingModule} from './app-routing.module';
import {ContentHeaderModule} from './components/layout/widgets/content-header/content-header.module';
import {SimaBackendMenuServiceService} from './services/sima-backend/sima-backend-menu.service';
import {AuthorizationGuard} from './authorization/authorization.guard';

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
    DataTablesModule,
    ContentHeaderModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
    AuthorizationGuard,
    SimaBackendSessionService,
    SimaBackendMenuServiceService,
    AuthenticatorService,
    AuthenticatorUtilsService,
    UtilsService,
    InventarioInfoBackendDependenciaService,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
