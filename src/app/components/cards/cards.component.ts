import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faAnglesDown, faAnglesUp } from '@fortawesome/free-solid-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

interface ApiResponse {
  topServiceName: string;
  topServiceCount: number;
  flopServiceName: string;
  flopServiceCount: number;
}

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent {
  @Input() postType: 'top' | 'flop' = 'flop';
  postTitle: string = '';
  postRating: number = 0;

  // Declare the font awesome icons
  faAnglesUp = faAnglesUp;
  faAnglesDown = faAnglesDown;

  constructor(private library: FaIconLibrary, private http: HttpClient) {
    // Add the font awesome icons to the library
    library.addIcons(faAnglesUp, faAnglesDown);
  }

  ngOnInit(): void {
    // Call the API to fetch data
    this.mockData();
  }

  mockData(){
    if (this.postType === 'top') {
      this.postTitle = "service X";
      this.postRating = 176;
    } else {
      this.postTitle = "service Y";
      this.postRating = 12;
    }
  }
}
