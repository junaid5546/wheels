import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceInfoService } from '../../Services/device-info.service';
@Component({
  selector: 'app-main-item',
  templateUrl: './main-item.component.html',
  styleUrls: ['./main-item.component.scss'],
})
export class MainItemComponent implements OnInit {
  @Input() items:any[];
  @Input() name:string;
  mainItemHeightPercentage:number = 10;
  mainItemDimensions = {height:'', width:''};

  
  constructor(deviceInfo:DeviceInfoService, private router:Router) {

    let deviceHeight = deviceInfo.getDeviceHeight();
    if(deviceHeight < 700) {
      this.mainItemHeightPercentage = 10;
    } else if(deviceHeight > 700 && deviceHeight < 750){
      this.mainItemHeightPercentage = 12;
    }
     else if(deviceHeight > 750 && deviceHeight < 800) {
      this.mainItemHeightPercentage = 12;
    } else if(deviceHeight > 800) {
      this.mainItemHeightPercentage = 12;
    }
    this.mainItemDimensions.height =  this.mainItemHeightPercentage/100 * deviceInfo.getDeviceHeight() + 'px';
   }

  ngOnInit() {
    console.log('ngOnInit main item');
    this.setMainItemHeight();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.doSomething(changes);
    
    
  }

  private doSomething(input) {
    console.log('Change occured:',input);
  }

  ngOnDestroy() {
    // IF SUBSCRIBED TO ANY SERVICE DO UNSUB HERE.
  }

  setMainItemHeight() {

    let mainItem = document.getElementsByClassName('main-item-container');
    for (let index = 0; index < mainItem.length; index++) {
       const e = mainItem[index];
       if(e instanceof HTMLElement){
         e.style.height = this.mainItemDimensions.height;
       }
    }
    console.log('Main Item: ', mainItem);
  }

  ngAfterViewInit(){
    console.log('Called view init');
    this.setMainItemHeight();
  }

  navigate(url){
    this.router.navigate([url]);
  }


}
