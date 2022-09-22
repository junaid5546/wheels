import { Component, OnInit, SimpleChanges } from '@angular/core';
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
  filterTypesItem:filterType_c[] = [];
  
  constructor( private carFilter:CarFiltersService, public userData:UserDataService, private debug:DebugerService) { }

  ngOnInit() {
    this.debug.log('app-filter-item-grid Initialized : ',this.carFilter.getCurrentFilter().getTypes(),'Green' , true);
    this.filterTypesItem = this.carFilter.getCurrentFilter().getTypes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.debug.log('Changes in app-filter-item-grid', changes,'Red',true)
  }

  ngOnDestroy(): void {
    this.debug.log('app-filter-item-grid', 'Destroyed!','yellow',true)
  }

  check(){}


}
