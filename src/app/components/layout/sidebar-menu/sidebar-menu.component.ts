import {Component, OnInit} from '@angular/core';
import {MenuAndSubMenuModel} from '../../../models/new/menuAndSubMenu.model';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  menus: MenuAndSubMenuModel[];

  constructor() {
  }

  ngOnInit() {
    this.getMenu();
  }

  getMenu() {
    console.log('hola');
    this.menus = JSON.parse(localStorage.getItem('menus')) as MenuAndSubMenuModel[];
  }

}
