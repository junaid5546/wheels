import { Injectable } from '@angular/core';
import { FiltersService } from 'dm-api';
import { filter, Observable, BehaviorSubject } from 'rxjs';
import { Car } from '../Interface/cars';

@Injectable({
  providedIn: 'root',
})
export class CarFiltersService {
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

  constructor(private carFilters: FiltersService) {
    // FETCH FILTERS LIST AND ASSIGN IT TO LOCAL VARIABLE.
    this.carFilters.getVehicleFilters().then((filters: any) => {
      if (filters.code === 200) {
        this.year.next(filters.result[11]);
        this.fueltype.next(filters.result[0].types);
        this.origins.next(filters.result[1].types);
        this.insurance.next(filters.result[2].types);
        this.seatType.next(filters.result[3].types);
        this.transmission.next(filters.result[4].types);
        this.condition.next(filters.result[5].types);
        this.saleType.next(filters.result[6].types);
        this.cylinder.next(filters.result[7].types);
        this.drivetrain.next(filters.result[8].types);
        this.driving_readiness.next(filters.result[9].types);
        this.plateType.next(filters.result[10]);
        this.warrentyDuration.next(filters.result[12]);
        this.exteriorColor.next(filters.result[13]);
        this.interiorColor.next(filters.result[14]);
      } else {
        // API FAILED TO LOAD
      }
    });
  }

  // RETURNS THE YEAR
  getYear(): any {
    this.year.subscribe((years: any) => {
      console.log('years.types: ', years.types);
      return years.types;
    });
  }

  // RETURNS THE FUEL TYPE
  getFueltype(): any {
    this.fueltype.subscribe((fuel: any) => {
      console.log('fuel.types: ', fuel.types);
      return fuel.types;
    });
  }

  // RETURNS THE CONDITION
  getCondition(): any {
    this.condition.subscribe((condition: any) => {
      console.log('condition: ', condition);
      return condition.types;
    });
  }

  // RETURNS THE ORIGINS
  getOrigins(): any {
    this.origins.subscribe((origins: any) => {
      console.log('origins: ', origins);
      return origins.types;
    });
  }

  // RETURNS THE INSURANCE
  getInsurance(): any {
    this.insurance.subscribe((insurance: any) => {
      console.log('insurance: ', insurance);
      return insurance.types;
    });
  }

  // RETURNS THE SEAT TYPE
  getSeatType(): any {
    this.seatType.subscribe((seatType: any) => {
      console.log('seatType: ', seatType);
      return seatType.types;
    });
  }

  // RETURNS THE TRANSMISSION
  getTransmission(): any {
    this.transmission.subscribe((transmission: any) => {
      console.log('transmission: ', transmission);
      return transmission.types;
    });
  }

  // RETURNS THE SALE TYPE
  getSaleType(): any {
    this.saleType.subscribe((saleType: any) => {
      console.log('saleType: ', saleType);
      return saleType.types;
    });
  }

  // RETURNS THE SALE TYPE
  getCylinder(): any {
    this.cylinder.subscribe((cylinder: any) => {
      console.log('cylinder: ', cylinder);
      return cylinder.types;
    });
  }

  // RETURNS THE drivetrain
  getdrivtrain(): any {
    this.drivetrain.subscribe((drivetrain: any) => {
      console.log('drivetrain: ', drivetrain);
      return drivetrain.types;
    });
  }

  // RETURNS THE drivetrain
  getDrivingReadiness(): any {
    this.driving_readiness.subscribe((driving_readiness: any) => {
      console.log('driving_readiness: ', driving_readiness);
      return driving_readiness.types;
    });
  }

  // RETURNS THE drivetrain
  getExteriorColor(): any {
    this.exteriorColor.subscribe((exteriorColor: any) => {
      console.log('exteriorColor: ', exteriorColor.types);
      return exteriorColor.types;
    });
  }

  // RETURNS THE interiorColor
  getInteriorColor(): any {
    this.exteriorColor.subscribe((interiorColor: any) => {
      console.log('interiorColor: ', interiorColor);
      return interiorColor.types;
    });
  }

  // RETURNS THE interiorColor
  getState(): any {
    this.state.subscribe((state: any) => {
      console.log('state: ', state);
      return state.types;
    });
  }

  // RETURNS THE warrentyDuration
  getwarrentyDuration(): any {
    this.warrentyDuration.subscribe((warrentyDuration: any) => {
      console.log('warrentyDuration: ', warrentyDuration);
      return warrentyDuration.types;
    });
  }

  // RETURNS THE warrentyDistance
  getwarrentyDistance(): any {
    this.warrentyDistance.subscribe((warrentyDistance: any) => {
      console.log('warrentyDistance: ', warrentyDistance);
      return warrentyDistance.types;
    });
  }

  // RETURNS THE feature
  getFeature(): any {
    this.feature.subscribe((feature: any) => {
      console.log('feature: ', feature);
      return feature.types;
    });
  }

  // RETURNS THE plateType
  getPlateType(): any {
    this.plateType.subscribe((plateType: any) => {
      console.log('plateType: ', plateType);
      return plateType.types;
    });
  }
}
