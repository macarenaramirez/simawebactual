import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuLateralRoutingModule} from './dashboard-routing.module';
import {ContentHeaderModule} from '../../../widgets/content-header/content-header.module';
import {PaginationModule} from '../../../widgets/pagination/pagination.module';
import {MenuListComponent} from './soporte-list/menu-list.component';
import {MenuFormNewComponent} from './soporte-form-new/soporte-form-new.component';
import {MenuFormEditComponent} from './soporte-form-edit/soporte-form-edit.component';
import {MenuLateralComponent} from './dashboard.component';
import {SimaBackendMenuServiceService} from '../../../../../services/sima-backend/sima-backend-menu.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MenuLateralRoutingModule,
    ContentHeaderModule,
    PaginationModule
  ],
  declarations: [
    MenuListComponent,
    MenuFormNewComponent,
    MenuFormEditComponent,
    MenuLateralComponent
  ],
  providers: [
    SimaBackendMenuServiceService,
  
  ]
})

export class MenuSoporteModule {
}
