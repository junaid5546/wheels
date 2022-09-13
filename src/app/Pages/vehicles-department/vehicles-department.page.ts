import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'dm-api';
import { Filter } from 'src/app/Classes/Filter';
import { CarFiltersService } from 'src/app/Services/car-filters.service';
import { ModalControllerService } from 'src/app/Services/modal-controller.service';
import { Make } from 'src/app/Classes/Vehicle';
export interface Item {
  make: string;
  completed: boolean;
  item?: Item[];
  //subtasks?: Task[];
}
@Component({
  selector: 'app-vehicles-department',
  templateUrl: './vehicles-department.page.html',
  styleUrls: ['./vehicles-department.page.scss'],
})
export class VehiclesDepartmentPage implements OnInit {
  @Input() forwardTo: string = null;

  // ROUTE IS FORWARD OR BACK.
  @Input() goBack: string = null;

  // LEFT AND RIGHT ICON.
  icons: any = {
    has_left_icon: true,
    left_icon: '../../assets/icon/settings/back.svg',
    has_right_icon: true,
    right_icon: '../../assets/icon/Language.svg',
  };

  // MAIN HEADING/SUBHEADING.
  @Input() heading = {
    has_main_heading: true,
    main_heading_name: 'Vehicles Department',
    has_sub_heading: false,
    sub_heading_name: '',
  };
  items: any[] = [
    {
      name: 'Vehicles',
      img: 'assets/icon/main-items-icon/vehicles.svg',
      hasClock: false,
      clock: 'assets/icon/main-items-icon/clock.svg',
      navigate: 'tabs/posts',
    },

    {
      name: 'Estates',
      img: 'assets/icon/main-items-icon/estates.svg',
      hasClock: true,
      clock: 'assets/icon/main-items-icon/clock.svg',
      navigate: 'estate',
    },

    {
      name: 'Electronics',
      img: 'assets/icon/main-items-icon/electronics.svg',
      hasClock: true,
      clock: 'assets/icon/main-items-icon/clock.svg',
      navigate: 'electronic',
    },
  ];

  constructor(
    private modalService: ModalControllerService,

    private post: PostService,
    private filter: CarFiltersService
  ) {}

  ngOnInit() {
    this.fetchPostFeed();
  }

  fetchPostFeed() {
    this.post
      .getPostFeed('')
      .then((feed: any) => {
        console.log('Post Feed:', feed);
        this.modalService.modelData.items[0].value = feed.result.makes;
        this.modalService.modelData.items[21].value = feed.result.governorates;
        this.modalService.modelData.items[23].value = feed.result.features;
        let filters = feed.result.filters;

        const vehicleDefinitionList =  feed.result.makes.filter(function (make): Make {
          let makeObject = new Make();
          
          return makeObject;
        });

        filters.unshift(
          {
            name: { en: 'Body', ar: 'الشكل' },
            path: 'Kbody',
            types: feed.result.bodies,
          },
          {
            name: { en: 'Make', ar: 'شركة التصنيع' },
            path: 'Kmake',
            types: [],
          },
          { name: { en: 'Price', ar: 'السعر' }, path: 'price' }
        );
        filters.push({
          name: { en: 'Location', ar: 'الموقع' },
          path: 'car-location',
          types: feed.result.governorates,
        });
        // REMOVING EXTRA FILTER
        filters = feed.result.filters.filter((x) => {
          if (
            x.name.en != 'Warranty Kilometers' &&
            x.name.en != 'Features' &&
            x.name.en != 'Warranty Duration' &&
            x.name.en != 'Distance Travelled'
          ) {
            let filterObject = new Filter(
              x.name,
              x.addPostOrder,
              x.filterOrder,
              x._id,
              x.path
            );
            return filterObject;
          }
        });
        console.log('Filter Objects: ', filters);
        this.filter.setFiltersList(filters);
      })
      .catch((error) => {
        console.log('Could not get post feed', error);
      });
  }
}
