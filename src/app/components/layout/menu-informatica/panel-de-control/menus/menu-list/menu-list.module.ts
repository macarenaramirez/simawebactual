import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuListComponent} from './menu-list.component';
import {MenuListRoutingModule} from './menu-list-routing.module';
import {SimaBackendSessionService} from '../../../../../../services/sima-backend/sima-backend-session.service';

@NgModule({
  imports: [
    CommonModule,
    MenuListRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations:
    [MenuListComponent],
  providers: [SimaBackendSessionService]
})

export class MenuListModule {
}
