import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MenuListComponent} from './lcomponentes-list/lcomponentes-list.component';
import {MenuLateralComponent} from './lcomponentes.component';
import {MenuFormNewComponent} from './lcomponentes-form-new/lcomponentes-form-new.component';
import {MenuFormEditComponent} from './lcomponentes-form-edit/lcomponentes-form-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MenuLateralComponent,
    children: [
      {
        path: 'menu-informatica/panel-de-control/lista_componentes/list',
        component: MenuListComponent
      },
      {
        path: 'menu-informatica/panel-de-control/lista_componentes/form-new',
        component: MenuFormNewComponent
      },
      {
        path: 'menu-informatica/panel-de-control/lista_componentes/form-edit',
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
