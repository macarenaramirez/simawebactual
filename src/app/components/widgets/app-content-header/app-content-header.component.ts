import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-content-header',
  templateUrl: './app-content-header.component.html',
  styleUrls: ['./app-content-header.component.css']
})
export class AppContentHeaderComponent implements OnInit {

  @Input() titulo: string;
  @Input() lista: string[];



  constructor() {
  }

  ngOnInit() {

  }

}
