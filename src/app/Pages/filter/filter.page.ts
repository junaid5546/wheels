import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
 

  filters = [
    { result: { count: 1 }, selected: false, id: 0, name: 'Body',url:'filter/car-body' },
    { result: { count: 0 }, selected: false, id: 1, name: 'Make/Model',url:'filter/car-make-model' },
    { result: { count: 0 }, selected: false, id: 2, name: 'Price',url:'filter/car-price'},
    { result: { count: 0 }, selected: false, id: 3, name: 'Condition',url:'filter/car-condition' },
    { result: { count: 0 }, selected: false, id: 4, name: 'Year',url:'filter/car-year'},
    { result: { count: 0 }, selected: false, id: 5, name: 'Exterior Color',url:'filter/car-exterior-color' },
    { result: { count: 0 }, selected: false, id: 6, name: 'Interior Color',url:'filter/car-interior-color' },
    { result: { count: 0 }, selected: false, id: 7, name: 'Doors',url:'filter/car-doors'},
    { result: { count: 0 }, selected: false, id: 8, name: 'Cylinders',url:'filter/car-cylinder'},
    { result: { count: 0 }, selected: false, id: 9, name: 'Engine Size',url:'filter/car-engine-size'},
    { result: { count: 0 }, selected: false, id: 10, name: 'Fuel',url:'filter/car-fuel'},
    { result: { count: 0 }, selected: false, id: 11, name: 'Transmission',url:'filter/car-transmission'},
    { result: { count: 0 }, selected: false, id: 12, name: 'Drivetrain',url:'filter/car-drivetrain'},
    { result: { count: 0 }, selected: false, id: 13, name: 'Seats',url:'filter/car-seats'},
    { result: { count: 0 }, selected: false, id: 14, name: 'Origin',url:'filter/car-origin'},
    { result: { count: 0 }, selected: false, id: 15, name: 'Location',url:'filter/car-location'},
    { result: { count: 0 }, selected: false, id: 16, name: 'Plate',url:'filter/car-plate'},
    {
      result: { count: 0 },
      selected: false,
      id: 17,
      name: 'Driving Readiness',
      url:'filter/car-readliness'
    },
    { result: { count: 0 }, selected: false, id: 18, name: 'Sale Type',url:'filter/car-sale-type' },
  ];

  selectedIndex = -1;

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

  constructor(private router:Router) {}

  ngOnInit() {}

  selectedItem(index,url) {
    if (this.selectedIndex === -1) {
      console.log('If', index, this.selectedIndex);
      this.selectedIndex = index;
      this.filters[index].selected = true;
    } else {
      console.log('Else', index, this.selectedIndex);
      this.filters[this.selectedIndex].selected = false;
      this.filters[index].selected = true;
      this.selectedIndex = index;
      this.router.navigate([url]);
    }
  }

 

 









 




  //**     test   */ 

  // THIS FUNCTION CALL WHENEVER CHANGE IN MODEL SELECTION OCCURS AND IT CHNAGE FLAG OF MAKE COMPLETED TO TRUE IF ALL MODELS ARE SELECTED AND FALSE IF SOME OF THEM ARE LEFT.
 



  

 
 //*****     test   ****/
}