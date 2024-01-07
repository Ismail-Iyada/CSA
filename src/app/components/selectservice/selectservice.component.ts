import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-selectservice',
  templateUrl: './selectservice.component.html',
  styleUrls: ['./selectservice.component.css'],
})
export class SelectServiceComponent implements OnInit {
  data: any[] = [];
  selectedData: string = '';
  
  // Declare the faTimes variable
  faTimes = faTimes;

  constructor(private http: HttpClient, private library: FaIconLibrary) {
    // Add the faTimes icon to the library
    library.addIcons(faTimes);
  }

  ngOnInit(): void {
    this.http
      .get<any[]>('http://195.201.167.92:7001/api/Services/GetServices')
      .subscribe((response) => {
        this.data = response;
      });
  }

  handleChange(event: any): void {
    this.selectedData = event.target.value;
  }

  clearSelection(): void {
    this.selectedData = '';
  }
}
