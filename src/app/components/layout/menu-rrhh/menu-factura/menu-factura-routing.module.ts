import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListComponent} from './list/list.component';
import {MenuLateralComponent} from './menu-factura.component';
//import {NewComponent} from './new/new.component';
//import {MenuFormEditComponent} from './edit/menu-form-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MenuLateralComponent,
    children: [
      {
        path: 'menu-rrhh/menu-factura/list/list',
        component: ListComponent
      }
 /*     {
        path: 'menu-informatica/panel-de-control/menu-lateral/form-new',
        component: NewComponent
      },
      {
        path: 'menu-informatica/panel-de-control/menu-lateral/form-edit',
        component: MenuFormEditComponent
      }*/
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuLateralRoutingModule {
}
