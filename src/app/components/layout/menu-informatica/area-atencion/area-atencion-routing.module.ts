import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MenuListComponent} from './area-atencion-list/area-atencion-list.component';
import {MenuLateralComponent} from './area-atencion.component';
import {MenuFormNewComponent} from './area-atencion-form-new/area-atencion-form-new.component';
import {MenuFormEditComponent} from './area-atencion-form-edit/area-atencion-form-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MenuLateralComponent,
    children: [
      {
        path: 'menu-informatica/panel-de-control/area-atencion/list',
        component: MenuListComponent
      },
     {
        path: 'menu-informatica/panel-de-control/area-atencion/form-new',
        component: MenuFormNewComponent
      },
      {
        path: 'menu-informatica/panel-de-control/area-atencion/form-edit',
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
