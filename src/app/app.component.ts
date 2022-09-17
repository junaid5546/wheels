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
import { DebugerService } from './Services/debuger.service'
import { Filter } from './Classes/Filter';
import { filterList } from '../JSON/filter-list';
import { filterType_c } from './Interface/Name';
export type platform_name = 'ios' | 'android' | 'web';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  debugging:false;
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
    public translate: TranslateService,
    public debug:DebugerService
  ) {
    this.translate.setDefaultLang('ar');

    window.addEventListener('statusTap', function () {
      this.debug.log('Statusbar','Tapped!','yellow',this.debugging);
    });
    
  }


  

  ngOnDestroy(): void {
    this.debug.log('Statusbar','App.component.ts','green',this.debugging);
  }

  ngOnInit(): void {
    this.debug.log('Hello world: ', 'ddd', 'pink',this.debugging)
    this.initializeApp();
    this.userData.isSignedIn().then((status:any)=>{
        this.debug.log('Signed In? ',status,'red',this.debugging);
    });
    this.createFilters();
  }

  initializeApp() {
    if (Capacitor.getPlatform() === (this.platform_name = 'ios')) {
      this.debug.log('Platform','IOS','green',this.debugging);
    } else if (Capacitor.getPlatform() === (this.platform_name = 'android')) {
      this.debug.log('Platform','IOS','green',this.debugging);
    } else if (Capacitor.getPlatform() == (this.platform_name = 'web')) {
      this.debug.log('Platform','IOS','green',this.debugging);
    }

    // GETTING USER OBJECT FROM LOCAL STORAGE.
    this.userData.getUserObj().then((obj) => {
    });

    // GETTING USER ID FROM LOCAL STORAGE.
    this.userData.getUserId().then((id) => {
    });

    this.platform.ready().then((plt) => {
      // SETTING DEVICE HEIGHT AND WIDTH
      this.deviceInfo.setDeviceHeight(this.platform.height());

      // CHECK DEFAULT LANGUAGE OF THE APP.
      this.deviceInfo.getDefaultLanguage().then((res) => {
        if (res == null) {
          // SET DEFAULT LANGUAGE OF THE APP IF ITS NOT SET.
          this.deviceInfo.setDefaultLanguage(this.lang);
        }
      });

      // CHECK DEFAULT THEME OF THE APP
      this.deviceInfo.getDefaultTheme().then((res: string) => {
        if (res == null) {
          this.deviceInfo.setDefaultTheme(this.theme);
        } else {
          this.deviceInfo.applyTheme(res);
        }
      });

      // getDefaultTheme();
      // getDefaultFontsize();
      if (localStorage.getItem('lang')) {
        this.lang = localStorage.getItem('lang');
        this.translate.use(this.lang);
      } else {
        localStorage.setItem('lang', 'ar');
      }
    });
  }

  createFilters() {
    // CREATING ARRAY OF FILTERS
      let filterObjArray:Filter[] = [];
      filterList.forEach(ele=>{
        let obj = new Filter(ele);
        filterObjArray.push(obj);
      })
    this.debug.log('Filter Object: ', filterObjArray, 'orange', false)
    filterObjArray[0].getTypes()[0].checkMarkType();
    this.debug.log('Checked list: ', filterObjArray,'purple',true);
    //this.debug.log('CHECK MARKING',x,'yellow',true)
    //let filterType = new filterType_c();
  }
}
