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
  currentFilterTypes: filterType_c[] = [];

  constructor (
    private carFilter: CarFiltersService,
    public userData: UserDataService,
    private debug:DebugerService
  ) {}

  ngOnInit () {
    this.debug.log('app-filter-item-list Initialized : ',this.carFilter.getCurrentFilter().getTypes(),'Green' , true);
    this.currentFilterTypes = this.carFilter.getCurrentFilter().getTypes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.debug.log('Changes in app-filter-item-list', changes,'Red',true)
  }

  ngOnDestroy(): void {
    this.debug.log('app-filter-item-list', 'Destroyed!','yellow',true)
  }

  check (item, index) {}
}
