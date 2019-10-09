import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MenuListComponent} from './punto-atencion-list/punto-atencion-list.component';
import {MenuLateralComponent} from './punto-atencion.component';
import {MenuFormNewComponent} from './punto-atencion-form-new/punto-atencion-form-new.component';
import {MenuFormEditComponent} from './punto-atencion-form-edit/punto-atencion-form-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MenuLateralComponent,
    children: [
      {
        path: 'menu-informatica/panel-de-control/punto-atencion/list',
        component: MenuListComponent
      },
      {
        path: 'menu-informatica/panel-de-control/punto-atencion/form-new',
        component: MenuFormNewComponent
      },
      {
        path: 'menu-informatica/panel-de-control/punto-atencion/form-edit',
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
