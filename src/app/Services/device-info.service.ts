import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
  constructor(private renderFactory:RendererFactory2, @Inject(DOCUMENT) private document:Document, private translate: TranslateService) {
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
  
}
