import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {MenuAndSubMenuModel} from '../../../models/new/menuAndSubMenu.model';
import {SimaBackendMenuServiceService} from '../../../services/sima-backend/sima-backend-menu.service';
import {UserNameModel} from '../../../models/new/userName.model';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  menus: MenuAndSubMenuModel[];

  userNameModel = new class implements UserNameModel {
    username: string;
  };

  constructor(public simaBackendMenuServiceService: SimaBackendMenuServiceService) {
  }

  ngOnInit() {
    this.getMenu();
  }

  getMenu() {
    this.userNameModel.username = localStorage.getItem('username');
    this.simaBackendMenuServiceService.getMenu(this.userNameModel).subscribe(data => {
        if (data.status) {
          this.menus = data.object;
        } else {
          window.alert('Ocurrio un problema');
        }
      },
      (err: HttpErrorResponse) => {
        console.log('Error2: ' + err.message);
        window.alert(err.message);
      });

  }

}
