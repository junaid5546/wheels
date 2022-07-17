// Copyright 2010 Google LLC
/**
 * (Type docs)
 *
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */

import { Component, OnInit, Input, ViewChild,ElementRef, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ModalControllerService } from '../../Services/modal-controller.service';
import { AnimationController,Animation } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-car-info-modal',
  templateUrl: './car-info-modal.component.html',
  styleUrls: ['./car-info-modal.component.scss']
})
export class CarInfoModalComponent implements OnInit,AfterViewInit  {
  data:boolean= false;
  inputCharacter:number = 0;
  anim:Animation;
  @ViewChild('card_items', {static:false}) card_items:ElementRef;
  currentStep:number = 0;
  currentItem: any[];
  currentState:any;
  ItemService;
  // SELECTED FEATURE ARRAY.
  selectedFeatures:any[]=[];
  // PRICE OF THE CAR.
  price:string = null;
  // WARRENTY KILOMETER.
  warrentyKilometer:string = null;
  // DISTANCE TRAVELED IN KILOMETER.
  distanceTraveledKilometer:string = null;
  // SELLER NOTES
  sellerNotes:string = null;

 @Input() isModal:boolean; 
 // ROUTE NAME HERE.
 @Input() forwardTo:string = null;

 // ROUTE IS FORWARD OR BACK.
 @Input() goBack:string = null;

 // LEFT AND RIGHT ICON.
 icons:any = { has_left_icon:true, left_icon:'../../assets/icon/settings/back.svg', has_right_icon:false, right_icon:'../../assets/icon/Language.svg'};

 // MAIN HEADING/SUBHEADING.
 @Input() heading = {has_main_heading:true, main_heading_name:'Images', has_sub_heading:false, sub_heading_name:''};
  constructor(public modelCtrl: ModalControllerService, private amimationCtrl:AnimationController, private route:Router, private change:ChangeDetectorRef) {

   }

   ngAfterViewInit() {

    

   }


   ngOnDestroy() {
     
     this.ItemService.unsubscribe();
     console.log("Unsubscribed");
   }

  ngOnInit() {

    this.ItemService =   this.modelCtrl.getCurrentObject()
    .subscribe((currentState:any)=>{
      console.log("Current Object Observable: ", currentState)
      this.currentState = currentState;
      this.heading.main_heading_name =  currentState.value.name;
      this.currentItem = currentState.value.value.map(x=>{
        x = {...x,selected:false};
        return x
       });
       console.log("Current ITEM VALUE: ", this.currentItem)
       if(this.currentItem.length != 0){
        this.data = true;
       } else {
        this.data = false;
       }
       this.currentStep = currentState.index;
       this.change.markForCheck();
    });
  }

  selectItem(item,i) {
    console.log("SELECTED INDEX:", i);
   
    if(this.currentStep == 22){
      this.selectedFeatures = this.selectedFeatures.filter(x=>x != item._id);
      this.selectedFeatures.push(item._id);
      this.modelCtrl.modelData.items[22].selected.features_id_array = this.selectedFeatures;
    }

    else{
      console.log("Selected Item: ", item , ' Index:', i);
      this.currentItem[i].selected = true;
      this.modelCtrl.selectItem(item);
      this.data = true;
    }

  }

  inputOccured(e) {
    console.log(e.detail.value );
  }

  navigateToPosts() {
      this.modelCtrl.postFinished();
      this.route.navigate(['tabs/posts']);
  }

  getMake(){}
  getModel(_makeId:string){}
  getTrims(_modelId:string){}
  getYears(){}
  getBodyType(){}
  getColors(){}

  addSellerNotes(e){
    console.log("Seller Notes: ", e.detail.value);
    this.modelCtrl.modelData.items[24].selected.seller_notes = e.detail.value;
  }
  addDistanceTravelled(e){
    console.log("Distance Travelled: ", e.detail.value);
    this.modelCtrl.modelData.items[24].selected.warranty_kilometer = e.detail.value;
  }
  addWarrantyKilo(e){
    console.log("Warranty Kilometer:", e.detail.value);
    this.modelCtrl.modelData.items[24].selected.distance_kilometer = e.detail.value;
  }
  addPrice(e){
    console.log("Price: ",e.detail.value);
    this.modelCtrl.modelData.items[24].selected.price = e.detail.value;
  }
}