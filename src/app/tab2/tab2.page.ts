import { Component } from '@angular/core';
import { DeviceInfoService } from '../Services/device-info.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
 /*
  // ROUTE NAME HERE.
 @Input() forwardTo:string = null;
 // ROUTE IS FORWARD OR BACK.
 @Input() goBack:string = null;
 // LEFT AND RIGHT ICON.
 icons:any = { has_left_icon:true, left_icon:'../../assets/icon/settings.svg', has_right_icon:true, right_icon:'../../assets/icon/notification.svg'};
 // MAIN HEADING/SUBHEADING.
 @Input() heading = {has_main_heading:true, main_heading_name:'Vehicle Department', has_sub_heading:false, sub_heading_name:''};
  constructor() {}
*/
settingsRoute = "tabs/tab1/";
ctx:any = null;
icons:any = { has_left_icon:true, left_icon:'../../assets/icon/notification.svg', has_right_icon:false, right_icon:'../../assets/icon/notification.svg'};
heading:any = { has_main_heading:true, main_heading_name:"DigitalMall.App", has_sub_heading:false, sub_heading_name:'digital-mall.com'  };

items:any[] = [

{name:'Vehicles',img:'assets/icon/main-items-icon/vehicles.svg',hasClock:false, clock:'assets/icon/main-items-icon/clock.svg',navigate:'tabs/posts' },

{name:'Estates',img:'assets/icon/main-items-icon/estates.svg',hasClock:true , clock:'assets/icon/main-items-icon/clock.svg',navigate:'estate'},

{name:'Electronics',img:'assets/icon/main-items-icon/electronics.svg', hasClock:true , clock:'assets/icon/main-items-icon/clock.svg',navigate:'electronic'},

{name:'Furniture',img:'assets/icon/main-items-icon/furniture.svg', hasClock:true , clock:'assets/icon/main-items-icon/clock.svg',navigate:'furniture'},

{name:'Fashion',img:'assets/icon/main-items-icon/fashion.svg', hasClock:true , clock:'assets/icon/main-items-icon/clock.svg',navigate:'fashion'},

{name:'Kid Toys',img:'assets/icon/main-items-icon/kid toys.svg', hasClock:true , clock:'assets/icon/main-items-icon/clock.svg',navigate:'kids-toys'},

{name:'Animals',img:'assets/icon/main-items-icon/animals.svg', hasClock:true , clock:'assets/icon/main-items-icon/clock.svg',navigate:'animals'},

{name:'Plants',img:'assets/icon/main-items-icon/plants.svg', hasClock:true , clock:'assets/icon/main-items-icon/clock.svg',navigate:'plants'},

{name:'Food',img:'assets/icon/main-items-icon/food.svg', hasClock:true , clock:'assets/icon/main-items-icon/clock.svg',navigate:'food'},

{name:'Jobs',img:'assets/icon/main-items-icon/jobs.svg', hasClock:true , clock:'assets/icon/main-items-icon/clock.svg',navigate:'jobs'},

{name:'Services',img:'assets/icon/main-items-icon/services.svg', hasClock:true , clock:'assets/icon/main-items-icon/clock.svg',navigate:'services'},

{name:'Tools',img:'assets/icon/main-items-icon/tools.svg', hasClock:true , clock:'assets/icon/main-items-icon/clock.svg',navigate:'tools'},

{name:'Bills',img:'assets/icon/main-items-icon/bills.svg', hasClock:true , clock:'assets/icon/main-items-icon/clock.svg',navigate:'bills'},

{name:'Tourism',img:'assets/icon/main-items-icon/travel.svg', hasClock:true , clock:'assets/icon/main-items-icon/clock.svg',navigate:'tourism'},

{name:'Library',img:'assets/icon/main-items-icon/library.svg', hasClock:true , clock:'assets/icon/main-items-icon/clock.svg',navigate:'library'},

];

 name:string = null;

 header_height:Number = undefined;

constructor(public deviceInfo:DeviceInfoService, private nav:NavController ) {
  this.header_height = deviceInfo.makeBorderHeight();
  console.log('Height:' , deviceInfo.getDeviceHeight());

  
  //let ctx = canvas.getContext("2d");
  //let width = canvas.width;
  //let height = canvas.height;
}

ngOnInit() {

}

setMainPageDimensions() {
let ele = document.getElementById('main-page-header');
ele.style.height = this.header_height + 'px';
}

getCars() {

}


canvas() {

var canvas = document.getElementById("canvas") as HTMLCanvasElement;
this.ctx = canvas.getContext("2d");
this.circle(10,10,10,false);

}

circle = (x,y,radius,fillCircle)=>{
this.ctx.beginPath();
this.ctx.arc(x,y,radius,0,Math.PI * 2, false);
if(fillCircle){
  this.ctx.fill();    
} else {
  this.ctx.stroke();
}
}

}

