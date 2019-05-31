import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuLateralRoutingModule} from './menu-lateral-routing.module';
import {ContentHeaderModule} from '../../../widgets/content-header/content-header.module';
import {PaginationModule} from '../../../widgets/pagination/pagination.module';
import {ListComponent} from './list/list.component';
import {NewComponent} from './new/new.component';
import {MenuFormEditComponent} from './edit/menu-form-edit.component';
import {MenuLateralComponent} from './menu-lateral.component';
import {MenuResourceService} from '../../../../../services/simaweb-backend/menu-resource.service';

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
    ListComponent,
    NewComponent,
    MenuFormEditComponent,
    MenuLateralComponent
  ],
  providers: [
    MenuResourceService
  ]
})

export class MenuLateralModule {
}
