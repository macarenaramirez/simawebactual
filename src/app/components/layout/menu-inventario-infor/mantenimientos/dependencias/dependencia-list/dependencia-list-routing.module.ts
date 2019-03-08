import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DependenciaListComponent} from './dependencia-list.component';

const routes: Routes = [
  {
    path: 'menu-inventario-informatica/mantenimientos/dependencias',
    component: DependenciaListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DependenciaListRoutingModule {
}
