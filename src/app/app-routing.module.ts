import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthorizationGuard} from './authorization/authorization.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './components/login/login.module#LoginModule'
  },
  {
    path: '',
    loadChildren: './components/layout/layout.module#LayoutModule'
  }
  // ,
  // {
  //   canActivate: [AuthorizationGuard],
  //   children: [
  //     {
  //       canActivate: [AuthorizationGuard],
  //       component: HomeComponent,
  //       path: 'home'
  //     },
  //     {
  //       canActivate: [AuthorizationGuard],
  //       component: DependenciaListComponent,
  //       path: 'menu-inventario-informatica/mantenimientos/dependencias'
  //     },
  //     {
  //       canActivate: [AuthorizationGuard],
  //       component: DependenciaFormNewComponent,
  //       path: 'menu-inventario-informatica/mantenimientos/dependencias/form'
  //     },
  //     {
  //       canActivate: [AuthorizationGuard],
  //       component: PagareComponent,
  //       path: 'menu-recaudaciones/generacion-de-documentos/pagare'
  //     }
  //   ],
  //   component: LayoutAuthComponent,
  //   path: ''
  // }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
