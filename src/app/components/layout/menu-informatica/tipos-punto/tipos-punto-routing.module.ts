import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MenuListComponent} from './tipos-punto-list/tipos-punto-list.component';
import {MenuLateralComponent} from './tipos-punto.component';
import {MenuFormNewComponent} from './tipos-punto-form-new/tipos-punto-form-new.component';
import {MenuFormEditComponent} from './tipos-punto-form-edit/tipos-punto-form-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MenuLateralComponent,
    children: [
      {
        path: 'menu-informatica/panel-de-control/tipos-punto/list',
        component: MenuListComponent
      },
      {
        path: 'menu-informatica/panel-de-control/tipos-punto/form-new',
        component: MenuFormNewComponent
      },
      {
        path: 'menu-informatica/panel-de-control/tipos-punto/form-edit',
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
