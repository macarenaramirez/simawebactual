import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {appRoutes} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppHeaderComponent} from './components/widgets/app-header/app-header.component';
import {AppFooterComponent} from './components/widgets/app-footer/app-footer.component';
import {AppmenuComponent} from './components/layouts/appmenu/appmenu.component';
import {AppsettingsComponent} from './components/layouts/appsettings/appsettings.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/layouts/login/login.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticatorService} from './services/authenticator/authenticator.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthenticatorUtilsService} from './services/authenticatorUtils/authenticator-utils.service';
import {UtilsService} from './services/utils/utils.service';
import {LayoutAuthComponent} from './components/layouts/auth/auth';
import {DependenciaListComponent} from './components/aplicaciones/inventario-info/dependencia/dependencia-list.component';
import {AppContentHeaderComponent} from './components/widgets/app-content-header/app-content-header.component';
import {DataTablesModule} from 'angular-datatables';
import {InventarioInfoBackendService} from './services/inventarioInfoBackend/inventario-info-backend.service';
import {AppPaginationComponent} from './components/widgets/app-pagination/app-pagination.component';
import {DependenciaFormComponent} from './components/aplicaciones/inventario-info/dependencia/dependencia-form.component';
import {AppInterceptor} from './Interceptors/app-interceptor.interceptor';
import {ConfigService} from './services/config/config.service';


@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppmenuComponent,
    AppsettingsComponent,
    HomeComponent,
    LoginComponent,
    LayoutAuthComponent,
    AppContentHeaderComponent,
    AppPaginationComponent,
    DependenciaListComponent,
    DependenciaFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    DataTablesModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
    AuthenticatorService,
    AuthenticatorUtilsService,
    UtilsService,
    InventarioInfoBackendService,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
