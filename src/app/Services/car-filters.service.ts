import { Injectable } from '@angular/core';
import { Filter } from '../Classes/Filter';
import { filterList } from '../../JSON/filter-list';
import { DebugerService } from './debuger.service';
import { filterType_c } from '../Interface/Name';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CarFiltersService {
  //these all the sort types: 1- price_low 2- price_hight 3- date_new 4- date_old 5- kilometer_low 6- kilometer_hight 7- year_new 8- year_old
 
  // FILTER LIST ARRAY HAVING OBJECT AS TYPE FILTER.
  private filterSourceArray:Filter[] = [];
  currentFilter$ = new BehaviorSubject<filterType_c[]>(null);
  constructor(private debug:DebugerService) {
    this.initiateFilters();
  }

  // INITIATING FILTERS LIST.
  initiateFilters() {
    filterList.forEach(filter=>{
      if(filter.path != undefined){
      let obj = new Filter(filter);
      this.filterSourceArray.push(obj);
      }
    });
    this.debug.log("Filters in Services: ", this.filterSourceArray,'green',true);
  }

  setCurrentFilter(){
    
    let currentFilter = this.filterSourceArray.filter(filter=>filter.getWatchStatus())[0];
    this.debug.log('GOT: ',currentFilter,'Brown',true);
    this.currentFilter$.next(currentFilter.getTypes()) // [{},{},{}]
    
  }

  getFiltersList(){
    return this.filterSourceArray;
  }

}
