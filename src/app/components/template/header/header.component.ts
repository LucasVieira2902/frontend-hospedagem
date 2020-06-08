import { MatSidenav } from '@angular/material/sidenav';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { 
    console.log('header');
  }

  @ViewChild('drawer', { static: false }) 
  drawer: MatSidenav;

  ngOnInit(): void {
  }

}
