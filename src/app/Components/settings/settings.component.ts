import { Component, OnInit } from '@angular/core';
import { DeviceInfoService } from '../../Services/device-info.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

  icons:any = { has_left_icon:true, left_icon:'../../assets/icon/settings.svg', has_right_icon:true, right_icon:'../../assets/icon/notification.svg'};
  heading:any = { has_main_heading:true, main_heading_name:"The Digital Mall", has_sub_heading:true, sub_heading_name:'digital-mall.com'  };
  fontValue:string = 'standard';
  themeColor:string = 'light';
  language:string = 'ar';

  settingsHeaderHeightPercentage:number = 8;
  settingsHeaderDimensions = {height:'', width:''};

  constructor( private deviceInfo:DeviceInfoService, private router:Router ) {
   
   }

  ngOnInit() {
    this.checkDefaultTheme();
    this.checkDefaultLanguage();
  }

  ngOnDestroy() {
    // IF SUBSCRIBED TO ANY SERVICE DO UNSUB HERE.
  }

  setSettingsHeaderHeight(){
    this.settingsHeaderDimensions.height =  this.settingsHeaderHeightPercentage/100 * this.deviceInfo.getDeviceHeight() + 'px';
    let mainItem = document.getElementById('settings-header-container');
    mainItem.style.height = this.settingsHeaderDimensions.height;
  }


  ngAfterViewInit(){
    console.log('Called settings ngAfterViewInit');
    //this.setSettingsHeaderHeight();
  }


  goBack(){
    this.router.navigate(['home']);
  }

  segmentChanged(event){
    console.log("Event for segment: ", event);
  }

  changeTheme(e){

    console.log('e', e.detail.value);
    
    let convertToNumber = Number(e.detail.value);
    // 0 = LIGHT; 1 = DARK
    if( convertToNumber == 0 ){
      document.querySelector('body').classList.remove('dark');
      document.querySelector('body').classList.add('light');
      this.deviceInfo.setDefaultTheme('light');
    } else {
      document.querySelector('body').classList.remove('light');
      document.querySelector('body').classList.add('dark');
      this.deviceInfo.setDefaultTheme('dark');
    }
    console.log('e', e.detail.value, 'Number: ', convertToNumber);
  }

  changeLanguage(lan) {
    let lang = lan.detail.value;
    this.deviceInfo.changeLanguage(lang);
  }

  checkDefaultTheme() {
    this.deviceInfo.getDefaultTheme()
    .then((res:string)=>{
        switch (res) {
          case 'light':
            this.themeColor = '0';
            break;

            case 'dark':
            this.themeColor = '1';
            break;

          default:
            this.themeColor = '0';
            break;
      }
    });
  }

  checkDefaultLanguage(){
    this.deviceInfo.getDefaultLanguage()
    .then((res:string)=>{
      console.log('Language:', res);
        switch (res) {
          case 'ar':
            this.language = 'ar'
            break;

            case 'en':
            this.language = 'en'
            break;
        
          default:
            this.language = 'ar';
            break;
        }
    });
  }

  navigateToContactUs(){
    this.router.navigate(['contact-us']);
  }


  textChange(text_size) {
    console.log("Text sizes: ",text_size.detail.value);
    
  }

}
