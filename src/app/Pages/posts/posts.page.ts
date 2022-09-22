
import { Component, Input, OnInit, ViewChild,ElementRef } from '@angular/core';
import { DeviceInfoService  } from '../../Services/device-info.service';
import { CarFiltersService } from '../../Services/car-filters.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular'; 
import { ItemsDataService } from '../../Services/items-data-services/items-data.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  
  
  items:any[] = [];
  isPopoverOpen
  @ViewChild('carpost_item', {static:false}) card_items:ElementRef;
 // ROUTE NAME HERE.
 @Input() forwardTo:string = null;

 // ROUTE IS FORWARD OR BACK.
 @Input() goBack:string = null;

 // LEFT AND RIGHT ICON.
 icons:any = { has_left_icon:true, left_icon:'../../assets/icon/settings/back.svg', has_right_icon:true, right_icon:'../../assets/icon/notification.svg'};

 // MAIN HEADING/SUBHEADING.
 @Input() heading = {has_main_heading:true, main_heading_name:'Vehicles for Sale', has_sub_heading:false, sub_heading_name:''};
  constructor(private deviceInfo:DeviceInfoService,  private router:Router, private nav:NavController, private itemSourceService:ItemsDataService, private filters:CarFiltersService) { }

  ngOnInit() {
    console.log("NG ON INIT TAB 1");
   this.itemSourceService.getPosts(0,30).then((result:any)=>{
        this.items = result.result;
   })
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


}