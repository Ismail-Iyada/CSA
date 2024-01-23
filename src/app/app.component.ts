import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

/** @title Basic sidenav */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'csa';
  navState : string = "";
  ngOnInit() {
    this.navState = window.innerWidth > 768 ? 'true' : 'false';
  }
}
