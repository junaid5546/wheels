import { Component, Input, OnInit, AfterViewInit,ViewChild,ElementRef } from '@angular/core';
import { DeviceInfoService  } from '../../Services/device-info.service';
import {  ModalControllerService } from '../../Services/modal-controller.service';
import { FiltersComponent } from '../../Models/filters/filters.component';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular'; 
import { PostsService } from '../../Services/posts.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  items:any[] = [];
  sortBy:any[] = [
    {name:'Sort by Price (Lowest)'},
    {name:'Sort by Price (Highest)'},
    {name:'Sort by newest'},
    {name:'Sort by oldest'},
    {name:'Sort by mileage (Lowest)'},
    {name:'Sort by mileage (Highest)'}
  ];
  images:any[] = [{name:'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyfGVufDB8fDB8fA%3D%3D&w=1000&q=80'},
  {name:'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXw0ODkwNDc5fHxlbnwwfHx8fA%3D%3D&w=1000&q=80'}]
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
  constructor(private deviceInfo:DeviceInfoService, private modelCtrl:ModalControllerService, private router:Router, private nav:NavController, private post:PostsService) { }

  ngOnInit() {
    setTimeout(() => {
      this.items = [
        {name:'Toyota',price:"200,000",location:"Bosher",distance:"120,011"},
        {name:'Honda',price:"1234",location:"Bosher",distance:"121,001"},
        {name:'BMW',price:"1200",location:"Bosher",distance:"120201"},
        {name:'Lexus',price:"123123",location:"Bosher",distance:"123300"},
        {name:'Range Rover',price:"1081",location:"Bosher",distance:"120220"},
        {name:'Honda',price:"10828",location:"Bosher",distance:"121100"},
        {name:'BMW',price:"1082",location:"Bosher",distance:"123300"},
        {name:'Lexus',price:"10388",location:"Bosher",distance:"112200"},
        {name:'Toyota',price:"10241",location:"Bosher",distance:"11200"},
        {name:'BMW',price:"1082",location:"Bosher",distance:"231200"},
        {name:'Range Rover',price:"10888",location:"Bosher",distance:"31200"},
        {name:'Honda',price:"10342",location:"Bosher",distance:"441200"},
        {name:'BMW',price:"10182",location:"Bosher",distance:"515200"},
        {name:'Range Rover',price:"10211",location:"Bosher",distance:"521200"},
        {name:'Honda',price:"10341",location:"Bosher",distance:"151200"},
        {name:'Range Rover',price:"10341",location:"Bosher",distance:"51200"}
      ]
    }, 800); 
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
  onSlideChange(e) {
    console.log('slide change',e);
  }


  openSheetmodel() {
    this.modelCtrl.presentSheetModal(FiltersComponent,this.items);
  }


  navigatePostDetails(item:any) {
    this.router.navigate(['tabs/posts/post-details',{'item':item}]);
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

  showFilters() {
    this.router.navigate(['filter'])
  }


  getPosts(){
    this.post.getAllPosts()
    .then((post)=>{
      console.log("POSTS: ", post);
    })
    .catch((error)=>{
      console.log("ERROR: ", error);
    })
  }

  


}
