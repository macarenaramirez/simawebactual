import {Component, OnInit} from '@angular/core';
import {UtilsService} from '../../../services/utils/utils.service';

@Component({
  selector: 'app-layouts-auth',
  templateUrl: './auth.html',
  styleUrls: ['./auth.css']
})
export class LayoutAuthComponent implements OnInit {

  constructor(public utilsService: UtilsService) {
  }

  ngOnInit() {
    document.body.className = 'skin-blue';
  }

}
