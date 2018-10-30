import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Menu} from '../../../models/new/menu';
import {SimaBackendMenuServiceService} from '../../../services/sima-backend/sima-backend-menu.service';
import {LoginUser} from '../../../models/new/loginUser.model';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css']
})
export class SidebarMenuComponent implements OnInit {

  menus: Menu[];

  constructor(public simaBackendMenuServiceService: SimaBackendMenuServiceService) {
  }

  ngOnInit() {
    this.getMenu();
  }

  getMenu() {
    const loginUser = new class implements LoginUser {
      username: string;
      password: string;
    };
    loginUser.username = localStorage.getItem('username');
    loginUser.password = '';
    this.simaBackendMenuServiceService.getMenu(loginUser).subscribe(data => {
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
