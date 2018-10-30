import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from './layout.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SidebarMenuComponent} from './sidebar-menu/sidebar-menu.component';
import {SettingsComponent} from './settings/settings.component';
import {SimaBackendSessionService} from '../../services/sima-backend/sima-backend-session.service';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarMenuComponent,
    SettingsComponent,
  ],
  providers: [
    SimaBackendSessionService
  ]
})
export class LayoutModule {
}
