import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuLateralRoutingModule} from './lcomponentes_agrupados-routing.module';
import {ContentHeaderModule} from '../../../widgets/content-header/content-header.module';
import {PaginationModule} from '../../../widgets/pagination/pagination.module';
import {MenuListComponent} from './lcomponentes_agrupados-list/lcomponentes_agrupados-list.component';
import {MenuFormNewComponent} from './lcomponentes_agrupados-form-new/lcomponentes_agrupados-form-new.component';
import {MenuFormEditComponent} from './lcomponentes_agrupados-form-edit/lcomponentes_agrupados-form-edit.component';
import {MenuLateralComponent} from './lcomponentes_agrupados.component';

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

export class MenuComponentesAModule {
}
