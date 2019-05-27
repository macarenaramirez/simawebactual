import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {AuthorizationGuard} from '../../authorization/authorization.guard';

const dirDependencias = './menu-inventario-infor/mantenimientos/dependencias/';
const dirMenuInformatica = './menu-informatica/';

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
        loadChildren: dirMenuInformatica + 'panel-de-control/menu-lateral/menu-lateral.module#MenuLateralModule',
        canActivate: [AuthorizationGuard]
      },
      {
        path: '',
        loadChildren: dirMenuInformatica + 'panel-de-control/dashboard_soporte/dashboard.module#MenuSoporteModule',
        canActivate: [AuthorizationGuard]
      },
      {
        path: '',
        loadChildren: dirMenuInformatica + 'panel-de-control/lista_componentes/lcomponentes.module#MenuLComponentesModule',
        canActivate: [AuthorizationGuard]
      },

      {
        path: '',
        loadChildren: dirMenuInformatica + 'panel-de-control/lcomponentes_agrupados/lcomponentes_agrupados.module#MenuComponentesAModule',
        canActivate: [AuthorizationGuard]
      },
      {
        path: '',
        loadChildren: dirMenuInformatica + 'panel-de-control/reclamos/reclamos.module#MenuReclamosModule',
        canActivate: [AuthorizationGuard]
      },
      // Rutas para Inventario Informatica
      // {
      //   path: '',
      //   loadChildren: dirDependencias + 'dependencia-list/dependencia-list.module#DependenciaListModule',
      //   canActivate: [AuthorizationGuard]
      // },
      // {
      //   path: '',
      //   loadChildren: dirDependencias + 'dependencia-form-new/dependencia-form-new.module#DependenciaFormNewModule',
      //   canActivate: [AuthorizationGuard]
      // }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
