import {Component, OnInit} from '@angular/core';
import {MenuModel} from '../../../models/new/menu.model';
import {StorageService} from '../../../services/storage.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  menus: MenuModel[];

  constructor(private storageService: StorageService) {
  }

  ngOnInit() {
    this.menus = this.storageService.menus;
  }

}
