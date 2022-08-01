import { Injectable } from '@angular/core';
import { FiltersService } from 'dm-api';
import { filter, Observable, BehaviorSubject } from 'rxjs';
import { Car } from '../Interface/cars';

@Injectable({
  providedIn: 'root',
})
export class CarFiltersService {
  Filters:any;
  year = new BehaviorSubject<any[]>([]);
  fueltype = new BehaviorSubject<any[]>([]);
  origins = new BehaviorSubject<any[]>([]);
  insurance = new BehaviorSubject<any[]>([]);
  seatType = new BehaviorSubject<any[]>([]);
  transmission = new BehaviorSubject<any[]>([]);
  condition = new BehaviorSubject<any[]>([]);
  saleType = new BehaviorSubject<any[]>([]);
  cylinder = new BehaviorSubject<any[]>([]);
  drivetrain = new BehaviorSubject<any[]>([]);
  driving_readiness = new BehaviorSubject<any[]>([]);
  body = new BehaviorSubject<any[]>([]);
  exteriorColor = new BehaviorSubject<any[]>([]);
  interiorColor = new BehaviorSubject<any[]>([]);
  state = new BehaviorSubject<any[]>([]);
  warrentyDuration = new BehaviorSubject<any[]>([]);
  warrentyDistance = new BehaviorSubject<any[]>([]);
  feature = new BehaviorSubject<any[]>([]);
  plateType = new BehaviorSubject<any[]>([]);

  private filterSource = new BehaviorSubject<any[]>([]);
  data$ = this.filterSource.asObservable();
  constructor(private carFilters: FiltersService) {
    // FETCH FILTERS LIST AND ASSIGN IT TO LOCAL VARIABLE.
    // this.carFilters.getVehicleFilters().then((filters: any) => {
    //   if (filters.code === 200) {
    //     this.year.next(filters.result[11]);
    //     this.fueltype.next(filters.result[0].types);
    //     this.origins.next(filters.result[1].types);
    //     this.insurance.next(filters.result[2].types);
    //     this.seatType.next(filters.result[3].types);
    //     this.transmission.next(filters.result[4].types);
    //     this.condition.next(filters.result[5].types);
    //     this.saleType.next(filters.result[6].types);
    //     this.cylinder.next(filters.result[7].types);
    //     this.drivetrain.next(filters.result[8].types);
    //     this.driving_readiness.next(filters.result[9].types);
    //     this.plateType.next(filters.result[10]);
    //     this.warrentyDuration.next(filters.result[12]);
    //     this.exteriorColor.next(filters.result[13]);
    //     this.interiorColor.next(filters.result[14]);
    //   } else {
    //     // API FAILED TO LOAD
    //   }
    // });
  }

  getFiltersList(Filters:[]){
    this.filterSource.next(Filters);
  }



}
