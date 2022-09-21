import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { Filter } from 'src/app/Classes/Filter';
import { CarFiltersService } from 'src/app/Services/car-filters.service';
import { DebugerService } from 'src/app/Services/debuger.service';
import { UserDataService } from '../../Services/user-data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPage implements OnInit {
  // ALL THE FILTER LIST WILL BE HERE THAT HAS TYPE Filter(Class) OF OBJECTS.
  public filters: Filter[] = [];
  // INITIALLY THE INDEX 1 WILL BE SELECTED WHICH IS MAKE
  selectedIndex = 1;
  // HEADER FOR THE FILTER APP
  heading = {
    has_main_heading: true,
    main_heading_name: 'Search Filters',
    has_sub_heading: false,
    sub_heading_name: null,
  };

  constructor(
    public userData: UserDataService,
    private router: Router,
    private debug: DebugerService,
    public filterService: CarFiltersService,
    public changeRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // GET REFERANCE OF FILTERS LIST FROM FILTER SERVICES.
    this.filters = this.filterService.getFiltersList();
    // MAKING THE MAKES SELECTED.
    this.filters[this.selectedIndex].youAreBeingWatched();
    // MAKING THE VIEW TO DETECT CHANGES.
    this.changeRef.detectChanges();
  }

  selectedItem(index, item: Filter) {
    this.debug.log('Clicked Object Item: ', this.filters, 'pink', true);
    // THE FIRST INDEX WHICH IS PRE-SELECTED MAKING IT DE-SELECT.
    this.filters[this.selectedIndex].youAreIdle();
    // THE NEW ONE WHICH IS CLICKED IS BEING SELECTED.
    this.filters[index].youAreBeingWatched();
    // UPDATING THE CURRENT SELECTED INDEX.
    this.selectedIndex = index;
    // RENDERING THE CURRENT FILTER.
    this.renderViewForSelectedFilter(item);
  }

  renderViewForSelectedFilter(item: Filter) {
    // GETTING THE VIEW TYPE OF CURRENT SELECTED FILTER
    let whichView = item.renderView();
    // VIEW FOR FILTER RENDERED HERE.
    this.router.navigate([`filter/${whichView}`]);
  }

  

  navigate() {
    // SHOWING THE LIST OF VEHICLES WHICH ARE FILTERED.
    this.router.navigate(['tabs/posts']);
  }

  // CLEAR ALL SELECTED FILTERS.
  clearAll() {
    // SUDO CODE
    // 1- FILTERS SERVICE LOOP THROUGH ALL FILTER LIST FIRST AND POINT OUT THOSE WHICH HAS BADGE > 0.
    // 2- FROM POINTED OUT ITEMS ITRATE THROUGH SUB ITEMS AND UNCHECK THEM.
    // 3- CALL POST FILTER API FOR GETTING INVENTORY ITEMS.
    // this.filterPost.clearFilter();
  }
}
