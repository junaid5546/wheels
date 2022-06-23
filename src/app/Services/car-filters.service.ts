import { Injectable } from '@angular/core';
import { FiltersService } from 'dm-api';
import { filter } from 'rxjs';
import { Car } from '../Interface/cars';

@Injectable({
  providedIn: 'root'
})
export class CarFiltersService {

  filters = {
    fueltype:[],
    origins:[],
    insurance:[],
    seatType:[],
    transmission:[],
    condition:[],
    saleType:[],
    cylinder:[],
    drivetrain:[],
    driving_readiness:[]
  };


  constructor(private carFilters:FiltersService) { 
    // FETCH FILTERS LIST AND ASSIGN IT TO LOCAL VARIABLE.
    this.carFilters.getVehicleFilters()
    .then((filters:any)=>{
     if(filters.code === 0){
      this.filters.fueltype = filters.result[0].types;
      this.filters.origins = filters.result[1].types;
      this.filters.insurance = filters.result[2].types;
      this.filters.seatType = filters.result[3].types;
      this.filters.transmission = filters.result[4].types;
      this.filters.condition = filters.result[5].types;
      this.filters.saleType = filters.result[6].types;
      this.filters.cylinder = filters.result[7].types;
      this.filters.drivetrain = filters.result[8].types;
      this.filters.driving_readiness = filters.result[9].types;
     } else {
      // API FAILED TO LOAD
     }
    })
    .finally(()=>{
      console.log("Filters list settled: ", this.filters);
    })
  
  }

  

}
