import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { CarInfoModalComponent } from '../Models/car-info-modal/car-info-modal.component';
@Injectable({
  providedIn: 'root'
})
export class ModalControllerService {
  modalProps:any;
  modelData = {
    items:[
      {key:0,name:'Make', value:[{name:'Toyota'},{name:'Nissan'},{name:'BMW'}],selected:{}},
      {key:1,name:'Model', value:[{name:'Camry '},{name:'Corolla'},{name:'Avalon'}],selected:{}},
      {key:2,name:'Trims', value:[{name:'gli'},{name:'xli'}],selected:{}},
      {key:3,name:'Year', value:[{name:'20001'}, {name:20002}],selected:{}},
      {key:4,name:'Condition', value:[{name:'Used'}, {name:'New'}],selected:{}},
      {key:5,name:'Body', value:[{name:'sedan'},{name:'medtain'}],selected:{}},
      {key:6,name:'Exterior Color', value:[{name:'Pink'},{name:"Yellow"}],selected:{}},
      {key:7,name:'Door Count', value:[{name:1},{name:2},{name:3}],selected:{}},
      {key:8,name:'Engine size', value:[{name:'big'},{name:'small'}],selected:{}},
      {key:9,name:'Cylinder count', value:[],selected:{}},
      {key:10,name:'Fuel Type', value:[],selected:{}},
      {key:11,name:'Transmission Type',value:[],selected:{}},
      {key:12,name:'Drivetrain', value:[],selected:{}},
      {key:13,name:"interior Color", value:[],selected:{}},
      {key:14,name:'Seat type',value:[],selected:{}},
      {key:15,name:'Origin',value:[],selected:{}},
      {key:16,name:'Governorate',value:[],selected:{}},
      {key:17,name:'State',value:[],selected:{}},
      {key:18,name:'Warranty Duration',value:[],selected:{}},
      {key:9,name:'Warranty Distance', value:[],selected:{}},
      {key:20,name:'Insurance type',value:[],selected:{}},
      {key:21,name:'Driving Readlines',value:[],selected:{}},
      {key:22,name:'Sale Type',value:[],selected:{}},
      {key:23,name:'Features',value:[],selected:{}}
    ],
    current:null,
    next:null,
    pervious:null
  };

  constructor(private modalController: ModalController) { }

  async presentModal(props) {
    this.modalProps = props;
    console.log("PROPS: ", this.modalProps);
    const modal = await this.modalController.create({
      component: CarInfoModalComponent,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      componentProps:props,
      animated:true,
      backdropBreakpoint:0.8,
      backdropDismiss:true,
      keyboardClose:true,
      showBackdrop:true,
      presentingElement: await this.modalController.getTop() // Get the top-most ion-modal
    });
     modal.onDidDismiss()
     .then((res:any)=>{
       console.log("Dismiss result: ", res);
     })
    console.log("Dissmissal data");
    
    return await modal.present();
  }

  getCurrentState(){
    if(this.modelData.current == null){
      if(this.modelData.items.length >0){
      return this.modelData.current = this.modelData.items[0]; 
    }
    } else {
      return this.modelData.current;
    }
  }

  goToNextState(){
    let item =  this.getCurrentState();
    this.modelData.pervious = item;
    this.modelData.next = this.modelData.items[item.key+2];
    this.modelData.current = this.modelData.items[item.key+1];
    console.log("Current:", this.modelData.current,  " Previous: ", this.modelData.pervious," Next: ", this.modelData.next );
  }

  goToPreviousState() {
   this.modelData.pervious = this.modelData.items[this.modelData.current.key-1];
    this.modelData.current = this.modelData.pervious;
    this.modelData.next = this.modelData.current;
    
    console.log("Current:", this.modelData.current,  " Previous: ", this.modelData.pervious," Next: ", this.modelData.next );
  }

  selectItem(selected){
   
    this.modelData.items[this.modelData.current.key].selected = selected;
    this.goToNextState();
  }


  dismissModal = () => {
    this.modalController.dismiss(this.modalProps)
    .then((res:any)=>{
      this.goToPreviousState();
    })
  }


}
