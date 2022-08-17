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
import { CarFiltersService} from './Services/car-filters.service';
import { DatabaseService } from './Services/database.service'
export type platform_name = 'ios' | 'android' | 'web' ;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})


export class AppComponent  implements OnInit,OnDestroy  {

  platform_name:platform_name;
  authUrl = 'register';
  apiRoute: any = {};
  getTokenAccess: any = {};
  refreshToken: any = {};

  lang: string = 'ar'; // ar, en
  theme: string = 'light'; // light, dark
  
  constructor( 
      private db:DatabaseService,
      private platform: Platform,
      private deviceInfo:DeviceInfoService,
      private router:Router,
      private userData:UserDataService,
      private token:TokenService,
      private filters:CarFiltersService,
      public translate: TranslateService) {

      this.translate.setDefaultLang('ar');
      
      window.addEventListener('statusTap', function () {
        console.log('statusbar tapped');
      });  

  }
  
  ngOnDestroy(): void {
    console.log("ngOnDestroy");
  }


  ngOnInit(): void {
    this.initializeApp();
  }

  initializeApp() {

    if (Capacitor.getPlatform() === (this.platform_name = 'ios')) {
      console.log("Platform:", "IOS");
    } else if(Capacitor.getPlatform() === (this.platform_name = 'android' )){
      console.log("Platform:", "Android");
    } else if(Capacitor.getPlatform() == (this.platform_name = 'web')){
      console.log('Platform:', "Web");
    }
    
    //this.router.navigate(['register']);
    
    /*this.auth.getAuthToken()
    .then((token:string)=>{
      console.log("TOKEN GOT", token);
    })
    .catch((error)=>{
      console.log("TOKEN ERROR: ", error);
    });*/

    // GETTING USER OBJECT FROM LOCAL STORAGE.
    this.userData.getUserObj()
    .then((obj)=>{
      console.log("User OBJ :", JSON.parse(obj.value));
    })

    // GETTING USER ID FROM LOCAL STORAGE.
    this.userData.getUserId()
    .then((id) => {
      console.log("USER ID: ", id);
    });

    this.platform.ready().then((plt) => {
      // SETTING DEVICE HEIGHT AND WIDTH
      this.deviceInfo.setDeviceHeight(this.platform.height());
     
      // CHECK DEFAULT LANGUAGE OF THE APP.
      this.deviceInfo.getDefaultLanguage()
      .then((res)=>{
        if(res == null){
          // SET DEFAULT LANGUAGE OF THE APP IF ITS NOT SET.
          this.deviceInfo.setDefaultLanguage(this.lang);
        }
      });

      /**
       * fetch('http://localhost:3000', {
  
            // HTTP request type
            method: "POST",
  
            // Sending our blob with our request
            body: blob
        })
        .then(response => alert('Blob Uploaded'))
        .catch(err => alert(err));
    }
       */
     
      // CHECK DEFAULT THEME OF THE APP
      this.deviceInfo.getDefaultTheme()
      .then((res:string)=>{
        if(res == null) {
          this.deviceInfo.setDefaultTheme(this.theme);
        } else {
          this.deviceInfo.applyTheme(res);
        }
      });

      // getDefaultTheme();
      // getDefaultFontsize();
      if(localStorage.getItem("lang")){
        this.lang = localStorage.getItem("lang")
        this.translate.use(this.lang);
      }
      else{
        localStorage.setItem("lang",'ar');
      }
    });
  }   

  

} 