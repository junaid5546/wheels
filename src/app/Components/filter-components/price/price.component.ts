import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { ChangeContext, Options, PointerType } from '@angular-slider/ngx-slider';
import { DeviceInfoService } from '../../../Services/device-info.service';
import { IonInput } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
})
export class PriceComponent implements OnInit,AfterViewInit {
  label:string = null;
 // maximum:number = 1000000;
 // minimum:number = 100;
  //value: number = 100;
  //highValue: number = 1000000;
  // options: Options = {
  //   floor: 0,
  //   ceil: 1000000,
  //   step: 500,
  //   vertical: true,
  //   noSwitching: true,
  //   enforceStep: false,
  //   enforceRange: false,
  //   // translate: (value: number): string => {
  //   //   if(value == 1000000){
  //   //   return '1m';
  //   //   } else {
  //   //     return `${value}`;
  //   //   }
  //   // },
  // };
  // maxValue:any;
  // minValue:any;
  // minimum: number = 0;
  // maximum: number = 1000000;
  // options: Options = {
  //   floor: 0,
  //   ceil: 1000000,
  //   step: 500,
  //   noSwitching: true,
  //   vertical: true,
   
  // };
  minValue: number = 0;
  maxValue: number = 1000000;
  lastMin:number=0;
  lastMax:number=1000000;
  options: Options = {
    floor: 0,
    ceil: 1000000,
    noSwitching: true,
    step: 500,
    enforceStep: false,
    vertical: true,
     translate: (value: number): string => {
    if(value == 1000000){
    return '1m';
     } else {
      return `${value}`;
    }
  },
  };
  
  @ViewChild(IonInput,{static:false}) input:IonInput;
  constructor(private deviceInfo:DeviceInfoService,private activated:ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.makeInnerHeight();
    setTimeout(() => {
      this.checkInput();
    },150);
    
  }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
  }

  makeInnerHeight(){
   let doc = document.getElementById('car-price');
   doc.style.height = this.deviceInfo.getDeviceHeight()/1.5+ 'px';
  }

  focusOn(ev){
    console.log("Focus:",ev);
   
  }

  checkInput() {
    this.input.setFocus().then(res=>{
      console.log("Settting focus: ", res);
    })
  }
  getChangeContextString(changeContext: ChangeContext) {

    //“price”:{“min”:5000, “max”:8000},
    console.log(`{“min”:${changeContext.value}, “max”:${changeContext.highValue}}`);
  }
  getInputValue(e,type){
    if(type=='minValue'){
        console.log("min",e.detail.value);
        this.lastMin=e.detail.value;
    }else if(type=='maxValue'){
      console.log("max",e.detail.value);
      this.lastMax=e.detail.value;
    }
  console.log(this.lastMax,this.lastMin)
  }
}
