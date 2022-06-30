import { Component, Input, OnInit, AfterViewInit,ViewChild,ElementRef } from '@angular/core';
import { DeviceInfoService  } from '../Services/device-info.service';
import { CarFiltersService } from '../Services/car-filters.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular'; 
import { PostService } from 'dm-api';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  
  
  items:any[] = [];
  sortBy:any[] = [
    {name:'Sort by Price (Lowest)'},
    {name:'Sort by Price (Highest)'},
    {name:'Sort by newest'},
    {name:'Sort by oldest'},
    {name:'Sort by mileage (Lowest)'},
    {name:'Sort by mileage (Highest)'}
  ];
  isPopoverOpen
  @ViewChild('carpost_item', {static:false}) card_items:ElementRef;
 // ROUTE NAME HERE.
 @Input() forwardTo:string = null;

 // ROUTE IS FORWARD OR BACK.
 @Input() goBack:string = null;

 // LEFT AND RIGHT ICON.
 icons:any = { has_left_icon:false, left_icon:'../../assets/icon/settings/back.svg', has_right_icon:true, right_icon:'../../assets/icon/notification.svg'};

 // MAIN HEADING/SUBHEADING.
 @Input() heading = {has_main_heading:true, main_heading_name:'Vehicles for Sale Inventory', has_sub_heading:false, sub_heading_name:''};
  constructor(private deviceInfo:DeviceInfoService,  private router:Router, private nav:NavController, private post:PostService, private filters:CarFiltersService) { }

  ngOnInit() {
    console.log("NG ON INIT TAB 1");
   this.getPosts();
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.makeHeigh();
    }, 810);
    
  }

 async makeHeigh(){

    let cards = await document.getElementsByClassName('item-container-posts');
    for (let index = 0; index < cards.length; index++) {
      const e = cards[index];
      if(e instanceof HTMLElement){
      e.style.height = this.deviceInfo.getDeviceHeight()/2 + 'px';
      }
   }
    console.log("Card Elements",cards);
  }


  onSwiper(swiper) {
    console.log(swiper);
  }


  share(){
    console.log("Share");
  }

  notify() {
    console.log("Notify");
  }

  fav(){
    console.log("FAV");
  }

  /**
   * GETTING ALL POSTS
   */
  getPosts(){
    console.log("GETTING POSTS");
    //these all the sort types: 1- price_low 2- price_hight 3- date_new 4- date_old 5- kilometer_low 6- kilometer_hight 7- year_new 8- year_old
    this.post.getAllPosts('price_low','active',0,10)
    .then((post:any)=>{
      console.log("POSTS--: ", post);
      this.items = post.result;
    })
    .catch((error)=>{
      console.log("ERROR: ", error);
    })
  }

  


}
