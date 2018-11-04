import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {MenuAndSubMenuModel} from '../../../models/new/menuAndSubMenu.model';
import {SimaBackendMenuServiceService} from '../../../services/sima-backend/sima-backend-menu.service';
import {UserName} from '../../../models/new/userName.model';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  menus: MenuAndSubMenuModel[];

  constructor(public simaBackendMenuServiceService: SimaBackendMenuServiceService) {
  }

  ngOnInit() {
    this.getMenu();
  }

  getMenu() {
    const userName = new class implements UserName {
      username: string;
      password: string;
    };
    userName.username = localStorage.getItem('username');
    userName.password = '';
    this.simaBackendMenuServiceService.getMenu(userName).subscribe(data => {
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
