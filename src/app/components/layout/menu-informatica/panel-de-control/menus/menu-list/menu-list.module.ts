import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuListComponent} from './menu-list.component';
import {MenuListRoutingModule} from './menu-list-routing.module';
import {SimaBackendSessionService} from '../../../../../../services/sima-backend/sima-backend-session.service';
import {ContentHeaderModule} from '../../../../widgets/content-header/content-header.module';
import {PaginationModule} from '../../../../widgets/pagination/pagination.module';
import {SimaBackendMenuServiceService} from '../../../../../../services/sima-backend/sima-backend-menu.service';

@NgModule({
  imports: [
    CommonModule,
    MenuListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    PaginationModule
  ],
  declarations:
    [MenuListComponent],
  providers: [
    SimaBackendSessionService,
    SimaBackendMenuServiceService
  ]
})

export class MenuListModule {
}
