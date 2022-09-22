// Copyright 2022 Google LLC
/**
 * (Type docs)
 *
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DeviceInfoService } from './Services/device-info.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { UserDataService } from './Services/user-data.service';
import { TokenService } from 'dm-api';
import { CarFiltersService } from './Services/car-filters.service';
import { CamGalService } from './Services/cam-gal.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
export type platform_name = 'ios' | 'android' | 'web';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  platform_name: platform_name;
  authUrl = 'register';
  apiRoute: any = {};
  getTokenAccess: any = {};
  refreshToken: any = {};

  lang: string = 'ar'; // ar, en
  theme: string = 'light'; // light, dark

  constructor(
    private platform: Platform,
    private deviceInfo: DeviceInfoService,
    private router: Router,
    private userData: UserDataService,
    private token: TokenService,
    private filters: CarFiltersService,
    private camGal: CamGalService,
    private iab: InAppBrowser,
    public translate: TranslateService
  ) {
    this.translate.setDefaultLang('ar');

    window.addEventListener('statusTap', function () {
      console.log('statusbar tapped');
    });
    
  }


  

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }

  ngOnInit(): void {
    this.initializeApp();
    this.userData.getUserId().then((value)=>{
      console.log("User Id: " , value);
    })
    this.userData.isSignedIn().then((status:any)=>{
        if(!status){
            // NAVIGATE THE USER TO REGISTER VIEW.
            //this.router.navigate(['register']);
        }
    })
  }

  initializeApp() {
    if (Capacitor.getPlatform() === (this.platform_name = 'ios')) {
      console.log('Platform:', 'IOS');
    } else if (Capacitor.getPlatform() === (this.platform_name = 'android')) {
      console.log('Platform:', 'Android');
    } else if (Capacitor.getPlatform() == (this.platform_name = 'web')) {
      console.log('Platform:', 'Web');
    }
    this.userData.setUserId('');
    this.platform.ready().then((plt) => {

      if (localStorage.getItem('lang')) {
        this.userData.language = localStorage.getItem('lang');
        this.translate.use(this.userData.language);
        this.flipView();
      } else {
        localStorage.setItem('lang', 'en');
        this.flipView();
      }


      // SETTING DEVICE HEIGHT AND WIDTH
      this.deviceInfo.setDeviceHeight(this.platform.height());
      if (localStorage.getItem('lang')) {
        this.lang = localStorage.getItem('lang');
        this.translate.use(this.lang);
      } else {
        localStorage.setItem('lang', 'ar');
      }
    });
  }

  flipView(){
    if(this.userData.language == 'en'){
      document.documentElement.dir = "ltr";
      document.getElementsByTagName("body")[0].style.direction="ltr";
    } else {
      document.documentElement.dir = "rtl";
      document.getElementsByTagName("body")[0].style.direction="rtl";
  }

  }

  
}
