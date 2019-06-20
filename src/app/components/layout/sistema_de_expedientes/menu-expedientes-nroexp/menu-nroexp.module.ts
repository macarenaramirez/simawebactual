import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuLateralRoutingModule} from './menu-nroexp-routing.module';
import {ListComponent} from './list/list.component';
import {MenuLateralComponent} from './menu-nroexp.component';
import {ExpedientesResourceService} from '../../../../services/sse-backend/expedientes-resource.service';

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
    ExpedientesResourceService
  ]
})

export class MenuExpedientesNroExpModule {
}
