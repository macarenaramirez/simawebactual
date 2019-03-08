import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DependenciaListRoutingModule} from './dependencia-list-routing.module';
import {DependenciaListComponent} from './dependencia-list.component';
import {ContentHeaderModule} from '../../../../widgets/content-header/content-header.module';
import {PaginationModule} from '../../../../widgets/pagination/pagination.module';

@NgModule({
  imports: [
    CommonModule,
    DependenciaListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    PaginationModule
  ],
  declarations: [
    DependenciaListComponent
  ],
  providers: []
})

export class DependenciaListModule {
}
