import { Component, OnInit, Input } from '@angular/core';
import { ModalControllerService } from '../../Services/modal-controller.service';

@Component({
  selector: 'app-car-info-modal',
  templateUrl: './car-info-modal.component.html',
  styleUrls: ['./car-info-modal.component.scss'],
})
export class CarInfoModalComponent implements OnInit {
  currentStep:number = 0;
  currentItem:any[] = [];

 @Input() isModal:boolean; 
 // ROUTE NAME HERE.
 @Input() forwardTo:string = null;

 // ROUTE IS FORWARD OR BACK.
 @Input() goBack:string = null;

 // LEFT AND RIGHT ICON.
 icons:any = { has_left_icon:true, left_icon:'../../assets/icon/settings/back.svg', has_right_icon:true, right_icon:'../../assets/icon/notification.svg'};

 // MAIN HEADING/SUBHEADING.
 @Input() heading = {has_main_heading:true, main_heading_name:'Images', has_sub_heading:false, sub_heading_name:''};
  constructor(public modelCtrl: ModalControllerService) { }

  ngOnInit() {

    let currentState = this.modelCtrl.getCurrentState();
    this.heading.main_heading_name =  currentState.name;
    this.currentItem = currentState.value.map(x=>{
     x = {...x,selected:false};
     return x
    });
    console.log("ITEMS: ", this.currentItem);
    this.currentStep = currentState.key;
  }

  selectItem(item,i) {
    this.currentItem.forEach(x=>{
      x.selected = false;
    })
    this.currentItem[i].selected = true;
    this.modelCtrl.selectItem(item)
    this.modelCtrl.presentModal(this.modelCtrl.getCurrentState());
  }

  

  


}
