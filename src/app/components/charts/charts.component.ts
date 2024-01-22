import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LegendPosition } from '@swimlane/ngx-charts';
import { SelectServiceService } from 'src/app/services/select-service.service';
import { Observable, Subscription } from 'rxjs';

interface BarChartData {
  name: string;
  value: number;
}
interface PieChartData {
  name: string;
  value: number;
}
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
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  @Input() chartType: string; // Define the Input property to receive chartType
  data: any[] = [];

  barData: any[] = [];
  pieData: any[] = [];
  @Input() legendPosition: LegendPosition = LegendPosition.Right; // Default legend position

  // Subscriptions to observables
  barDataSubscription!: Subscription;
  pieDataSubscription!: Subscription;

  // Ensure the 'view' property is of type [number, number]
  view: [number, number] = [500, 300];

  // bar chart options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'emotes';
  showYAxisLabel = true;
  yAxisLabel = 'rating';

  bColorScheme: any = {
    domain: ['#1DB89C', '#88D196', '#FFA500', '#E04D67', '#BE1622'],
  };
  pColorScheme: any = {
    domain: ['#2EC4B6', '#90BE6D', '#FFBA08', '#F94144', '#9D0208'],
  };
  //pie chat options
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  constructor(
    private http: HttpClient,
    private selectService: SelectServiceService
  ) {
    this.chartType = ''; // Initialize the 'chartType' property here if needed
  }

  ngOnInit(): void {
    // this.fetchChartData(); // Fetch data based on the chartType

    this.barDataSubscription = this.selectService
      .getBarData()
      .subscribe((data) => {
        this.barData = data;
        // Additional logic when barData changes
      });

    this.pieDataSubscription = this.selectService
      .getPieData()
      .subscribe((data) => {
        this.pieData = data;
        // Additional logic when pieData changes
      });
  }

  onSelect(event: any[]) {
    console.log(event);
    console.log(this.selectService.selectedService);
  }
  ngOnDestroy(): void {
    // Unsubscribe from subscriptions to avoid memory leaks
    this.barDataSubscription.unsubscribe();
    this.pieDataSubscription.unsubscribe();
  }
}
