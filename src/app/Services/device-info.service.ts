import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
@Injectable({
  providedIn: 'root'
})
export class DeviceInfoService {

 private height:number = null;
 private width:number = null;

 private mainItemHeight:number = null;
 private mainItemContainerHeight:number = null;
 
 private borderHeightPercentage = 12; // PERCENTAGE
  render:Renderer2;
  constructor(private renderFactory:RendererFactory2, @Inject(DOCUMENT) private document:Document, private translate: TranslateService, private socialSharing: SocialSharing,private callNumber: CallNumber) {
    this.render = this.renderFactory.createRenderer(null,null);
   }

   // GETTING DEFAULT LANGUAGE FROM DEVICE AND RETURN IT.
   async getDefaultLanguage(){
    return new Promise((resolve)=>{
      let language = localStorage.getItem('Language');
        resolve(language);
    })
   }

   // SET DEFAULT LANGUAGE OF THE APP
   setDefaultLanguage(language:string){
    localStorage.setItem('Language', language);
   }

   //SET DEFAULT THEME OF THE APP
   setDefaultTheme(theme:string){
     localStorage.setItem('Theme', theme);
   }

   // GETTING DEFAULT THEME FROM DEVICE AND RETURN IT.
   async getDefaultTheme(){
    return new Promise((resolve)=>{
      let theme = localStorage.getItem('Theme');
        resolve(theme);
    });
   }

  // APPLY THEME TO THE APP.
   applyTheme(theme:string){
    document.querySelector('body').classList.add(theme);
   }
  
  getMainItemHeight = async () => {
    return new Promise(resolve=>{
      console.log('Get Resolver: ', this.mainItemContainerHeight);
      resolve(this.mainItemContainerHeight);
    })
  }

  public setMainItemHeight(height:number){
   return new Promise(resolve=>{
      this.mainItemContainerHeight = height;
      resolve(true);
    })
  }

  // RETURNS THE NUMBER
   public getDeviceHeight() {
    return this.height;
  }

// RETURNS THE NUMBER
 public getDeviceWidth() {
    return this.width;
  }

// SET THE HEIGHT/NUMBER
  setDeviceHeight(height:any){
    this.height = height;
  }

// RETURNS THE WIDTH/NUMBER
  setDeviceWidth(width:any){
    this.width = width;
  }
  
// CALCULATING THE BORDER HEIGHT AND RETURN NUMBER
  makeBorderHeight() {
    return this.borderHeightPercentage/100 * this.height;
  }

  // CHANGE LANGUAGE
  changeLanguage(lang:string) {
    this.translate.use(lang);
    localStorage.setItem("Language",lang);
    this.translate.setDefaultLang(lang);
  }

  setTheme(theme:string) {
    localStorage.setItem('theme',theme);
  }

  isArray(input:any) {
   return  Array.isArray(input);
  }

  socialShare(){
    let options = {
      message: '', // not supported on some apps (Facebook, Instagram)
      subject: '', // fi. for email
      files: ['', ''], // an array of filenames either locally or remotely
      url: '',
      chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title
      appPackageName: '', // Android only, you can provide id of the App you want to share with
      iPadCoordinates: '0,0,0,0' // IOS only iPadCoordinates for where the popover should be point.  Format with x,y,width,height
    };
    this.socialSharing.shareWithOptions(options)
  }

  shareSms(){
    this.socialSharing.shareViaSMS('Hello World','21')
    .then((res=>{
      console.log(res);
    }))
  }

  shareWhatsapp(){
    this.socialSharing.shareViaWhatsApp('Hello')
    .then((res=>{
      console.log("Hello");
    }))
  }


  callTheNumber(){
    this.callNumber.callNumber('9702222222',true);
  }

  
}
