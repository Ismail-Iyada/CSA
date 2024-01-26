import { Component, OnInit, HostListener} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

/** @title Basic sidenav */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent implements OnInit{
  title = 'csa';
  navState : string = "";
  ngOnInit() {
    this.updateNavState();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateNavState();
  }

  private updateNavState() {
    this.navState = window.innerWidth > 768 ? 'true' : 'false';
  }
}