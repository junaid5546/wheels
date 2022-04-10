import { Component, OnInit ,ViewChild,AfterViewInit} from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit,AfterViewInit {

  
slidesIndex:number = 0;
 // ROUTE NAME HERE.
forwardTo:string = null;

 // ROUTE IS FORWARD OR BACK.
 goBack:string = null;

 // LEFT AND RIGHT ICON.
 icons:any = { has_left_icon:true, left_icon:'../../assets/icon/settings/back.svg', has_right_icon:true, right_icon:'../../assets/icon/notification.svg'};
  
 // MAIN HEADING/SUBHEADING.
heading = {has_main_heading:true, main_heading_name:'Register', has_sub_heading:false, sub_heading_name:''}; 
@ViewChild('slides', {static: true}) slides: IonSlides;
 constructor() { }


  ngAfterViewInit() {
    const canvas = <HTMLCanvasElement> document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    for (var i = 0; i < 180; i++) {
      ctx.fillRect(i * 10, i * 10, 10, 10);
    }
  }

  ngOnInit() {
    //this.slides.lockSwipes(true);

   
  }



  slideChanged(ev) {

   this.slides.getActiveIndex()
   .then((res:any)=>{
     console.log("Active Index:", res);
     res == 0 ? this.heading.main_heading_name = "Register" : this.heading.main_heading_name = "OTP Verification";
   });
   }

   navigateToLogin(navigate:number){
     this.slides.lockSwipes(false);
      console.log("Navigate:",navigate);
      this.slides.slideTo(1)
      .then((res:any)=>{
        this.slides.lockSwipes(true); 
      })
   }

   navigateToRegister(navigate:number){
    this.slides.lockSwipes(false); 
    console.log("Navigate:",navigate);
    this.slides.slideTo(0)
    .then((res:any)=>{
      this.slides.lockSwipes(true); 
    })
   }


}
