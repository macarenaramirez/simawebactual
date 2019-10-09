import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuLateralRoutingModule} from './area-atencion-routing.module';
import {ContentHeaderModule} from '../../widgets/content-header/content-header.module';
import {PaginationModule} from '../../widgets/pagination/pagination.module';
import {MenuListComponent} from './area-atencion-list/area-atencion-list.component';
import {MenuFormNewComponent} from './area-atencion-form-new/area-atencion-form-new.component';
import {MenuFormEditComponent} from './area-atencion-form-edit/area-atencion-form-edit.component';
import {MenuLateralComponent} from './area-atencion.component';

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

export class MenuAreaAtencionModule {
}
