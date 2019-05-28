import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MenuListComponent} from './lcomponentes_agrupados-list/lcomponentes_agrupados-list.component';
import {MenuLateralComponent} from './lcomponentes_agrupados.component';
import {MenuFormNewComponent} from './lcomponentes_agrupados-form-new/lcomponentes_agrupados-form-new.component';
import {MenuFormEditComponent} from './lcomponentes_agrupados-form-edit/lcomponentes_agrupados-form-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MenuLateralComponent,
    children: [
      {
        path: 'menu-informatica/panel-de-control/lcomponentes_agrupados/list',
        component: MenuListComponent
      },
      {
        path: 'menu-informatica/panel-de-control/lcomponentes_agrupados/form-new',
        component: MenuFormNewComponent
      },
      {
        path: 'menu-informatica/panel-de-control/lcomponentes_agrupados/form-edit',
        component: MenuFormEditComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuLateralRoutingModule {
}
