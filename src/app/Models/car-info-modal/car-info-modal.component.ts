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
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-car-info-modal',
  templateUrl: './car-info-modal.component.html',
  styleUrls: ['./car-info-modal.component.scss']
})
export class CarInfoModalComponent implements OnInit,AfterViewInit  {
  @ViewChild(IonInput, { static: false }) inputElement: IonInput;
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
  backupUpModels: any = [];
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
    console.log("loaded");
   
    

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
   
       console.log("Current ITEM VALUE: ", this.currentItem);
       if(currentState.index===3){
       this.currentItem.sort().reverse();

       }
       else{
        this.currentItem.sort((a, b) => (a.name > b.name ? 1 : -1));
       }
       
    
       if(this.currentItem.length != 0){
        this.data = true;
       } else {
        this.data = false;
       }
       this.currentStep = currentState.index;
       this.change.markForCheck();
    });

    this.backupUpModels = this.currentItem;
  }

  selectItem(item,i) {
    console.log("SELECTED INDEX:", item._id);
   
    item.selected=!item.selected;
   
    if(this.currentStep == 23){
      this.selectedFeatures = this.selectedFeatures.filter(x=>x != item._id);
      if(item.selected==true){
        this.selectedFeatures.push(item._id);
      }else{
        console.log("REMOVE ELEMENT ")
      }
     
      this.modelCtrl.modelData.items[23].selected.features_id_array = this.selectedFeatures;
      console.log("SELECTED ARRAY:", this.selectedFeatures);
      console.log('check box value ',item.selected);
      
    }

    else{
      console.log("Selected Item: ", item , ' Index:', i);
      this.currentItem[i].selected = true;
      this.modelCtrl.selectItem(item,i);
      this.data = true;
    }

  }

  inputOccured(e) {
    console.log(e.detail.value);
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
 

  /*
  
  this function return array with filtered values after search
  */ 
  filterData(e){
    
    const filteration =(e.detail.value);
    this.currentItem = this.filterItems(filteration);
    if (filteration.length === 0) {
         this.currentItem = this.backupUpModels;
    }
  }

filterItems(searchTerm) {
    console.log(searchTerm);
    return this.backupUpModels.filter(item => {
        return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
}
}