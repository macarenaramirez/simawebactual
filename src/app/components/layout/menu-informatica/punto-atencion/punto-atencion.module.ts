import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuLateralRoutingModule} from './punto-atencion-routing.module';
import {ContentHeaderModule} from '../../widgets/content-header/content-header.module';
import {PaginationModule} from '../../widgets/pagination/pagination.module';
import {MenuListComponent} from './punto-atencion-list/punto-atencion-list.component';
import {MenuFormNewComponent} from './punto-atencion-form-new/punto-atencion-form-new.component';
import {MenuFormEditComponent} from './punto-atencion-form-edit/punto-atencion-form-edit.component';
import {MenuLateralComponent} from './punto-atencion.component';

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

export class MenuPuntoAtencionModule {
}
