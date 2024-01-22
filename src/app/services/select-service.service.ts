import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root',
})
export class SelectServiceService {
  private dataSubject = new BehaviorSubject<ServicesData>({ services: [] });
  private data$ = this.dataSubject.asObservable();
  DBDS = [
    { name: '😄', value: 370 },
    { name: '🙂', value: 243 },
    { name: '😑', value: 151 },
    { name: '🙁', value: 618 },
    { name: '☹️', value: 68 },
  ]
  DPDS = [
    { name: 'Reason 1', value: 190 },
    { name: 'Reason 2', value: 175 },
    { name: 'Reason 3', value: 190 },
    { name: 'Reason 4', value: 335 },
  ]
  private barDataSubject = new BehaviorSubject<any[]>(this.DBDS);
  private pieDataSubject = new BehaviorSubject<any[]>(this.DPDS);
  selectedService: string = '';
  selectedServiceObj: ServiceData = {
    name: '',
    ratings: [],
    reasons: [],
  };

  constructor(private http: HttpClient) {
    this.http.get<ServicesData>('../../assets/data.json').subscribe(
      (data) => {
        this.dataSubject.next(data);
      },
      (error) => {
        console.error('Error loading JSON data:', error);
      }
    );
  }
  getData() {
    return this.data$;
  }
  getBarData(): Observable<any[]> {
    return this.barDataSubject.asObservable();
  }
  getPieData(): Observable<any[]> {
    return this.pieDataSubject.asObservable();
  }

  setSelectedServiceObj(a: string) {
    let data: ServicesData = { services: [] };
    let services: any[] = [];
    this.getData().subscribe((e) => {
      data = e;
      services = data.services;
    });
    if (a == '') {
      (this.selectedServiceObj = {
        name: '',
        ratings: [],
        reasons: [],
      }),
        this.barDataSubject.next(this.DBDS);
      this.pieDataSubject.next(this.DPDS);
    } else {
      services.forEach((e) => {
        if (e.name == a) {
          this.selectedServiceObj = e;
          this.barDataSubject.next(e.ratings);
          this.pieDataSubject.next(e.reasons);
        }
      });
    }
  }
  getSelectedServiceObj() {
    return this.selectedServiceObj;
  }
}
