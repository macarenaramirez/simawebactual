import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MenuListComponent} from './lugar-fisico-list/lugar-fisico-list.component';

import {MenuLateralComponent} from './lugar-fisico.component';
import {MenuFormEditComponent} from './lugar-fisico-form-edit/lugar-fisico-form-edit.component';
import {MenuFormNewComponent} from './lugar-fisico-form-new/lugar-fisico-form-new.component';
const routes: Routes = [
  {
    path: '',
    component: MenuLateralComponent,
    children: [
      {
        path: 'menu-informatica/panel-de-control/lugar-fisico/list',
        component: MenuListComponent
      },
      {
        path: 'menu-informatica/panel-de-control/lugar-fisico/form-new',
        component: MenuFormNewComponent
      },
      {
        path: 'menu-informatica/panel-de-control/lugar-fisico/form-edit',
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
