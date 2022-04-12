import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DeviceInfoService } from './Services/device-info.service';
import { TranslateService } from '@ngx-translate/core';
import { ChildrenOutletContexts } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent  implements OnInit  {

  lang: string = 'ar'; // ar, en
  theme: string = 'light'; // light, dark

  constructor( private platform: Platform, private deviceInfo:DeviceInfoService,private contexts: ChildrenOutletContexts,
    private router:Router,
    public translate: TranslateService) {
      
      this.translate.setDefaultLang('ar');
      this.initializeApp();
  }

  initializeApp() {
    
  this.router.navigate(['filter'])
    this.platform.ready().then(() => {
      
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
      //CHECK DEFAULT THEME OF THE APP
      this.deviceInfo.getDefaultTheme()
      .then((res:string)=>{
        if(res == null) {
          this.deviceInfo.setDefaultTheme(this.theme);
        } else {
          this.deviceInfo.applyTheme(res);
        }
      });

      //getDefaultTheme();
      //getDefaultFontsize();
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

  getPosts(){


  }



}
