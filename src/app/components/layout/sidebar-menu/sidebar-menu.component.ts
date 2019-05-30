import {Component, OnInit} from '@angular/core';
import {MenuModel} from '../../../models/new/menu.model';
import {AuthorizationService} from '../../../services/authorization.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  menus: MenuModel[];

  constructor(private authorizationService: AuthorizationService) {
  }

  ngOnInit() {
    this.menus = this.authorizationService.menus;
  }

}
