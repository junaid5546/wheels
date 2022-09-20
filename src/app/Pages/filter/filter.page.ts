import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
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
export class FilterPage implements OnInit, AfterViewInit {

  private filtersList = new BehaviorSubject<any[]>([]);
  
  filterList: any[] = [];
  dummyData = [
    {
      name: 'toyota',
      show: true,
      model: [
        {
          name: 'Corolla',
          show: true,
          trim: [
            { name: 'Altis 1.8', show: true },
            { name: 'Gli', show: true },
          ],
        },
        {
          name: 'Camry',
          show: true,
          trim: [
            { name: '1.6', show: true },
            { name: 'xli', show: true },
          ],
        },
        {
          name: 'SUPRA',
          show: true,
          trim: [
            { name: '1.8', show: true },
            { name: 'revo', show: true },
          ],
        },
      ],
    },
    {
      name: 'Honda',
      show: true,
      model: [
        {
          name: '850',
          show: true,
          trim: [
            { name: 'x 100 cc', show: true },
            { name: 'def', show: true },
          ],
        },
      ],
    },
    {
      name: 'Suzuki',
      show: true,
      model: [
        {
          name: 'Alto',
          show: true,
          trim: [
            { name: '700 cc', show: false },
            { name: 'MG', show: false },
          ],
        },
      ],
    },
    {
      name: 'Hyndai',
      show: true,
      model: [
        {
          name: 'Sonata',
          show: true,
          trim: [
            { name: 'vvti', show: true },
            { name: 'ghi', show: true },
          ],
        },
      ],
    },
    {
      name: 'Mercides',
      show: true,
      model: [
        {
          name: 'Benz',
          show: true,
          trim: [
            { name: 'cctv', show: true },
            { name: 'jkl', show: true },
          ],
        },
      ],
    },
    {
      name: 'MG',
      show: true,
      model: [
        {
          name: 'E-Pace',
          show: true,
          trim: [
            { name: 'S', show: true },
            { name: 'opq', show: true },
          ],
        },
      ],
    },
    {
      name: 'Foton',
      show: true,
      model: [
        {
          name: 'Genesis',
          show: true,
          trim: [
            { name: 'SE', show: true },
            { name: 'rst', show: true },
          ],
        },
      ],
    },
    {
      name: 'Indian Motorcycle',
      show: true,
      model: [
        {
          name: 'Corolla',
          show: true,
          trim: [
            { name: 'Isuzu', show: true },
            { name: 'MG', show: true },
          ],
        },
      ],
    },
    {
      name: 'Kia',
      show: true,
      model: [
        {
          name: 'Nissan',
          show: true,
          trim: [
            { name: 'R-Dynamic S', show: true },
            { name: 'mmm', show: true },
          ],
        },
      ],
    },
    {
      name: 'Lexus',
      show: true,
      model: [
        {
          name: 'Corolla',
          show: true,
          trim: [
            { name: 'Haval', show: true },
            { name: 'ax1', show: true },
          ],
        },
      ],
    },
    {
      name: 'BAIC',
      show: true,
      model: [
        {
          name: 'Genesis',
          show: true,
          trim: [
            { name: 'S', show: true },
            { name: 'MG', show: true },
          ],
        },
      ],
    },
  ];
  public filters: any[] = [];
  selectedIndex = 1;

  heading = {
    has_main_heading: true,
    main_heading_name: 'Search Filters',
    has_sub_heading: false,
    sub_heading_name: null,
  };

  icons = {
    has_left_icon: true,
    has_right_icon: true,
    left_icon: 'assets/icon/settings/back.svg',
    right_icon: '../../../assets/icon/Language.svg',
  };

  constructor(
    public userData: UserDataService,
    private router: Router,
    private debug:DebugerService,
    public filterPost: CarFiltersService,
    public changeRef: ChangeDetectorRef
  ) {
    this.filtersList.subscribe((res) => {
    
    });
  }

  ngAfterViewInit(): void {}

  ngOnInit() {
    this.getFiltersList();
    setTimeout(() => {
      this.filters[1].selected = true;
      this.changeRef.detectChanges();
    }, 500);
  }

  selectedItem(index,item:Filter) {
   
    this.debug.log('Clicked Object Item: ', item,'pink',true);
    this.filters[this.selectedIndex].selected = false;
    this.filters[index].selected = true;
    this.selectedIndex = index;
    this.renderViewForSelectedFilter(item);
  }

  renderViewForSelectedFilter(item:Filter){
    let whichView = item.renderView();
    this.router.navigate([`filter/${whichView}`]);
  }

  addFilter(name: string, value: string) {
    let obj = {};
    obj[name] = value;
    this.filtersList.next(this.filtersList.getValue().concat([obj]));
  }

  /**
   * THIS METHOD GIVES BACK ALL FILTER LIST.
   */
  getFiltersList() {
    this.filterPost.data$.subscribe((data) => {
      console.log('GOT FILTER LIST', data);
      this.filters = data;
      data.map((element, index) => {
        let obj = { ...element, selected: false, show: false };
        return obj;
      });
    });
  }


  navigate() {
    this.router.navigate(['tabs/posts']);
  }

  // CLEAR ALL SELECTED FILTERS.
  clearAll() {
    // SUDO CODE
    // 1- FILTERS SERVICE LOOP THROUGH ALL FILTER LIST FIRST AND POINT OUT THOSE WHICH HAS BADGE > 0.
    // 2- FROM POINTED OUT ITEMS ITRATE THROUGH SUB ITEMS AND UNCHECK THEM.
    // 3- CALL POST FILTER API FOR GETTING INVENTORY ITEMS.
    this.filterPost.clearFilter();
  }

 
}
