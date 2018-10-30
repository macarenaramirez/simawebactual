import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {AuthorizationGuard} from '../../authorization/authorization.guard';

const dirDependencias = './menu-inventario-infor/mantenimientos/dependencias/';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // { path: '', redirectTo: 'dashboard' },
      // {path: '', redirectTo: 'inicio'},

      // dasboard para info importante para analizar a simple vista
      {
        path: '',
        loadChildren: './menu-informatica/panel-de-control/menus/menu-list/menu-list.module#MenuListModule',
        canActivate: [AuthorizationGuard]
      },
      // dasboard para info importante para analizar a simple vista
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
