import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/layouts/login/login.component';
import {AuthorizationGuard} from './authorization/authorization.guard';
import {LayoutAuthComponent} from './components/layouts/auth/auth';
import {DependenciaListComponent} from './components/aplicaciones/inventario-info/dependencia/dependencia-list.component';
import {DependenciaFormComponent} from './components/aplicaciones/inventario-info/dependencia/dependencia-form.component';

export const appRoutes: Routes = [
  {
    canActivate: [AuthorizationGuard],
    children: [
      {
        canActivate: [AuthorizationGuard],
        component: HomeComponent,
        path: 'home'
      },
      {
        canActivate: [AuthorizationGuard],
        component: DependenciaListComponent,
        path: 'menu-inventario-informatica/mantenimientos/dependencias'
      },
      {
        canActivate: [AuthorizationGuard],
        component: DependenciaFormComponent,
        path: 'menu-inventario-informatica/mantenimientos/dependencias/form'
      }
    ],
    component: LayoutAuthComponent,
    path: ''
  },
  {
    path: 'login', component: LoginComponent,
  }
];
