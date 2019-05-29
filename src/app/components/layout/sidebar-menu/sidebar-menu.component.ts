import {Component, OnInit} from '@angular/core';
import {MenuModel} from '../../../models/new/menu.model';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  menus: MenuModel[];

  constructor() {
  }

  ngOnInit() {
    this.getMenu();
  }

  getMenu() {
    this.menus = JSON.parse(localStorage.getItem('menus')) as MenuModel[];
  }

}
