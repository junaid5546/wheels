import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import { CarFiltersService } from 'src/app/Services/car-filters.service';
import { UserDataService } from '../../Services/user-data.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
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
    right_icon: '/assets/icon/Language.svg',
  };

  constructor(
    public userData:UserDataService,
    private router: Router,
    public filterPost: CarFiltersService,
    public changeRef:ChangeDetectorRef
  ) {

    this.filtersList.subscribe((res) => {
      this.applyFilters(res);
    });

  }

  ngAfterViewInit(): void {}

  ngOnInit() {
    this.dummyFilters();
    this.getFiltersList()
    setTimeout(() => {
      this.filters[1].selected = true;
      this.changeRef.detectChanges();
    }, 500);
    
  }

  selectedItem(index, url, data) {
    // console.log(data);
    // console.log(index);
    this.filters[this.selectedIndex].selected = false;
    this.filters[index].selected = true;
    this.selectedIndex = index;
    this.filterPost.currentProcess = url;
    if(index === 1){
      this.router.navigate([`filter`]);
    } else {
      this.router.navigate([`filter/${url}`,{label:this.filterPost.currentProcess}]);
    }
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
      console.log("GOT FILTER LIST",data);
      this.filters = data;
      data.map((element, index) => {
        let obj = { ...element, selected: false, show: false };

        return obj;
      });
    });

    //this.changeRef.markForCheck();
  }

  /**
   *
   * @param filterList Array
   */
  applyFilters(filterList: any[]) {}

  // NEED TO DELETE THIS
  dummyFilters() {
    let filters =  [
      {name: {en:"Body",ar:"الهيكل"}, path:'Kbody'},
      {name:{en:"Make",ar:"شركة التصنيع"}, path:'Kmake'},
      {name:{en:"Price",ar:"السعر"},path:'price'},

      {
          "_id": "62276e52de5b632b481db497",
          "name": {
              "en": "Condition",
              "ar": "الحالة"
          },
          "path": "Condition",
          "addVehicleOrder": 0,
          "filterOrder": 0,
      },
      {
          "_id": "62276e52de5b632b481db49e",
          "name": {
              "en": "Model Year",
              "ar": "سنة الطراز"
          },
          "path": "Kyear",
          "addVehicleOrder": 1,
          "filterOrder": 0,
         
      },
      {
          "_id": "630b56c43486c25bc36d9afd",
          "name": {
              "en": "Exterior Color",
              "ar": "اللون الخارجي"
          },
          "path": "exterior_color",
          "addVehicleOrder": 2,
          "filterOrder": 0,
          
      },
      {
          "_id": "630b56803486c25bc36d9afc",
          "name": {
              "en": "Interior Color",
              "ar": "اللون الداخلي"
          },
          "path": "interior_color",
          "addVehicleOrder": 3,
          "filterOrder": 0,
          
      },
      {
          "_id": "6303119d046e23a7660e3309",
          "name": {
              "en": "Doors",
              "ar": "الأبواب"
          },
          "path": "Kdoor",
          "addVehicleOrder": 4,
        
      },
      {
          "_id": "62276e52de5b632b481db499",
          "name": {
              "en": "Cylinders",
              "ar": "الاسطوانات"
          },
          "path": "cylinder_count",
          "addVehicleOrder": 5,
          "filterOrder": 0,
         
      },
      {
          "_id": "630313b9046e23a7660e330a",
          "name": {
              "en": "Engine Size",
              "ar": "سعة المحرك"
          },
          "path": "engine_size",
          "addVehicleOrder": 6,
         
      },
      {
          "_id": "62276e52de5b632b481db492",
          "name": {
              "en": "Fuel",
              "ar": "الوقود"
          },
          "path": "fuel",
          "addVehicleOrder": 7,
          "filterOrder": 0,
         
      },
      {
          "_id": "62276e52de5b632b481db496",
          "name": {
              "en": "Transmission",
              "ar": "الجير"
          },
          "path": "transmission",
          "addVehicleOrder": 8,
          "filterOrder": 0,
          
      },
      {
          "_id": "62276e52de5b632b481db49a",
          "name": {
              "en": "Drivetrain",
              "ar": "دفع العجلات"
          },
          "path": "car-drivetrain-type",
          "addVehicleOrder": 9,
          "filterOrder": 0,
          
      },
      {
          "_id": "62276e52de5b632b481db495",
          "name": {
              "en": "Seats",
              "ar": "المقاعد"
          },
          "path": "seats",
          "addVehicleOrder": 10,
          "filterOrder": 0,
          
      },
      {
          "_id": "62276e52de5b632b481db493",
          "name": {
              "en": "Origin",
              "ar": "مصدر المركبة"
          },
          "path": "origin",
          "addVehicleOrder": 11,
          "filterOrder": 0,
          
      },
      {
          "_id": "62276e52de5b632b481db494",
          "name": {
              "en": "Insurance",
              "ar": "التأمين"
          },
          "path": "car-insurance",
          "addVehicleOrder": 11,
          "filterOrder": 0,
          
      },
      {
          "_id": "62276e52de5b632b481db49c",
          "name": {
              "en": "Plate",
              "ar": "اللوحة"
          },
          "path": "plate_type",
          "addVehicleOrder": 13,
          "filterOrder": 0
      },
      {
          "_id": "62276e52de5b632b481db49b",
          "name": {
              "en": "Driving Readiness",
              "ar": "الجاهزية للقيادة"
          },
          "path": "driving_readiness",
          "addVehicleOrder": 14,
          "filterOrder": 0,
        
      },
      {
          "_id": "62276e52de5b632b481db498",
          "name": {
              "en": "Sale Type",
              "ar": "نوع البيع"
          },
          "path": "sale_type",
          "addVehicleOrder": 15,
          "filterOrder": 0,
         
      },
      {
          "_id": "62276e52de5b632b481db49f",
          "name": {
              "en": "Warranty Duration",
              "ar": "مدة الضمان"
          },
          "path": "car-warranty-duration",
          "addVehicleOrder": 16,
          "filterOrder": 0,
          
      }
  ];

      // adding key value for bage/counter;
      filters = filters.map(x=>{
        let obj = {...x,badge:null,selected:false};
        return obj
      });
      console.log("FILTERS:", filters);
      this.filterPost.setFiltersList(filters);
      // DUMMY MAKE MODEL TRIM
      this.filterPost.setMakeModelTrims([]);
  }

}
