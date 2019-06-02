import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MenuListComponent} from './soporte-list/soporte-list.component';
import {MenuLateralComponent} from './dashboard.component';
import {MenuFormNewComponent} from './soporte-form-new/soporte-form-new.component';
import {MenuFormEditComponent} from './soporte-form-edit/soporte-form-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MenuLateralComponent,
    children: [
      {
        path: 'menu-informatica/panel-de-control/dashboard_soporte/list',
        component: MenuListComponent
      },
      {
        path: 'menu-informatica/panel-de-control/dashboard_soporte/form-new',
        component: MenuFormNewComponent
      },
      {
        path: 'menu-informatica/panel-de-control/dashboard_soporte/form-edit',
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
