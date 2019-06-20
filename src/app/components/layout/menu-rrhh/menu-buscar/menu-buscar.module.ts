import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuLateralRoutingModule} from './menu-buscar-routing.module';
import {ListComponent} from './list/list.component';
import {MenuLateralComponent} from './menu-buscar.component';
import {PatenteResourceService} from '../../../../services/sirec-backend/patentes.resource.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MenuLateralRoutingModule,

  ],
  declarations: [
    ListComponent,
    MenuLateralComponent
  ],
  providers: [
    PatenteResourceService
  ]
})

export class MenuBuscarModule {
}
