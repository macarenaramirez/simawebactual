import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuLateralRoutingModule} from './lugar-fisico-routing.module';
import {ContentHeaderModule} from '../../widgets/content-header/content-header.module';
import {PaginationModule} from '../../widgets/pagination/pagination.module';
import {MenuListComponent} from './lugar-fisico-list/lugar-fisico-list.component';
import {MenuFormNewComponent} from './lugar-fisico-form-new/lugar-fisico-form-new.component';
import {MenuFormEditComponent} from './lugar-fisico-form-edit/lugar-fisico-form-edit.component';
import {MenuLateralComponent} from './lugar-fisico.component';

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

export class MenuLugarFisicoModule {
}
