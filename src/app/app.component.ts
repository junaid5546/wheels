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
import { OfflineApiService } from './Services/offline-api.service';
import { Filter } from './Classes/Filter';
import { filterList } from '../JSON/filter-list';
export type platform_name = 'ios' | 'android' | 'web';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  debugging:boolean = true;
  platform_name: platform_name;
  authUrl = 'register';
  apiRoute: any = {};
  getTokenAccess: any = {};
  refreshToken: any = {};

  theme: string = 'light'; // light, dark

  constructor(
    private offline:OfflineApiService,
    private platform: Platform,
    private deviceInfo: DeviceInfoService,
    private router: Router,
    private userData: UserDataService,
    private token: TokenService,
    private filters: CarFiltersService,
    private camGal: CamGalService,
    private iab: InAppBrowser,
    public translate: TranslateService,
    public debug:DebugerService,
    private filterService:CarFiltersService
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
    this.offline.currentNetworkStatus().then((connectionStatus)=>{
      this.debug.log('Connection Status: ', connectionStatus,'green',true);
    });
    this.initializeApp();
    this.userData.isSignedIn().then((status:any)=>{
        this.debug.log('Signed In? ',status,'red',this.debugging);
    });
  }

  initializeApp() {
    if (Capacitor.getPlatform() === (this.platform_name = 'ios')) {
      this.debug.log('Platform','IOS','green',this.debugging);
    } else if (Capacitor.getPlatform() === (this.platform_name = 'android')) {
      this.debug.log('Platform','IOS','green',this.debugging);
    } else if (Capacitor.getPlatform() == (this.platform_name = 'web')) {
      this.debug.log('Platform','IOS','green',this.debugging);
    }


    this.platform.ready().then((plt) => {
      // SETTING DEVICE HEIGHT AND WIDTH
      this.deviceInfo.setDeviceHeight(this.platform.height());

      // CHECK DEFAULT LANGUAGE OF THE APP.
      this.deviceInfo.getDefaultLanguage().then((res) => {
        if (res == null) {
          // SET DEFAULT LANGUAGE OF THE APP IF ITS NOT SET.
          this.deviceInfo.setDefaultLanguage(this.userData.language);
        }
      });

      if (localStorage.getItem('lang')) {
        this.debug.log('Language:', localStorage.getItem('lang'),'green',this.debugging);
        this.userData.language = localStorage.getItem('lang');
        this.translate.use(this.userData.language);
        this.flipView();
      } else {
        this.debug.log('Language:', localStorage.getItem('lang'),'green',this.debugging);
        localStorage.setItem('lang', 'en');
        this.flipView();
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
