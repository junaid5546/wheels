import { Component, OnInit, Input,ViewChild,ElementRef,AfterViewInit } from '@angular/core';
import { Gesture, GestureController, IonContent } from '@ionic/angular';
import { Router } from "@angular/router";
import { NavController  } from '@ionic/angular';
import { DeviceInfoService } from 'src/app/Services/device-info.service'; 
import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
import SwiperCore, { FreeMode, Scrollbar, Mousewheel } from "swiper";
SwiperCore.use([FreeMode, Scrollbar, Mousewheel]);
@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit,AfterViewInit {
  


  items:any[] = [
    {key:'Condition',value:'New'},
    {key:'Exterior Color', value:'Red'},
    {key:'Cylinder Count', value:'6'},
    {key:'Fuel',value:'Patrol'},
    {key:'Transmission', value:'Automatic'},
    {key:'Drivetrain', value:'Front Wheel Drive'},
    {key:'Interior Color', value:'Black'},
    {key:'Seats', value:'Leather'},
    {key:'Origin', value:'Imported'},
    {key:'Governorate', value:'Muscat'},
    {key:'State', value:'Bosher'},
    {key:'Warranty Duration', value:'4 Years & 06 Months'},
    {key:'Warranty Kilometers', value:'100,000KM'},
    {key:'Insurance', value:'Full coverage'},
    {key:'Plate Type', value:'Personal'},
    {key:'Driving Readliness', value:'Ready for Driving'},
    {key:'Sale Type', value:'For sale only'},
    {key:'Distance Travelled', value:"0 KM"}
  ];

  @ViewChild(IonContent,{read:ElementRef}) content: ElementRef;
  @Input() forwardTo:string = null;

  // ROUTE IS FORWARD OR BACK.
  @Input() goBack:string = "true";
 
  // LEFT AND RIGHT ICON.
  icons:any = { has_left_icon:true, left_icon:'../../assets/icon/settings/back.svg', has_right_icon:true, right_icon:'../../assets/icon/notification.svg'};
 
  // MAIN HEADING/SUBHEADING.
  @Input() heading = {has_main_heading:true, main_heading_name:'Toyota Avalon XLS 2021 New', has_sub_heading:false, sub_heading_name:''};

  constructor(private gestureCtrl: GestureController, private router:Router, public deviceInfo:DeviceInfoService, private nav:NavController) {

    
   }

  

   applyImageHeight(){
     let imageContainer = document.getElementById('carImage');
     imageContainer.style.height = this.deviceInfo.getDeviceHeight()/2.5+'px';
   }

   
  onMoveHandler (detail) {

  const type = detail.type;
  const currentX = detail.currentX;
  const deltaX = detail.deltaX;
  const velocityX = detail.velocityX;

}

   ngOnInit() {
   console.log(this.router.routerState);
   console.log(this.router.onSameUrlNavigation);
   console.log("Router",this.router);
   
  }

  ngAfterViewInit(){
   // this.applyImageHeight();
  }

  applyPanGesture() {

    console.log(this.content);

    const gesture: Gesture = this.gestureCtrl.create({

      el: this.content.nativeElement,

      gestureName: 'my-gesture',
      onStart: ev =>{
        console.log("Started",ev);
      },
      onEnd: ev=>{
        //console.log("End");
      },
      onMove: ev => this.onMoveHandler(ev)
    });
    gesture.enable(true);
  }

  notify(){

  }

  fav(){
    this.nav.pop();
    console.log(this.nav.pop);
  }


   share(){}
   notes(){}

   
}
