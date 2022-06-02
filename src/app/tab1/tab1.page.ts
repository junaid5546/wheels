import { Component, Input, OnInit, AfterViewInit,ViewChild,ElementRef } from '@angular/core';
import { DeviceInfoService  } from '../Services/device-info.service';
import {  ModalControllerService } from '../Services/modal-controller.service';
import { FiltersComponent } from '../Models/filters/filters.component';
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
 icons:any = { has_left_icon:true, left_icon:'../../assets/icon/settings/back.svg', has_right_icon:true, right_icon:'../../assets/icon/notification.svg'};

 // MAIN HEADING/SUBHEADING.
 @Input() heading = {has_main_heading:true, main_heading_name:'Vehicles for Sale Inventory', has_sub_heading:false, sub_heading_name:''};
  constructor(private deviceInfo:DeviceInfoService,  private router:Router, private nav:NavController, private post:PostService) { }

  ngOnInit() {
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
      e.style.height = this.deviceInfo.getDeviceHeight()/2.5 + 'px';
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
    this.post.getAllPosts()
    .then((post:any)=>{
      
      console.log("POSTS: ", post);
      this.items = post.result;
    })
    .catch((error)=>{
      console.log("ERROR: ", error);
    })
  }

  


}
