import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { CarFiltersService } from 'src/app/Services/car-filters.service'
import { UserDataService } from 'src/app/Services/user-data.service'

@Component({
  selector: 'app-filter-item-list',
  templateUrl: './filter-item-list.component.html',
  styleUrls: ['./filter-item-list.component.scss']
})
export class FilterItemListComponent implements OnInit {
  label: string = null
  condition: any[] = null

  constructor (
    private carFilter: CarFiltersService,
    private activated: ActivatedRoute,
    public userData: UserDataService
  ) {}

  ngOnInit () {
    this.label = this.activated.snapshot.params.label
    this.carFilter.filterObject[this.label] = []
    //this.condition = this.carFilter.getCondition();
    console.log('Changes: ', this.carFilter.filterObject)
  }

  check (item, index) {}
}
