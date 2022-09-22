import { Component, OnInit } from '@angular/core';
import { filterType_c } from 'src/app/Interface/Name';
import { CarFiltersService } from 'src/app/Services/car-filters.service';
import { DebugerService } from 'src/app/Services/debuger.service';
import { UserDataService } from 'src/app/Services/user-data.service';

@Component({
  selector: 'app-filter-item-grid',
  templateUrl: './filter-item-grid.component.html',
  styleUrls: ['./filter-item-grid.component.scss'],
})
export class FilterItemGridComponent implements OnInit {

  label:string = null;
  filterTypesItemGrid:filterType_c[] = [];
  
  constructor( private carFilter:CarFiltersService, public userData:UserDataService, private debug:DebugerService) { }

  ngOnInit() {
    this.carFilter.currentFilter$.subscribe((types)=>{
      this.filterTypesItemGrid = types;
      this.debug.log('Types Grid: ',types,'#ff9500' , true)})
    this.debug.log('app-filter-item-grid Initialized : ',this.carFilter.currentFilter$.asObservable(),'Green' , true);
  }

  ngOnDestroy() {
    this.debug.log('app-filter-item-grid', 'Destroyed!','yellow',true)
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
