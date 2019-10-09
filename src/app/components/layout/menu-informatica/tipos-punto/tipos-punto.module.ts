import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuLateralRoutingModule} from './tipos-punto-routing.module';
import {ContentHeaderModule} from '../../widgets/content-header/content-header.module';
import {PaginationModule} from '../../widgets/pagination/pagination.module';
import {MenuListComponent} from './tipos-punto-list/tipos-punto-list.component';
import {MenuFormNewComponent} from './tipos-punto-form-new/tipos-punto-form-new.component';
import {MenuFormEditComponent} from './tipos-punto-form-edit/tipos-punto-form-edit.component';
import {MenuLateralComponent} from './tipos-punto.component';

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

export class MenuTiposPuntoModule {
}
