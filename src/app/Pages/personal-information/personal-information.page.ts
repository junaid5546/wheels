import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
export type input_icon = 'calendar-outline'| 'call-outline' | 'business-outline';
export type input_type = 'ion-text'| 'ion-select' | 'date-picker' | 'map';
@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.page.html',
  styleUrls: ['./personal-information.page.scss'],
})
export class PersonalInformationPage implements OnInit {
  dobIcon:input_icon = 'calendar-outline';
  inputType:input_type = 'date-picker';
  items = [
    {
      labelName:'Date of Birth',
      isOtpDisabled:true,
      iconName: this.dobIcon = 'calendar-outline',
      value:'12/01/2022',
      type:this.inputType = 'date-picker'
    },
    {
      labelName:'Primary Phone',
      isOtpDisabled:true,
      iconName: this.dobIcon = 'call-outline',
      value:'+96897022005',
      type:this.inputType = 'ion-text'
    },
    {
      labelName:'Secondary Phone',
      isOtpDisabled:true,
      iconName: this.dobIcon = 'call-outline',
      value:'+96897022006',
      type:this.inputType = 'ion-text'
    },
    {
      labelName:'Business Phone',
      isOtpDisabled:true,
      iconName: this.dobIcon = 'call-outline',
      value:'+96897022007',
      type:this.inputType = 'ion-text'
    },
    {
      labelName:'Business Name',
      isOtpDisabled:true,
      iconName: this.dobIcon = 'business-outline',
      value:'Ahmed Alazri Dealership',
      type:this.inputType = 'ion-text'
    },
    {
      labelName:'Business Location',
      isOtpDisabled:true,
      iconName: this.dobIcon = 'business-outline',
      value:'',
      type:this.inputType = 'map'
    }
  ]
  heading = {
    has_main_heading: true,
    main_heading_name: 'Account',
    has_sub_heading: false,
    sub_heading_name: null,
  };

  icons = {
    has_left_icon: true,
    has_right_icon: true,
    left_icon: 'assets/icon/settings/back.svg',
    right_icon: 'assets/icon/posts/post-details/Phone/Vector.svg',
  };
  constructor(private iab: InAppBrowser) {}

  ngOnInit() {

  
  }

  segmentChanged(ev){
    console.log(ev);
  }

}
