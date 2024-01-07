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
    this.fetchData();
  }

  fetchData() {
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint to fetch data
    const apiUrl = 'http://195.201.167.92:7001/api/Services/GetTopFlopService';

    // Make an HTTP GET request to the API
    this.http.get<ApiResponse>(apiUrl).subscribe(
      (data) => {
        if (this.postType === 'top') {
          this.postTitle = data.topServiceName;
          this.postRating = data.topServiceCount;
        } else {
          this.postTitle = data.flopServiceName;
          this.postRating = data.flopServiceCount;
        }
      },
      (error) => {
        console.error('Error fetching data from the API:', error);
      }
    );
  }
}
