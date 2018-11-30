import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsuarioListComponent} from './usuario-list/usuario-list.component';
import {UsuarioComponent} from './usuario.component';
import {UsuarioFormNewComponent} from './usuario-form-new/usuario-form-new.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
    children: [
      {
        path: 'menu-sima/panel-de-control/usuarios/list',
        component: UsuarioListComponent
      },
      {
        path: 'menu-sima/panel-de-control/usuarios/form-new',
        component: UsuarioFormNewComponent
      },
      // {
      //   path: 'menu-sima/panel-de-control/usuarios/form-edit',
      //   component: MenuFormEditComponent
      // }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule {
}
