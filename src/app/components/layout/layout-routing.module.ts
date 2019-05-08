import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {AuthorizationGuard} from '../../authorization/authorization.guard';

const dirDependencias = './menu-inventario-infor/mantenimientos/dependencias/';
const dirMenuLateral = './menu-sima/panel-de-control/';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // { path: '', redirectTo: 'dashboard' },
      // {path: '', redirectTo: 'inicio'},
      // Rutas para Sima
      // path: 'menu-sima/panel-de-control/menu-lateral/form-new/:id_padre/:nivel_actual',
      {
        path: '',
        loadChildren: dirMenuLateral + 'menu-lateral/menu-lateral.module#MenuLateralModule',
        canActivate: [AuthorizationGuard]
      },
      {
        path: '',
        loadChildren: dirMenuLateral + 'usuarios/usuario.module#UsuarioModule',
        canActivate: [AuthorizationGuard]
      },

      // {
      //   path: 'menu-sima/panel-de-control/menu-lateral/form-new',
      //   loadChildren: dirMenuLateral + 'menu-form-new/menu-form-new.module#MenuFormNewModule',
      //   // component: MenuFormNewComponent,
      //   outlet: 'bottom',
      //   canActivate: [AuthorizationGuard]
      // },
      // Rutas para Inventario Informatica
      {
        path: '',
        loadChildren: dirDependencias + 'dependencia-list/dependencia-list.module#DependenciaListModule',
        canActivate: [AuthorizationGuard]
      },
      {
        path: '',
        loadChildren: dirDependencias + 'dependencia-form-new/dependencia-form-new.module#DependenciaFormNewModule',
        canActivate: [AuthorizationGuard]
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
