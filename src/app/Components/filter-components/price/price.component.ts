import { Component, OnInit,AfterViewInit, ViewChild,EventEmitter, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ChangeContext, Options, PointerType } from '@angular-slider/ngx-slider';
import { DeviceInfoService } from '../../../Services/device-info.service';
import { CarFiltersService } from '../../../Services/car-filters.service';
import { IonInput } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../../Services/user-data.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class PriceComponent implements OnInit,AfterViewInit {

manualRefresh: EventEmitter<void> = new EventEmitter<void>();

  label:string = null;
  minValue: number = 100;
  maxValue: number = 100000;
  lastMin:number=null;
  lastMax:number=null;
  options: Options = {
    floor: 0,
    ceil: 100000,
    noSwitching: true,
    step: 1000,
    enforceStep: false,
    vertical: true,
     translate: (value: number): string => {
    if(value == 100000) {
    return '100,000';
     } else {
      return `${value}`;
    }},
  };
  
  @ViewChild(IonInput,{static:false}) inputMax:IonInput;
  @ViewChild(IonInput,{static:false}) inputMin:IonInput;
  @ViewChild('slider') slider: ElementRef;

  constructor(private deviceInfo:DeviceInfoService,private activated:ActivatedRoute, private carFilter:CarFiltersService, private changeRef:ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.makeInnerHeight();
    setTimeout(() => {
    this.checkInput();
    },150);
  }

   onMove = (detail,x) => {
   console.log(detail); 
  }

  ngOnInit() {
    this.label = this.activated.snapshot.params.label;
    this.carFilter.filterObject[this.label] = [];
  }


  private onStart(d) {
    const now = Date.now();
    console.log("Start: ", now, d);
  }

  makeInnerHeight(){
   let doc = document.getElementById('car-price');
   doc.style.height = this.deviceInfo.getDeviceHeight()/1.5+ 'px';
  }

  focusOn(ev){
    console.log("Focus:",ev);
    this.manualRefresh.emit();
  }

  checkInput() {
    this.inputMax.setFocus().then(res=>{
      console.log("Settting focus: ", res);
    })
  }
  getChangeContextString(changeContext: ChangeContext) {
    this.lastMax=changeContext.highValue;
    this.minValue= changeContext.value;
   
   console.log( typeof(changeContext.highValue));
    //“price”:{“min”:5000, “max”:8000},
    console.log(`{“min”:${changeContext.value}, “max”:${changeContext.highValue}}`);
    this.changeRef.detectChanges();
  }

  startMoving(){
    console.log("Start moving");
  }

  endMoving(){
    console.log("End Moving");
  }

  getInputValue(e,type){
    
    if(type=='minValue'){
        console.log("min",e.detail.value);
        this.lastMin=e.detail.value;
        //this.minValue = Number(e.detail.value);
    } else if(type=='maxValue') {
      console.log(typeof(e.detail.value));
      console.log("max",e.detail.value);
      this.lastMax=e.detail.value;
      //this.maxValue = Number(e.detail.value);
    }
  console.log(this.lastMax,this.lastMin)
  }
}
