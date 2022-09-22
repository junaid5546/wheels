import { Component, OnInit, SimpleChanges } from '@angular/core'
import { filterType_c } from 'src/app/Interface/Name'
import { CarFiltersService } from 'src/app/Services/car-filters.service'
import { DebugerService } from 'src/app/Services/debuger.service'
import { UserDataService } from 'src/app/Services/user-data.service'

@Component({
  selector: 'app-filter-item-list',
  templateUrl: './filter-item-list.component.html',
  styleUrls: ['./filter-item-list.component.scss']
})
export class FilterItemListComponent implements OnInit {
  currentFilterTypesList: filterType_c[] = [];

  constructor (
    private carFilter: CarFiltersService,
    public userData: UserDataService,
    private debug:DebugerService
  ) {
      this.carFilter.currentFilter$.subscribe((types)=>{
      this.currentFilterTypesList = types;
      this.debug.log('Types List: ',types,'#ae2c1c' , true)})
  }

  ngOnInit () {
    this.debug.log('app-filter-item-list Initialized : ',this.carFilter.currentFilter$.asObservable(),'Green' , true);
  }

  ngOnDestroy() {
    this.debug.log('app-filter-item-list', 'Destroyed !','blue',true)
    this.carFilter.currentFilter$.unsubscribe();
  }

  check(filterType:filterType_c){
    if(filterType.isChecked()){
      filterType.uncheckType();
    } else{
      filterType.checkMarkType();
    }
  }
}
