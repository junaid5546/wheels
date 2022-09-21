import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'dm-api';
import { CarFiltersService } from 'src/app/Services/car-filters.service';
import { ModalControllerService } from 'src/app/Services/modal-controller.service';


export interface Item {
  make: string;
  completed: boolean;
  item?: Item[];
  //subtasks?: Task[];
}
@Component({
  selector: 'app-vehicles-department',
  templateUrl: './vehicles-department.page.html',
  styleUrls: ['./vehicles-department.page.scss']
})
export class VehiclesDepartmentPage implements OnInit {
  @Input() forwardTo:string = null;

  // ROUTE IS FORWARD OR BACK.
  @Input() goBack:string = null;
 
  // LEFT AND RIGHT ICON.
  icons:any = { has_left_icon:true, left_icon:'../../assets/icon/settings/back.svg', has_right_icon:true, right_icon:'../../assets/icon/Language.svg'};

  // MAIN HEADING/SUBHEADING.
  @Input() heading = {has_main_heading:true, main_heading_name:'Vehicles Department', has_sub_heading:false, sub_heading_name:''};
  items:any[] = [

    {name:'Vehicles',img:'assets/icon/main-items-icon/vehicles.svg',hasClock:false, clock:'assets/icon/main-items-icon/clock.svg',navigate:'tabs/posts' },
    
    {name:'Estates',img:'assets/icon/main-items-icon/estates.svg',hasClock:true , clock:'assets/icon/main-items-icon/clock.svg',navigate:'estate'},
    
    {name:'Electronics',img:'assets/icon/main-items-icon/electronics.svg', hasClock:true , clock:'assets/icon/main-items-icon/clock.svg',navigate:'electronic'},
    
  ]
 
  constructor(  private modalService:ModalControllerService,
  
    private post:PostService,private filter:CarFiltersService) { }

  ngOnInit() {
   this.filter.initiateFilters();
  }
}
