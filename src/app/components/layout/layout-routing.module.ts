import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {AuthorizationGuard} from '../../guards/authorization.guard';

const dirDependencias = './menu-inventario-infor/mantenimientos/dependencias/';
const dirMenuInformatica = './menu-informatica/';
const dirMenuRRHH = './menu-rrhh/';
const dirMenuExpedientes = './sistema_de_expedientes/';

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
        loadChildren: dirMenuInformatica + 'dashboard_general/dashboard_soporte/dashboard.module#MenuSoporteModule',
        canActivate: [AuthorizationGuard]
      },
      {
        path: '',
        loadChildren: dirMenuInformatica + 'stock/lista_componentes/lcomponentes.module#MenuLComponentesModule',
        canActivate: [AuthorizationGuard]
      },
      {
        path: '',
        loadChildren: dirMenuInformatica + 'stock/lcomponentes_agrupados/lcomponentes_agrupados.module#MenuComponentesAModule',
        canActivate: [AuthorizationGuard]
      },
      {
        path: '',
        loadChildren: dirMenuInformatica + 'reclamos/reclamos.module#MenuReclamosModule',
        canActivate: [AuthorizationGuard]
      },
      {
        path: '',
        loadChildren: dirMenuInformatica + 'panel-de-control/menu-lateral/menu-lateral.module#MenuLateralModule',
        canActivate: [AuthorizationGuard]
      },
      {
        path: '',
        loadChildren: dirMenuRRHH + 'menu-buscar/menu-buscar.module#MenuBuscarModule',
        canActivate: [AuthorizationGuard]
      },
      {
        path: '',
        loadChildren: dirMenuRRHH + 'menu-factura/menu-factura.module#MenuFacturaModule',
        canActivate: [AuthorizationGuard]
      },
      {
        path: '',
        loadChildren: dirMenuExpedientes + 'menu-expedientes-ci/menu-ci.module#MenuExpedientesCiModule',
        canActivate: [AuthorizationGuard]
      },
      {
        path: '',
        loadChildren: dirMenuExpedientes + 'menu-expedientes-nroexp/menu-nroexp.module#MenuExpedientesNroExpModule',
        canActivate: [AuthorizationGuard]
      } 


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
