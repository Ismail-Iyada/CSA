import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { SelectServiceService } from 'src/app/services/select-service.service';
import { Observable } from 'rxjs';

interface RatingData {
  name: string;
  value: number;
}

interface ReasonsData {
  name: string;
  value: number;
}

interface ServiceData {
  name: string;
  ratings: RatingData[];
  reasons: ReasonsData[];
}

 interface ServicesData {
  services: ServiceData[];
}

@Component({
  selector: 'app-selectservice',
  templateUrl: './selectservice.component.html',
  styleUrls: ['./selectservice.component.css'],
})
export class SelectServiceComponent implements OnInit {
  data: ServicesData = { services: [] };
  selectedService: any = '';
  servicesData: any[] = []; // Adjust the data type based on your JSON structure
  

  // Declare the faTimes variable
  faTimes = faTimes;

  constructor(private http: HttpClient, private library: FaIconLibrary, private selectService: SelectServiceService) {
    // Add the faTimes icon to the library
    library.addIcons(faTimes);
    // get the mock json data
   this.selectService.getData().subscribe((data)=>{
    this.data = data
    this.servicesData = this.data.services    
   })
   
    
  }

  ngOnInit(): void {


  }
  
  handleChange(event: any): void {
    this.selectedService = event.value;
    this.selectService.selectedService = this.selectedService
    this.selectService.setSelectedServiceObj(this.selectedService)
    console.log("change: ",this.selectedService); 
    this.selectedService.getSelectedServiceObj

      
  }

  clearSelection(): void {
    this.selectedService = '';
    this.selectService.selectedService = this.selectedService
    this.selectService.setSelectedServiceObj(this.selectedService)
    this.selectedService

  }
}
