import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuLateralRoutingModule} from './reclamos-routing.module';
import {ContentHeaderModule} from '../../widgets/content-header/content-header.module';
import {PaginationModule} from '../../widgets/pagination/pagination.module';
import {MenuListComponent} from './reclamos-list/reclamos-list.component';
import {MenuFormNewComponent} from './reclamos-form-new/reclamos-form-new.component';
import {MenuFormEditComponent} from './reclamos-form-edit/reclamos-form-edit.component';
import {MenuLateralComponent} from './reclamos.component';

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

export class MenuReclamosModule {
}
