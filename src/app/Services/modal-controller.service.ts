// Copyright 2010 Google LLC
/**
 * (Type docs)
 *
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */

import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from "rxjs";
import { ImagePreviewComponent } from '../Models/image-preview/image-preview.component';
import { ToastController } from '@ionic/angular';
import { PlansService,VehicleService } from 'dm-api';
import { CarFiltersService } from '../Services/car-filters.service';
import { Car } from '../Interface/cars';
@Injectable({
  providedIn: 'root'
})
export class ModalControllerService {
  car:Car =  new Car();
  sortBy: any[] = [
    { id: 1, name: 'Sort by Price (Lowest)', icon: "arrow-down-outline" },
    { id: 2, name: 'Sort by Price (Highest)', icon: "arrow-up-outline" },
    { id: 3, name: 'Sort by newest', icon: "time-outline" },
    { id: 4, name: 'Sort by oldest', icon: 'calendar-outline' },
    { id: 5, name: 'Sort by mileage', icon: "speedometer-outline" },
    { id: 6, name: 'Sort by mileage', icon: "speedometer-outline" }
  ]
  modalProps: any;
  private currentObject = new BehaviorSubject<any>(null);
  modelData = {
    items: [
      { key: 0, name: 'Make', value: [{name:'sdfdsf'}], selected: {} },
      { key: 1, name: 'Model', value: [], selected: {} },
      { key: 2, name: 'Trims', value: [], selected: {} },
      { key: 3, name: 'Year', value: [], selected: {} },
      { key: 4, name: 'Condition', value:this.carFilters.filters.condition , selected: {} },
      { key: 5, name: 'Body', value: this.carFilters.filters.body, selected: {} },
      { key: 6, name: 'Exterior Color', value: this.carFilters.filters.exteriorColor, selected: {} },
      { key: 7, name: 'Door Count', value: [{ name: 1 }, { name: 2 }, { name: 3 }, {name:4}], selected: {} },
      { key: 8, name: 'Engine size', value: [{ name: '4000' }, { name: '2000' }], selected: {} },
      { key: 9, name: 'Cylinder count', value: this.carFilters.filters.cylinder, selected: {} },
      { key: 10,name: 'Fuel Type', value: this.carFilters.filters.fueltype, selected: {} },
      { key: 11,name: 'Transmission Type', value: this.carFilters.filters.transmission, selected: {} },
      { key: 12,name: 'Drivetrain', value: this.carFilters.filters.drivetrain, selected: {} },
      { key: 13,name: "interior Color", value: this.carFilters.filters.interiorColor, selected: {} },
      { key: 14,name: 'Seat type', value: this.carFilters.filters.seatType, selected: {} },
      { key: 15,name: 'Origin', value: this.carFilters.filters.origins, selected: {} },
      { key: 16,name: 'Governorate', value: null, selected: {} },
      { key: 17,name: 'State', value: this.carFilters.filters.state, selected: {} },
      { key: 18,name: 'Warranty Duration', value: this.carFilters.filters.warrentyDuration, selected: {} },
      { key: 19,name: 'Warranty Distance', value: this.carFilters.filters.warrentyDistance, selected: {} },
      { key: 20,name: 'Insurance type', value: this.carFilters.filters.insurance, selected: {} },
      { key: 21,name: 'Driving Readlines', value: this.carFilters.filters.driving_readiness, selected: {} },
      { key: 22,name: 'Sale Type', value: this.carFilters.filters.saleType, selected: {} },
      { key: 23,name: 'Features', value: this.carFilters.filters.feature, selected: {} },
      { key: 24,name: 'Additional Details', value: null, selected: {} },
      { key: 25,name: 'Special Plans', value:null , selected: {} }
    ],
    current: { index: 0, value: null },
    next: { index: 0, value: null },
    pervious: { index: 0, value: null },
    length: -1
  };

  constructor(private modalController: ModalController,public toastController: ToastController, private plans:PlansService, private vehicle:VehicleService, private carFilters:CarFiltersService) { 
    
  }

  async presentModal(component,props) {
    this.modalProps = props;
    console.log("PROPS: ", this.modalProps);
    const modal = await this.modalController.create({
      component: component,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      componentProps: props,
      animated: true,
      backdropBreakpoint: 0.8,
      backdropDismiss: true,
      keyboardClose: true,
      showBackdrop: true,
      presentingElement: await this.modalController.getTop() // Get the top-most ion-modal
    });
    modal.onDidDismiss()
      .then((res: any) => {
        console.log("Dismiss result: ", res);
      });

    return await modal.present();
  }



  selectItem(selected) {
    console.log("Selected Item", selected);
    this.modelData.items[this.modelData.current.index].selected = selected;
    this.incrementOfCurrentIndex();
  }


  dismissModal = () => {
    if (this.modelData.current.index > 0) {
      this.decrementOfIndexes();
    } else {
      this.modalController.dismiss(this.modalProps)
        .then((res: any) => {
          this.decrementOfIndexes();
        })
    }

  }

  postFinished() {
    this.modalController.dismiss(this.modalProps);
  }


  validateItems() {
    if (this.modelData.items != undefined || this.modelData.items.length != 0) {
      this.modelData.length = this.modelData.items.length;
      //console.log("LENGTH: ", this.modelData.length);
      return { status: true, value: this.modelData.items.length };
    } else {
      //console.log("Else: ", this.modelData.length);
      return { status: false, value: this.modelData.items };
    }
  }

  initializeIndexes() {
    this.modelData.current.index = 0;
    this.modelData.current.value = this.modelData.items[0];

    this.modelData.next.index = 1;
    this.modelData.next.value = this.modelData.items[1];

    this.modelData.pervious.index = -1
    this.modelData.pervious.value = this.modelData.items[-1];

    return { status: true, current: this.modelData.current, previous: this.modelData.pervious, next: this.modelData.next };
  }

  startIndexing() {
    let validate = this.validateItems();
    //console.log("Result from  validateItems", validate);
    if (validate.status) {
      let indexes = this.initializeIndexes();
      //console.log("Result from  initializeIndexes", indexes);
      this.loadData(this.getCurrentItemIndex());
      return { status: true, value: indexes };
    } else {
      return { status: false, value: null };

    }
  }

  getCurrentItemIndex() {
    return this.modelData.current.index;
  }

  getItemsLenght() {
    return this.modelData.length;
  }

  getCurrentState() {
    return this.modelData.current;
  }

  incrementOfCurrentIndex() {
    if (this.getCurrentItemIndex() < this.getItemsLenght() - 1) {
      console.log("Current:", this.getCurrentItemIndex(), "Length: ", this.getItemsLenght());
      console.log("Next Object: ",this.modelData.next);
      console.log("Previous Object: ",this.modelData.pervious);
      console.log("Current Object: ",this.modelData.current);
        this.loadData(this.getCurrentItemIndex()+1)
      // CURRENT ONE GOES TO PREVIOUS
      this.modelData.pervious.value = this.modelData.current.value;
      this.modelData.pervious.index = this.modelData.current.index;
      // NEXT ONE TAKE PLACE CURRENT ONE
      this.modelData.current.value = this.modelData.next.value;
      this.modelData.current.index = this.modelData.next.index;
      // NEXT ONE INCREASES
      this.modelData.next.index++;
      this.modelData.next.value = this.modelData.items[this.modelData.next.index];
      //return {status:true, current:this.modelData.current, previous:this.modelData.pervious, next:this.modelData.next };
      //this.presentModal(this.getCurrentState());
      this.updatecurrentObject();
    } else {
      console.log("ERROR");
      console.log("ITEM LENGTH: ", this.getItemsLenght());
      console.log("ITEM Index Length: ", this.getCurrentItemIndex());
      //return {status:false, current:this.modelData.current, previous:this.modelData.pervious, next:this.modelData.next };
    }
  }

  decrementOfIndexes() {
    if (this.getCurrentItemIndex() > 0) {
      // CURRENT ONE GOES TO PREVIOUS
      this.modelData.next.value = this.modelData.current.value;
      this.modelData.next.index = this.modelData.current.index;
      // NEXT ONE TAKE PLACE CURRENT ONE
      this.modelData.current.value = this.modelData.pervious.value;
      this.modelData.current.index = this.modelData.pervious.index;
      // NEXT ONE INCREASES
      this.modelData.pervious.index--;
      this.modelData.pervious.value = this.modelData.items[this.modelData.pervious.index];
      // return {status:true, current:this.modelData.current, previous:this.modelData.pervious, next:this.modelData.next };
      this.updatecurrentObject();
    } else {
      console.log("ERROR");
      console.log("ITEM LENGTH: ", this.getItemsLenght());
      console.log("ITEM Index Length: ", this.getCurrentItemIndex());
      // return {status:false, current:this.modelData.current, previous:this.modelData.pervious, next:this.modelData.next };
    }
  }

  updatecurrentObject() {
    this.currentObject.next(this.modelData.current);
  }

  getCurrentObject() {
    return this.currentObject.asObservable();
  }

/**
 * 
 * @param imagesArray 
 * @returns 
 */
async presentImagePreviewModal(imagesArray){
const modal = await this.modalController.create({
  component:ImagePreviewComponent,
  cssClass: 'image-preview',
  componentProps:{"dataArray":imagesArray},
});
return await modal.present();
}

/**
 * PRESENTING SHEET MODAL 
 * @param component 
 * @param arr 
 * @returns 
 */
  async presentSheetModal(component,arr:any[]) {
    const modal = await this.modalController.create({
      component: component,
      cssClass: "custom-modal",
      initialBreakpoint: 0.5,
      componentProps:{"dataArray":arr},
      breakpoints: [0, 0.5, 1]
    });
    return await modal.present();
  }


  applyFilter(arr: any[], filterId) {
    switch (filterId) {

      case 1:
      return arr.sort((a,b)=>{
        return a.price - b.price
      });
        break;

      case 2:
        return arr.sort((a,b)=>{
          return b.price - a.price
        });
        break;


      case 3:
       
        return arr.sort((a,b)=>{
          return a.date - b.date
        });
        
        break;



      case 4:
        return arr.sort((a,b)=>{
          return a.milage - b.milage
        });
        break;

        case 5:
        return arr.sort((a,b)=>{
          return b.milage - a.milage
        });
        break;

      default:
        break;
    }
  }


  dismissImagePreviewModal(){
    this.modalController.dismiss();
  }

/**
 * PRESENTING TOAST 
 * @param header
 * @param message
 */
  async presentToast(header:string, message:string) {
    const toast = await this.toastController.create({
      duration: 2000,
      color:'warning',
      cssClass:'toast-warning',
      position: 'top',
      icon: 'alert-outline',
      header: header,
      message: message,
    });
    toast.present();
  }
 
 loadData(index){

  switch (index) {
     case 0:
     this.vehicle.getMakes().then((makes:any)=>{this.modelData.items[0].value = makes.result});
     break;

     case 1:
      console.log("Case ", 1);
      //this.vehicle.getModels().then((makes:any)=>{this.modelData.items[0].value = makes.result});
      break;

      case 2:
        console.log("Case ", 2);
        //this.vehicle.getModels().then((makes:any)=>{this.modelData.items[0].value = makes.result});
        break;

        case 3:
          console.log("Case ", 3);
          //this.vehicle.getModels().then((makes:any)=>{this.modelData.items[0].value = makes.result});
          break;

    default:
      break;
  }
 }


  

  
}
/// YEAR [{key:'lsafjlsdajf222324',value:'2001' name:""}].
// BODY NOT GETTING INTO FILTERED POST.
// List of colors [{key:'12121lsafjlsdajf222324',value:'#FFFFF', name:"White"}]
//warranty Duration.
//plate_type
//features
