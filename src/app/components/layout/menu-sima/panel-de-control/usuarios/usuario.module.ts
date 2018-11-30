import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ContentHeaderModule} from '../../../widgets/content-header/content-header.module';
import {PaginationModule} from '../../../widgets/pagination/pagination.module';
import {SimaBackendSessionService} from '../../../../../services/sima-backend/sima-backend-session.service';
import {SimaBackendMenuServiceService} from '../../../../../services/sima-backend/sima-backend-menu.service';
import {UsuarioRoutingModule} from './usuario-routing.module';
import {UsuarioListComponent} from './usuario-list/usuario-list.component';
import {UsuarioComponent} from './usuario.component';
import {UsuarioFormNewComponent} from './usuario-form-new/usuario-form-new.component';
import {SimaBackendLugarOperativoServiceService} from '../../../../../services/sima-backend/sima-backend-lugar-operativo.service';
import {SimaBackendUsuarioServiceService} from '../../../../../services/sima-backend/sima-backend-usuario.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsuarioRoutingModule,
    ContentHeaderModule,
    PaginationModule
  ],
  declarations: [
    UsuarioListComponent,
    UsuarioFormNewComponent,
    // MenuFormEditComponent,
    UsuarioComponent
  ],
  providers: [
    SimaBackendSessionService,
    SimaBackendUsuarioServiceService,
    SimaBackendLugarOperativoServiceService
  ]
})

export class UsuarioModule {
}
