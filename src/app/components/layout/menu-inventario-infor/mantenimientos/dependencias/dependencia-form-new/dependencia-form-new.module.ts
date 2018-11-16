import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DependenciaFormNewComponent} from './dependencia-form-new.component';
import {DependenciaFormNewRoutingModule} from './dependencia-form-new-routing.module';
import {ContentHeaderModule} from '../../../../widgets/content-header/content-header.module';

@NgModule({
  imports: [
    CommonModule,
    DependenciaFormNewRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule
  ],
  declarations: [
    DependenciaFormNewComponent
  ],
  providers: []
})

export class DependenciaFormNewModule {
}
