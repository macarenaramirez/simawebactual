import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuLateralRoutingModule} from './lcomponentes-routing.module';
import {ContentHeaderModule} from '../../../widgets/content-header/content-header.module';
import {PaginationModule} from '../../../widgets/pagination/pagination.module';
import {MenuListComponent} from './lcomponentes-list/lcomponentes-list.component';
import {MenuFormNewComponent} from './lcomponentes-form-new/lcomponentes-form-new.component';
import {MenuFormEditComponent} from './lcomponentes-form-edit/lcomponentes-form-edit.component';
import {MenuLateralComponent} from './lcomponentes.component';

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
  providers: []
})

export class MenuLComponentesModule {
}
