import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DependenciaFormNewComponent} from './dependencia-form-new.component';
import {AuthorizationGuard} from '../../../../../../authorization/authorization.guard';

const routes: Routes = [
  {
    path: 'menu-inventario-informatica/mantenimientos/dependencias/form-new',
    component: DependenciaFormNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DependenciaFormNewRoutingModule {
}
