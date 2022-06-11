import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { DeviceInfoService } from '../../../Services/device-info.service';
import { IonInput } from '@ionic/angular';
import { filter } from '../../../Interface/car-filter';
@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss'],
})
export class PriceComponent implements OnInit,AfterViewInit {
  maximum:string = ",000"
  minimum:string = ",000"
  value: number = 100;
  options: Options = {
    floor: 0,
    ceil: 200,
    vertical: true
  };
  @ViewChild(IonInput,{static:false}) input:IonInput;
  constructor(private deviceInfo:DeviceInfoService) { }

  ngAfterViewInit(): void {
    this.makeInnerHeight();
    this.checkInput()
  }

  ngOnInit() {
    
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
}
