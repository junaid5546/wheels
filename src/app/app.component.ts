import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DeviceInfoService } from './Services/device-info.service';
import { TranslateService } from '@ngx-translate/core';
import { ChildrenOutletContexts } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { UserRegistration } from './Interface/user';
import { Capacitor } from '@capacitor/core';
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
     private platform: Platform,
      private deviceInfo:DeviceInfoService,
      private contexts: ChildrenOutletContexts,
      private apiService:ApiService,
      private router:Router,
      public translate: TranslateService) {

      this.translate.setDefaultLang('ar');
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
     /*let obj = new UserRegistration();
  obj.firstName = "Muhammad";
  obj.lastName  = "Gul";
  obj.primaryPhone.areacode = 11;
  obj.primaryPhone.phoneNumber = 12121212121;
  obj.getDateOfBirth("19/02/1991");
  this.createUser(obj);
*/
  this.router.navigate(['take-car-images']);
  
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


  

  ngOnInit(): void {
 
  }
    

  getPosts() {
  
  }


  createUser(userObj:UserRegistration) {
    console.log("Creating user");
    const apiRoute: any = {};
    return new Promise((resolve, reject) => {
    apiRoute.apiroute = this.authUrl;
    apiRoute.data = userObj;
    this.apiService.post(apiRoute, 'h3')
        .then((data: any) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

} 