import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './components/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UtilsService} from './services/utils/utils.service';
import {DataTablesModule} from 'angular-datatables';
import {InventarioInfoBackendDependenciaService} from './services/inventario-info-backend/inventario-info-backend-dependencia.service';
import {AppInterceptor} from './Interceptors/app-interceptor.interceptor';
import {PagareComponent} from './components/modulos/recaudaciones/pagare/pagare.component';
import {PolizaListComponent} from './components/modulos/contratos/poliza/poliza-list.component';
import {PolizaFormComponent} from './components/modulos/contratos/poliza/poliza-form.component';
import {SimaBackendSessionService} from './services/sima-backend/sima-backend-session.service';
import {AppRoutingModule} from './app-routing.module';
import {SimaBackendMenuServiceService} from './services/sima-backend/sima-backend-menu.service';
import {AuthorizationGuard} from './authorization/authorization.guard';
import 'angular2-navigate-with-data';

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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
    AuthorizationGuard,
    SimaBackendSessionService,
    SimaBackendMenuServiceService,
    UtilsService,
    InventarioInfoBackendDependenciaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
