import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { DeviceInfoService } from './Services/device-info.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { UserDataService } from './Services/user-data.service';
import { TokenService } from './Services/token.service';
import { AuthenticationService } from './Services/authentication.service';
import { StatusBar, Style } from '@capacitor/status-bar';
export type platform_name = 'ios' | 'android' | 'web' ;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})


export class AppComponent  implements OnInit  {
  platform_name:platform_name;
  authUrl = 'register';
  apiRoute: any = {};
  getTokenAccess: any = {};
  refreshToken: any = {};

  lang: string = 'ar'; // ar, en
  theme: string = 'light'; // light, dark
  
  constructor( 
      private auth:AuthenticationService,
      private platform: Platform,
      private deviceInfo:DeviceInfoService,
      private router:NavController,
      private userData:UserDataService,
      private token:TokenService,
      public translate: TranslateService) {

      this.translate.setDefaultLang('ar');
      window.addEventListener('statusTap', function () {
        console.log('statusbar tapped');
      });
      
        
  }


  ngOnInit(): void {
      this.router.navigateBack(['tabs'])
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

    this.auth.getAuthToken()
    .then((token:string)=>{
      console.log("TOKEN GOT", token);
    })
    .catch((error)=>{
      console.log("TOKEN ERROR: ", error);
    });
    
    this.userData.getUserObj()
    .then((obj)=>{
      console.log("User OBJ :", JSON.parse(obj.value));
    })

    this.userData.getUserId()
    .then((id) => {
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
      if(localStorage.getItem("Language")){
        this.lang = localStorage.getItem("Language")
        this.translate.use(this.lang);
      }
      else{
        localStorage.setItem("Language",'ar');
      }
    });
  }   

} 