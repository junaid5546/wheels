import { Component, OnInit, Input, ViewChild,ElementRef, AfterViewInit } from '@angular/core';
import { ModalControllerService } from '../../Services/modal-controller.service';
import { AnimationController,Animation, IonList } from '@ionic/angular';

@Component({
  selector: 'app-car-info-modal',
  templateUrl: './car-info-modal.component.html',
  styleUrls: ['./car-info-modal.component.scss'],
})
export class CarInfoModalComponent implements OnInit,AfterViewInit  {
  inputCharacter:number = 0;
  anim:Animation;
  @ViewChild('items', {static:false}) items:ElementRef;
  currentStep:number = 0;
  currentItem:any[] = [];
  ItemService;
 @Input() isModal:boolean; 
 // ROUTE NAME HERE.
 @Input() forwardTo:string = null;

 // ROUTE IS FORWARD OR BACK.
 @Input() goBack:string = null;

 // LEFT AND RIGHT ICON.
 icons:any = { has_left_icon:true, left_icon:'../../assets/icon/settings/back.svg', has_right_icon:true, right_icon:'../../assets/icon/notification.svg'};

 // MAIN HEADING/SUBHEADING.
 @Input() heading = {has_main_heading:true, main_heading_name:'Images', has_sub_heading:false, sub_heading_name:''};
  constructor(public modelCtrl: ModalControllerService, private amimationCtrl:AnimationController) {

   }

   ngAfterViewInit() {
     console.log("Claaed ngAfterViewInit");
     console.log(this.items);
     this.anim = this.amimationCtrl.create('swipe');
     
     this.anim.addElement(this.items.nativeElement)
     .duration(1500)
     .easing('ease-out')
     .iterations(Infinity)
     .fromTo('transform','translateX(0px)','translateX(300px)')
     .fromTo('opacity',1,0.2);
     console.log("ANIMATION: ", this.anim);
   }


   playAnimation(){
    console.log(this.items);
     this.anim.play();
     console.log("PLAY");
   }

   ngOnDestroy() {
     
     this.ItemService.unsubscribe();
     console.log("Unsubscribed");
   }

  ngOnInit() {

  this.ItemService =   this.modelCtrl.getCurrentObject()
    .subscribe((currentState:any)=>{
      console.log("Current Object Observable: ", currentState)
      this.heading.main_heading_name =  currentState.value.name;
      this.currentItem = currentState.value.value.map(x=>{
        x = {...x,selected:false};
        
        return x
        
       });
       this.currentStep = currentState.index;
      
    });
  }

  selectItem(item,i) {
    this.currentItem.forEach(x=>{
      x.selected = false;
    })
    this.currentItem[i].selected = true;
    this.modelCtrl.selectItem(item);
    this.playAnimation();
  }

  inputOccured(e) {
    console.log(e.detail.value );
  }
}