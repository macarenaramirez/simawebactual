import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const dirComponents = './components/';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: dirComponents + 'login/login.module#LoginModule'
  },
  {
    path: '',
    loadChildren: dirComponents + 'layout/layout.module#LayoutModule'
  },
  // { 
  //   path: 'home', 
  //   loadChildren: dirComponents + 'home/home.module#HomeModule'
  // },
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
  //       component: NewComponent,
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
