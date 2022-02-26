import { Component, OnInit } from '@angular/core';
import { DeviceInfoService } from '../../Services/device-info.service';
@Component({
  selector: 'app-add-slider',
  templateUrl: './add-slider.component.html',
  styleUrls: ['./add-slider.component.scss'],
})
export class AddSliderComponent implements OnInit {
  ad_banner_height_percentage:number = 13;
  ad_banner_height;
  constructor(deviceInfo:DeviceInfoService) {
    this.ad_banner_height =  this.ad_banner_height_percentage/100 * deviceInfo.getDeviceHeight() + 'px';
   }

  ngOnInit() {
     
  }

  ngOnDestroy() {
    // IF SUBSCRIBED TO ANY SERVICE DO UNSUB HERE.
  }

  setAdBannerHeight() {
    let banner = document.getElementById('ad-banner-height');
    banner.style.height = this.ad_banner_height;
  }

  ionViewWillEnter(){
    //this.setAdBannerHeight();
  }

  ngAfterViewInit(){
    //this.setAdBannerHeight();
  }

  
}
