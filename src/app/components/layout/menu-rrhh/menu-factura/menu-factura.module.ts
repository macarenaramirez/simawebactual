import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuLateralRoutingModule} from './menu-factura-routing.module';
import {ListComponent} from './list/list.component';
import {MenuLateralComponent} from './menu-factura.component';
import {FacturaResourceService} from '../../../../services/sirec-backend/factura.resource.service';

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
    FacturaResourceService
  ]
})

export class MenuFacturaModule {
}
