import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {AuthorizationGuard} from '../../guards/authorization.guard';

const dirDependencias = './menu-inventario-infor/mantenimientos/dependencias/';
const dirMenuInformatica = './menu-informatica/';
const dirMenuRRHH = './menu-rrhh/';
const dirMenuExpedientes = './sistema_de_expedientes/';
//const dirMenuPuntoAtencion=''

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
        loadChildren: dirMenuInformatica + 'lugar-fisico/lugar-fisico.module#MenuLugarFisicoModule',
        canActivate: [AuthorizationGuard]
      },

      {
        path: '',
        loadChildren: dirMenuInformatica + 'area-atencion/area-atencion.module#MenuAreaAtencionModule',
        canActivate: [AuthorizationGuard]
      },
      {
        path: '',
        loadChildren: dirMenuInformatica + 'tipos-punto/tipos-punto.module#MenuTiposPuntoModule',
        canActivate: [AuthorizationGuard]
      },


      {
        path: '',
        loadChildren: dirMenuInformatica + 'punto-atencion/punto-atencion.module#MenuPuntoAtencionModule',
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
