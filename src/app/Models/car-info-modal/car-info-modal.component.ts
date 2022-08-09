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
import { PlansService } from 'dm-api';

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
  filteration:String;
  stableData:any[]=[];
  priceError:string;
  errorField:Boolean=false;
  warrantyCheck:boolean;
  distanceCheck:boolean;
  nextButton:number=0;
 @Input() isModal:boolean; 
 // ROUTE NAME HERE.
 @Input() forwardTo:string = null;

 // ROUTE IS FORWARD OR BACK.
 @Input() goBack:string = null;

 // LEFT AND RIGHT ICON.
 icons:any = { has_left_icon:true, left_icon:'../../assets/icon/settings/back.svg', has_right_icon:false, right_icon:'../../assets/icon/Language.svg'};

 // MAIN HEADING/SUBHEADING.
 @Input() heading = {has_main_heading:true, main_heading_name:'Images', has_sub_heading:false, sub_heading_name:''};
  constructor(private plansApi:PlansService,public modelCtrl: ModalControllerService, private amimationCtrl:AnimationController, private route:Router, private change:ChangeDetectorRef) {

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
       this.filteration='';
       this.stableData=this.currentItem;
       if(currentState.index===3){
       this.currentItem.sort().reverse();

       }
       else if(currentState.index==1 || currentState.index==2 || currentState.index==0){
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
  getPlans() {
    console.log("PLANS CALLED");
    this.plansApi.getPlans('62e76b90839e15bb730a935e','en')
    .then((plans:any)=>{
      console.log("THEN");
      if(plans.code === 200){
        console.log("PLANS",plans);
     
      } else {
        console.log("NULL");
       
      }
    })
    .catch((error)=>{
      console.log("ERROR: ", error);
    })
  } 
  selectItem(item,i) {
    console.log("SELECTED INDEX:", item._id);
   this.getPlans();
    item.selected=!item.selected;
   
    if(this.currentStep == 23){
      console.log("plans");

      this.selectedFeatures = this.selectedFeatures.filter(x=>x != item._id);
      if(item.selected==true){
        this.selectedFeatures.push(item._id);
      }else{
        console.log("REMOVE ELEMENT ")
      }
     
      this.modelCtrl.modelData.items[23].selected.features_id_array = this.selectedFeatures;
      console.log("SELECTED ARRAY:", this.selectedFeatures);
      console.log('check box value ',item.selected);

      //CHECK IF CAR IS USED OR NEW SO WE CAN HIDE WARRANTY FIELDS
       console.log('VALUE OF CONDITION', this.modelCtrl.modelData.items[4].selected);

       if(this.modelCtrl.modelData.items[4].selected._id=='a83d7d24-5e48-4bd1-83a9-05d51b6fe839'){
            console.log("ITS USED CAR REMOVE WARRANTY DISTANCE");
            this.warrantyCheck=false;
            this.distanceCheck=true;
       }else if(this.modelCtrl.modelData.items[4].selected._id=='c96de34f-2116-44ed-ada2-509bb993e36a'){
            console.log("NEW CAR");
            this.distanceCheck=false;
            this.warrantyCheck=true;
            this.modelCtrl.modelData.items[24].selected.distance_kilometer=0;
       }

      
    }
  
    else{
     // console.log("Selected Item: ", item , ' Index:', i);
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
  testfocus(){
    
    
    this.priceError=this.modelCtrl.modelData.items[5].selected.error;
   

    if(+this.price>this.modelCtrl.modelData.items[5].selected.maxPrice){
      this.errorField=true;
     
    }else if(+this.price<this.modelCtrl.modelData.items[5].selected.minPrice){
      this.errorField=true;
      
    }
   
  }
  addDistanceTravelled(e){
    console.log("Distance Travelled: ", e.detail.value);
    console.log(this.price);
   this.modelCtrl.modelData.items[24].selected.warranty_kilometer = e.detail.value;
   this.showNextButtonInAdditional();
  }
  addWarrantyKilo(e){
   
    console.log("Warranty Kilometer:", e.detail.value);
    console.log(this.price);
    this.modelCtrl.modelData.items[24].selected.distance_kilometer = e.detail.value;
    this.showNextButtonInAdditional();
  }
  addPrice(e){
   // console.log("Price: ",e.detail.value);
    // this.priceError=this.modelCtrl.modelData.items[5].selected.error;
   

    // if(+e.detail.value>this.modelCtrl.modelData.items[5].selected.maxPrice){
    //   this.errorField=true;
     
    // }else if(+e.detail.value<this.modelCtrl.modelData.items[5].selected.minPrice){
    //   this.errorField=true;
      
    // }else{
      this.errorField=false;
      this.modelCtrl.modelData.items[24].selected.price = e.detail.value;
      console.log('PRICE ',this.modelCtrl.modelData.items[24].selected.price);
      this.showNextButtonInAdditional();
  //  }
   
   
   
  }



  // CHECK ON PRICE DATA, WARRANTY KILOS AND DISTANCE KILOS

  showNextButtonInAdditional(){
    if(this.price!=null && this.warrentyKilometer!=null){
      this.nextButton=24;
    }else if(this.price!=null && this.distanceTraveledKilometer!=null){
      this.nextButton=24;
    }else if(this.warrentyKilometer!=null && this.distanceTraveledKilometer!=null){
      this.nextButton=24;
    }else{
      this.nextButton=0;
    }
  }
 

  /*
  
  this function return array with filtered values after search
  */ 
  filterData(e){
    
     this.filteration =(e.detail.value);
    this.currentItem = this.filterItems( this.filteration);
    if ( this.filteration.length === 0) {
      console.log("EMPTY VALUE");
         this.currentItem = this.stableData;
    }
  }

filterItems(searchTerm) {
    console.log(searchTerm);
    return this.currentItem.filter(item => {
        return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
}
}