import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MenuListComponent} from './reclamos-list/reclamos-list.component';
import {MenuLateralComponent} from './reclamos.component';
import {MenuFormNewComponent} from './reclamos-form-new/reclamos-form-new.component';
import {MenuFormEditComponent} from './reclamos-form-edit/reclamos-form-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MenuLateralComponent,
    children: [
      {
        path: 'menu-informatica/panel-de-control/reclamos/list',
        component: MenuListComponent
      },
      {
        path: 'menu-informatica/panel-de-control/reclamos/form-new',
        component: MenuFormNewComponent
      },
      {
        path: 'menu-informatica/panel-de-control/reclamos/form-edit',
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
