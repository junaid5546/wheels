import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-numbers',
  templateUrl: './vehicle-numbers.page.html',
  styleUrls: ['./vehicle-numbers.page.scss'],
})
export class VehicleNumbersPage implements OnInit {

  heading = {
    has_main_heading: true,
    main_heading_name: 'Vehicle Numbers',
    has_sub_heading: false,
    sub_heading_name: ''
}
items:any[] = [
  {number:'00001',code_ar:'س س',code_en:'a a', country_name:'عُمان',color:'#D30E11'},
  {number:'00002',code_ar:'د س',code_en:'b b', country_name:'عُمان',color:'#FFC724'},
  {number:'00003',code_ar:'ش س',code_en:'c c', country_name:'عُمان',color:'#D30E11'},
  {number:'00004',code_ar:'ذ س',code_en:'d d', country_name:'عُمان',color:'#FFC724'}
]

  constructor() { }

  ngOnInit() {
  }

}
