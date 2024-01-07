import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LegendPosition } from '@swimlane/ngx-charts';

interface BarChartData {
  name: string;
  value: number;
}

interface PieChartData {
  name: string;
  value: number;
}

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  @Input() chartType: string; // Define the Input property to receive chartType
  data: any[] = [];
  mockData: any[] = [];
  @Input() legendPosition: LegendPosition = LegendPosition.Below; // Default legend position

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

  colorScheme: any = {
    domain: ['#1DB89C', '#88D196', '#FFA500', '#E04D67', '#BE1622'],
  };

  //pie chat options
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  constructor(private http: HttpClient) {
    this.chartType = ''; // Initialize the 'chartType' property here if needed
  }

  onSelect(event: any[]) {
    console.log(event);
  }

  ngOnInit(): void {
    console.log('chartType:', this.chartType); // Log the value of chartType when the component initializes
    this.fetchChartData(); // Fetch data based on the chartType

    // Create a media query for the col-xxl-6 breakpoint
    const mediaQuery = window.matchMedia('(max-width: 1535.98px)'); // Change the max-width to match your col-xxl-6 breakpoint

    // Function to handle changes in the media query status
    const handleMediaQueryChange = (
      event: MediaQueryListEvent | MediaQueryList
    ) => {
      if ('matches' in event) {
        // Use 'matches' property to check if the media query matches (for TypeScript type checking)
        if (event.matches) {
          // Set the legendPosition to right when the breakpoint matches
          this.legendPosition = LegendPosition.Right;
        } else {
          // Revert to the default legendPosition for other screen sizes
          this.legendPosition = LegendPosition.Below;
        }
      }
    };

    // Initial check for the media query status
    handleMediaQueryChange(mediaQuery);

    // Add a listener for changes in the media query status
    mediaQuery.addListener(handleMediaQueryChange);
  }

  fetchChartData() {
    if (this.chartType === 'bar') {
      // Replace 'http://195.201.167.92:7001/api/Services/GetServicesRanking' with the actual API endpoint for the bar chart
      const apiUrlBar =
        'http://195.201.167.92:7001/api/Services/GetServicesRanking';

      // Make an HTTP GET request to the bar chart API
      this.http.get<any>(apiUrlBar).subscribe(
        (data) => {
          // Map the response data to the chart data structure
          this.data = [
            { name: '😄', value: data.highlySatisfied.ranking },
            { name: '🙂', value: data.satisfied.ranking },
            { name: '😑', value: data.neutral.ranking },
            { name: '🙁', value: data.dissatisfied.ranking },
            {
              name: '☹️',
              value: data.highlyDissatisfied.ranking,
            },
          ];
        },
        (error) => {
          console.error('Error fetching data from the API:', error);
        }
      );
    } else if (this.chartType === 'pie') {
      // Replace 'http://YOUR_PIE_CHART_API_ENDPOINT' with the actual API endpoint for the pie chart
      const apiUrlPie =
        'http://195.201.167.92:7001/api/Reasons/FilterEachReasonPercentage';

      // Prepare an empty JSON object as the request body (since the API requires a JSON payload)
      const requestBody = {};

      // Make an HTTP POST request with the empty request body
      this.http.post<any[]>(apiUrlPie, requestBody).subscribe(
        (data) => {
          // Map the response data to the chart data structure for the pie chart
          this.data = data.map((item) => ({
            name: item.reasonLabel,
            value: item.percentage,
          }));
        },
        (error) => {
          console.error('Error fetching data from the pie chart API:', error);
        }
      );
    }
  }

  decideChartData() {
    if (this.chartType === 'bar') {
      this.mockData = [
        { name: '😄', value: 50 },
        { name: '🙂', value: 20 },
        { name: '😑', value: 13 },
        { name: '🙁', value: 70 },
        {
          name: '☹️',
          value: 5,
        },
      ];
    } else if (this.chartType === 'pie') {
      let dataArray= [
        {
          name: 'Reason 1',
          value: 25,
        },
        {
          name: 'Reason 2',
          value: 30,
        },
        {
          name: 'Reason 3',
          value: 15,
        },
        {
          name: 'Reason 4',
          value: 30,
        },
      ];
      
    }
  }

  // Use the code points for Material Icons or any other HTML elements
  customXAxisTicks = [
    'sentiment_very_satisfied',
    'sentiment_satisfied',
    'sentiment_neutral',
    'sentiment_dissatisfied',
    'sentiment_very_dissatisfied',
  ];

  customXAxisTickFormatting(value: string): string {
    const iconMapping: { [key: string]: string } = {
      'Sentiment 1': 'sentiment_very_satisfied',
      'Sentiment 2': 'sentiment_satisfied',
      'Sentiment 3': 'sentiment_neutral',
      'Sentiment 4': 'sentiment_dissatisfied',
      'Sentiment 5': 'sentiment_very_dissatisfied',
    };

    return iconMapping[value] || value;
  }
}
