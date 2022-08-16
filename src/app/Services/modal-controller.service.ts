// Copyright 2010 Google LLC
/**
 * (Type docs)
 *
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */

import { Injectable, ViewChild } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { ImagePreviewComponent } from '../Models/image-preview/image-preview.component';
import { ToastController } from '@ionic/angular';
import { PlansService, VehicleService, CountryDataService, PostService, Vehicle } from 'dm-api';
import { CarFiltersService } from '../Services/car-filters.service';
import { UserDataService } from "./user-data.service";
import { ErrorHandlerService } from '../Services/error-handler.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ModalControllerService {
  
  // SAVING POST TO LOCAL
  _post = {
    hasPostCreated:false,
    postImages:null,
    postData:{data:null,index:0},
    postId:null
  };

  sortBy: any[] = [
    { id: 1, name: 'Sort by Price (Lowest)', icon: 'arrow-down-outline' },
    { id: 2, name: 'Sort by Price (Highest)', icon: 'arrow-up-outline' },
    { id: 3, name: 'Sort by newest', icon: 'time-outline' },
    { id: 4, name: 'Sort by oldest', icon: 'calendar-outline' },
    { id: 5, name: 'Sort by mileage', icon: 'speedometer-outline' },
    { id: 6, name: 'Sort by mileage', icon: 'speedometer-outline' },
  ];
  modalProps: any;
  private currentObject = new BehaviorSubject<any>(null);

  modelData = {
    items: [
      { key: 'make_id',  name: 'Make', value: [], selected: { _id: '',models:[] } },   //0
      { key: 'model_id', name: 'Model', value: [], selected: {trims:[],engineSize:[]} },//1
      { key: 'trim_id',  name: 'Trims', value: [], selected: { body: [] } },//2
      { key: 'year_id',  name: 'Model Year', value: [], selected: {} },//3
      { key: 'condition_id', name: 'Condition', value: [], selected: {} },//4
      { key: 'body_id', name: 'Body', value: [], selected: {bodies:[],doorCount:[],error:'',maxPrice: null,minPrice:null,filtersId:[]}},//5
      { key: 'engine_size',name: 'Engine Size',value: [],selected: {name:null},},//5==>>6
      
      { key: 'door_count_id',name: 'Doors',value: [],selected: {name:null},},//7
      { key: 'exterior_color_id', name: 'Exterior Color',cssHex:[], value: [], selected: {} },//8
      { key: 'cylinder_count_id', name: 'Cylinders', value: [], selected: {} },//9
      { key: 'fuel_type_id', name: 'Fuel', value: [], selected: {} },//10
      { key: 'transmission_type_id', name: 'Transmission', value: [], selected: {} },//11
      { key: 'drivetrain_id', name: 'Drivetrain', value: [], selected: {} },//12
      { key: 'interior_color_id', name: 'Interior Color', value: [], selected: {} },//13
      { key: 'seats_type_id', name: 'Seats', value: [], selected: {} },//14
      { key: 'insurance_type_id', name: 'Insurance', value: [], selected: {} },//15
      { key: 'plate_type_id', name: 'Plate', value: [], selected: {} },//16
      { key: 'readiness_id', name: 'Driving Readiness', value: [], selected: {} },//17
      { key: 'sale_type_id', name: 'Sale Type', value: [], selected: {} },//18
      { key: 'warranty_duration_id', name: 'Warranty Duration', value: [], selected: {} },//19
       // { key: 19, name: 'Warranty Distance', value: [], selected: {} },
      { key: 'origin_id', name: 'Origin', value: [], selected: {} },//20
      { key: 'governorate_id', name: 'Governorate', value: [], selected: {} },//21
      { key: 'state_id', name: 'State', value: [], selected: { states: null } },//22
      { key: 'features_id_array', name: 'Features (Optional)', value: [], selected: {features_id_array:[]} },//23
      { key: 'additional_features', name: 'Additional Details', value: [{},{}], selected: {price:0,distance_kilometer:0,seller_notes:null,distance_mile:0,primary_phone:null,business_phone:false,warranty_kilometer:null} },//24
     // { key: 'level_id', name: 'Post Type', value: [{},{}], selected: {} },//25 
     { key: 'post_type', name: 'Post Type', value: [{},{}], selected: {} },//25 
      // {"id": "62275964de5b632b481db474","level_duration":21},
    ],
    current: { index: 0, value: null },
    next: { index: 0, value: null },
    pervious: { index: 0, value: null },
    length: -1,
    postId:null
  };

  publish=0;
  constructor(
    private modalController: ModalController,
    public toastController: ToastController,
    private userData: UserDataService,
    private vehicle: VehicleService,
    private carFilters: CarFiltersService,
    private countryApi: CountryDataService,
    private post:PostService,
    private error:ErrorHandlerService,
    private router:Router
  ) {
     this.userData.getPhonePrimary().then((phone)=>{
      console.log("PRIMARY PHONE: ", phone);
      this.modelData.items[24].selected.primary_phone =phone || '968 97725964';
    })
   }

  async presentModal(component, props) {
    this.modalProps = props;
    console.log('PROPS: ', this.modalProps);
    const modal = await this.modalController.create({
      component: component,
      cssClass: 'my-custom-class',
      swipeToClose: false,
      componentProps: props,
      animated: true,
      backdropBreakpoint: 0.8,
      backdropDismiss: true,
      keyboardClose: true,
      showBackdrop: true,
      presentingElement: await this.modalController.getTop(), // Get the top-most ion-modal
    });
    modal.onDidDismiss().then((res: any) => {
      console.log('Dismiss result: ', res);
    });
 // SCROLL INTO VIEW AFTER CHOICE DONE
 
    return await modal.present();
  }

  // SELECTS THE DATA AND GOES TO NEXT ITEM.
  selectItem(selected,i) {
    console.log("Selected Item: ", selected , ' Index:', i);
    this.modelData.items[this.modelData.current.index].selected = selected;
    if (this.modelData.current.index === 0) {
      // SET MODEL ACCORDING TO MAKE
      this.modelData.items[1].value = this.modelData.items[0].selected.models;
      console.log("MODELS",this.modelData.items[1].value)
      console.log("MODELS TWO",this.modelData.items[0].selected.models)

    
      this.incrementOfCurrentIndex();
    } else if (this.modelData.current.index === 1) {

      this.modelData.items[2].value = this.modelData.items[1].selected.trims;
      this.incrementOfCurrentIndex();
    
    } else if (this.modelData.current.index === 4) {
     
      this.modelData.items[5].value = this.modelData.items[2].selected.bodies;

     
      this.incrementOfCurrentIndex();
    }else if(this.modelData.current.index === 5){
        
        this.modelData.items[6].value=this.modelData.items[2].selected.engineSize;    
        this.incrementOfCurrentIndex();
    }else if(this.modelData.current.index === 6){
      console.log(this.modelData.items[5]);
       this.modelData.items[7].value=this.modelData.items[5].selected.doorCount;
      
       this.incrementOfCurrentIndex();
  }
    else if (this.modelData.current.index === 21) {
      this.modelData.items[22].value = this.modelData.items[21].selected.states;
    
      this.incrementOfCurrentIndex();
    }

    else if(this.modelData.current.index===23){
      
        console.log("additional setting");

       
    }else if(this.modelData.current.index===25){
      console.log("SUBSCRIPTION DATA");
      this.publish=25;
    }
    else {
      this.incrementOfCurrentIndex();
    }
  }

  
  dismissModal = () => {
    if (this.modelData.current.index > 0) {
      this.decrementOfIndexes();
    } else {
      this.modalController.dismiss(this.modalProps).then((res: any) => {
        this.decrementOfIndexes();
      });
    }
  };

  postFinished() {
    this.modalController.dismiss(this.modalProps);
  }

  validateItems() {
    if(this.modelData.items != undefined || this.modelData.items.length != 0) {
      this.modelData.length = this.modelData.items.length;
      console.log("LENGTH: ", this.modelData.length);
      return { status: true, value: this.modelData.items.length };
    } else {
      console.log("Else: ", this.modelData.length);
      return { status: false, value: this.modelData.items };
    }
  }

// INITIALIZATION OF INDEXES
  initializeIndexes() {
    this.modelData.current.index = 0;
    this.modelData.current.value = this.modelData.items[0];

    this.modelData.next.index = 1;
    this.modelData.next.value = this.modelData.items[1];

    this.modelData.pervious.index = -1;
    this.modelData.pervious.value = this.modelData.items[-1];

    return {
      status: true,
      current: this.modelData.current,
      previous: this.modelData.pervious,
      next: this.modelData.next,
    };
  }

  startIndexing() {
    let validate = this.validateItems();
    //console.log("Result from  validateItems", validate);
    if (validate.status) {
      let indexes = this.initializeIndexes();
      //console.log("Result from  initializeIndexes", indexes);
     
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

  incrementOfCurrentIndex(type?) {
    console.log('INDEX INCREMENTED');
     // SCROLL INTO VIEW AFTER CHOICE DONE
     document.getElementById("content").scrollIntoView({block: "start", inline: "nearest"});
      // THIS CONDITION BECAUSE NOT ALL DIVS CONTAIN ION LIST WITH LIST ID
     ((document.getElementById("list"))!= null) ? (document.getElementById("list").scrollTo(0,0)) : '';
    if (this.getCurrentItemIndex() < this.getItemsLenght() - 1) {
      console.log(
        'Current:',
        this.getCurrentItemIndex(),
        'Length: ',
        this.getItemsLenght()
      )
      console.log("Object: ", this.modelData.items);
      console.log('Next Object: ', this.modelData.next);
      console.log('Previous Object: ', this.modelData.pervious);
      console.log('Current Object: ', this.modelData.current);
      // CURRENT ONE GOES TO PREVIOUS
      this.modelData.pervious.value = this.modelData.current.value;
      this.modelData.pervious.index = this.modelData.current.index;
      // NEXT ONE TAKE PLACE CURRENT ONE
      this.modelData.current.value = this.modelData.next.value;
      this.modelData.current.index = this.modelData.next.index;
      // NEXT ONE INCREASES
      this.modelData.next.index++;
      this.modelData.next.value =
        this.modelData.items[this.modelData.next.index];
      //return {status:true, current:this.modelData.current, previous:this.modelData.pervious, next:this.modelData.next };
      //this.presentModal(this.getCurrentState());

      this.updatecurrentObject();
     
    }else {
      console.log('ITEM LENGTH: ', this.getItemsLenght());
      console.log('ITEM Index Length: ', this.getCurrentItemIndex());
      
      if( this.getCurrentItemIndex() === 25 && type==='updatepost') {
      
        this.updatePost();
      }
      
      //return {status:false, current:this.modelData.current, previous:this.modelData.pervious, next:this.modelData.next };
    }
    
   

    


    
  
  }

  

  // UPDATE POST TO THE SERVER
  updatePost() {
    console.log("POST ID: ", this.modelData.postId);
    // additional_features  door_count_id    engine_size    features_id_array   plans   state_id
    let obj = {};
    this.modelData.items.forEach(item => {
      if(item.key == 'additional_features'){
        let mile = 1.609344;
        obj["warranty_kilometer"] = item.selected.warranty_kilometer;
        obj["price"] = item.selected.warranty_kilometer;
        obj["distance_mile"] =  (Number(item.selected.warranty_kilometer) * 1 /mile) ;
        obj["primary_phone"] = item.selected.primary_phone;
        obj["seller_notes"] = item.selected.seller_notes || '';
        obj["distance_kilometer"] = item.selected.distance_kilometer;
      } else if (item.key == 'engine_size'){
        obj[item.key] = item.selected.name;
      } else if (item.key == 'door_count_id'){
        obj[item.key] = item.selected.name;
      } else if (item.key == 'features_id_array'){
        obj[item.key] = item.selected.features_id_array;
      } else if(item.key == 'post_type') {
        obj[item.key] = item.selected;
      } else{
        obj[item.key] = item.selected._id;
      }
    });
    let post = JSON.parse( localStorage.getItem('_post') );
    this._post.postId = post.postId;
    this.post.updatePost(obj,this._post.postId)
    .then((post:any)=>{
      if(post.code == 200) {
        this.modalController.dismiss();
        this.error.toast(post.message).then(()=>{
          console.log("POST UPDATE STATUS: ", post);
          this.savePostLocal();
          this.router.navigate(['tabs/tab4'])
        })
      }
    })
    console.log("OBJECT: ", obj);
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
      this.modelData.pervious.value =
        this.modelData.items[this.modelData.pervious.index];
      // return {status:true, current:this.modelData.current, previous:this.modelData.pervious, next:this.modelData.next };
      this.updatecurrentObject();
       
    } else {
      console.log('ERROR');
      console.log('ITEM LENGTH: ', this.getItemsLenght());
      console.log('ITEM Index Length: ', this.getCurrentItemIndex());
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
  async presentImagePreviewModal(imagesArray) {
    const modal = await this.modalController.create({
      component: ImagePreviewComponent,
      cssClass: 'image-preview',
      componentProps: { dataArray: imagesArray },
    });
    return await modal.present();
  }

  /**
   * PRESENTING SHEET MODAL
   * @param component
   * @param arr
   * @returns
   */
  async presentSheetModal(component, arr: any[]) {
    const modal = await this.modalController.create({
      component: component,
      cssClass: 'custom-modal',
      initialBreakpoint: 0.5,
      componentProps: { dataArray: arr },
      breakpoints: [0, 0.5, 1],
      swipeToClose: false
    });
    return await modal.present();
  }

  applyFilter(arr: any[], filterId) {
    switch (filterId) {
      case 1:
        return arr.sort((a, b) => {
          return a.price - b.price;
        });
        break;

      case 2:
        return arr.sort((a, b) => {
          return b.price - a.price;
        });
        break;

      case 3:
        return arr.sort((a, b) => {
          return a.date - b.date;
        });

        break;

      case 4:
        return arr.sort((a, b) => {
          return a.milage - b.milage;
        });
        break;

      case 5:
        return arr.sort((a, b) => {
          return b.milage - a.milage;
        });
        break;

      default:
        break;
    }
  }

  dismissImagePreviewModal() {
    this.modalController.dismiss();
  }

  /**
   * PRESENTING TOAST
   * @param header
   * @param message
   */
  async presentToast(header: string, message: string) {
    const toast = await this.toastController.create({
      duration: 2000,
      color: 'warning',
      cssClass: 'toast-warning',
      position: 'top',
      icon: 'alert-outline',
      header: header,
      message: message,
    });
    toast.present();
  }

  // FETCH ALL MAKES.
  getMakes() {
        this.vehicle.getMakes().then((makes: any) => {
          this.modelData.items[0].value = makes.result;
        });
  }

  createPost(){
    //this.post.createPost()
  }

  savePostLocal() {
    this._post.hasPostCreated = true;
    localStorage.setItem('_post',null);
  }
}
