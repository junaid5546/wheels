// Copyright 2010 Google LLC
/**
 * (Type docs)
 *
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */

import { Component, OnInit, Input, ViewChild,ElementRef, AfterViewInit } from '@angular/core';
import { ModalControllerService } from '../../Services/modal-controller.service';
import { AnimationController,Animation } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-car-info-modal',
  templateUrl: './car-info-modal.component.html',
  styleUrls: ['./car-info-modal.component.scss'],
})
export class CarInfoModalComponent implements OnInit,AfterViewInit  {
  data:boolean= false;
  inputCharacter:number = 0;
  anim:Animation;
  @ViewChild('card_items', {static:false}) card_items:ElementRef;
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
  constructor(public modelCtrl: ModalControllerService, private amimationCtrl:AnimationController, private route:Router) {

   }

   ngAfterViewInit() {
    this.animation();
   }

   


   animation(){
    if(this.card_items != undefined){
      console.log("Claaed ngAfterViewInit");
      console.log("Claaed ngAfterViewInit",this.card_items);
      this.anim = this.amimationCtrl.create('swipe');
      
      this.anim.addElement(this.card_items.nativeElement)
      .duration(300)
      .easing('ease-out')
      .iterations(1)
      .fromTo('transform','translateX(300px)','translateX(0px)')
      .fromTo('opacity',0.1,1);
      console.log("ANIMATION: ", this.anim);
      this.anim.play();
     }
   }


   ngOnDestroy() {
     
     this.ItemService.unsubscribe();
     console.log("Unsubscribed");
   }

  ngOnInit() {
    setTimeout(() => {
      this.data = true;
     }, 500);
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
    this.data = false;
    setTimeout(() => {
      this.data = true;
     }, 500);
    //this.animation();
  }

  inputOccured(e) {
    console.log(e.detail.value );
  }

  navigateToPosts() {
      this.modelCtrl.postFinished();
      this.route.navigate(['tabs/posts']);
  }
}