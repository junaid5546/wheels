import { Component, OnInit, Input,ViewChild,ElementRef,AfterViewInit } from '@angular/core';
import { Gesture, GestureController, IonContent } from '@ionic/angular';
import { Router } from "@angular/router";
import { NavController  } from '@ionic/angular';
import { DeviceInfoService } from 'src/app/Services/device-info.service'; 
@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.page.html',
  styleUrls: ['./post-details.page.scss'],
})
export class PostDetailsPage implements OnInit,AfterViewInit {

  private animation?: Animation;
private gesture?: Gesture;

private started: boolean = false;
private initialStep: number = 0;
private MAX_TRANSLATE: number = 400;


  @ViewChild(IonContent,{read:ElementRef}) content: ElementRef;
  @Input() forwardTo:string = null;

  // ROUTE IS FORWARD OR BACK.
  @Input() goBack:string = "true";
 
  // LEFT AND RIGHT ICON.
  icons:any = { has_left_icon:true, left_icon:'../../assets/icon/settings/back.svg', has_right_icon:true, right_icon:'../../assets/icon/notification.svg'};
 
  // MAIN HEADING/SUBHEADING.
  @Input() heading = {has_main_heading:true, main_heading_name:'Toyota Avalon XLS 2021 New', has_sub_heading:false, sub_heading_name:''};

  constructor(private gestureCtrl: GestureController, private router:Router, private deviceInfo:DeviceInfoService, private nav:NavController) {

    
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
