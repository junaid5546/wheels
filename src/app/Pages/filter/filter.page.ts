import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { map } from 'rxjs/operators';

import { FiltersService } from 'dm-api';
import { CarFiltersService } from 'src/app/Services/car-filters.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPage implements OnInit, AfterViewInit {
  private filtersList = new BehaviorSubject<any[]>([]);

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
  selectedIndex = 0;

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
    right_icon: 'assets/icon/posts/post-details/Phone/Vector.svg',
  };

  constructor(
    private router: Router,
    private filterServices: FiltersService,
    private changeRef: ChangeDetectorRef,
    private filterPost: CarFiltersService
  ) {
    this.filtersList.subscribe((res) => {
      this.applyFilters(res);
    });
  }

  ngAfterViewInit(): void {}

  ngOnInit() {
    this.getFiltersList();
  }

  selectedItem(index, url, data) {
    // console.log(data);
    // console.log(index);
    this.filters[this.selectedIndex].selected = false;
    this.filters[index].selected = true;
    this.selectedIndex = index;
    this.filterPost.currentProcess = url;
    this.router.navigate([`filter/${url}`,{label:this.filterPost.currentProcess}]);
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
      console.log(data);
      this.filters = data;
      data.map((element, index) => {
        let obj = { ...element, selected: false, show: false };

        return obj;
      });
    });

    this.changeRef.markForCheck();
  }

  /**
   *
   * @param filterList Array
   */
  applyFilters(filterList: any[]) {}

  recursiveFunction = function (liquidationArray,searched_number, startIndex, endIndex) {
    // Base Condition
    if (startIndex > endIndex) return false;

    // Find the middle index
    let mid = Math.floor((startIndex + endIndex) / 2);

    // Compare mid with given key x
    if (liquidationArray[mid].commercail_number === searched_number) return mid;

    // If element at mid is greater than x,
    // search in the left half of mid
    if (liquidationArray[mid].commercail_number > searched_number)
      return this.recursiveFunction(liquidationArray, searched_number, startIndex, mid - 1);
    // If element at mid is smaller than x,
    // search in the right half of mid
    else return this.recursiveFunction(liquidationArray, searched_number, mid + 1, endIndex);
  };

}
