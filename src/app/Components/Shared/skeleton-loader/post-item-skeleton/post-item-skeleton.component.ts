import { Component, OnInit,AfterViewInit } from '@angular/core';
import { DeviceInfoService } from '../../../../Services/device-info.service';
@Component({
  selector: 'app-post-item-skeleton',
  templateUrl: './post-item-skeleton.component.html',
  styleUrls: ['./post-item-skeleton.component.scss'],
})
export class PostItemSkeletonComponent implements OnInit,AfterViewInit {

  constructor( private deviceInfo:DeviceInfoService) { }

  ngOnInit() {}

  ngAfterViewInit(){
    this.makeHeigh();
  }

  makeHeigh(){
    let cards = document.getElementsByClassName('post-main-item');
    for (let index = 0; index < cards.length; index++) {
      const e = cards[index];
      if(e instanceof HTMLElement){
        e.style.height = this.deviceInfo.getDeviceHeight()/2.5 + 'px';
      }
   }
    
  }


}
