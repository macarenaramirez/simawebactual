import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ContentHeaderModule} from '../../../widgets/content-header/content-header.module';
import {PaginationModule} from '../../../widgets/pagination/pagination.module';
import {MenuListComponent} from './menu-list/menu-list.component';
import {SimaBackendSessionService} from '../../../../../services/sima-backend/sima-backend-session.service';
import {SimaBackendMenuServiceService} from '../../../../../services/sima-backend/sima-backend-menu.service';
import {MenuFormNewComponent} from './menu-form-new/menu-form-new.component';
import { MenuLateralComponent } from './menu-lateral.component';
import {MenuLateralRoutingModule} from './menu-lateral-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MenuLateralRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    PaginationModule
  ],
  declarations: [
    MenuListComponent,
    MenuFormNewComponent,
    MenuLateralComponent
  ],
  providers: [
    SimaBackendSessionService,
    SimaBackendMenuServiceService
  ]
})

export class MenuLateralModule {
}
