import { Component, OnInit } from '@angular/core';
export type input_icon = 'calendar-outline'| 'call-outline' | 'business-outline' | 'name';
export type input_type = 'ion-text'| 'ion-select' | 'date-picker' | 'rich-text';
import { UserAccountService } from '../../Services/user-account.service';
import { UserDataService } from '../../Services/user-data.service';
import { AuthService } from 'dm-api';
import { CamGalService } from "../../Services/cam-gal.service"; 
import { MediaStorageService } from '../../Services/media-storage.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.page.html',
  styleUrls: ['./personal-information.page.scss'],
})
export class PersonalInformationPage implements OnInit {
  // COMPANY LOGO INFORMATION
  hasCompanyLogo:boolean = false;
  // COMPANY COVER INFORMATION
  hasCompanyCover:boolean = false;
  // COMPANY LOGO URL
  companyLogo = '';
   // COMPANY COVER URL
  companyCover = '';
  obj = {first_name:null, last_name:null};
  
  dobIcon:input_icon = 'calendar-outline';
  inputType:input_type = 'date-picker'; 
  person:'../../../assets/icon/person-dm.svg';

  items = [

    {
      labelName:'First Name',
      isOtpDisabled:true,
      iconName: this.dobIcon = 'calendar-outline',
      value:'Ahmed',
      type:this.inputType = 'ion-text'
    },

    {
      labelName:'Last Name',
      isOtpDisabled:true,
      iconName: this.dobIcon = 'calendar-outline',
      value:'Alazri',
      type:this.inputType = 'ion-text'
    },
    {
      labelName:'Date of birth',
      isOtpDisabled:true,
      iconName: this.dobIcon = 'name',
      value:'00/00/0000',
      type:this.inputType = 'date-picker'
    },
    {
      labelName:'Personal Number',
      isOtpDisabled:true,
      iconName: this.dobIcon = 'call-outline',
      value:'+96800000000',
      type:this.inputType = 'ion-text'
    },
    {
      labelName:'Business Number',
      isOtpDisabled:true,
      iconName: this.dobIcon = 'call-outline',
      value:'+96800000000',
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
      labelName:'Business Name',
      isOtpDisabled:true,
      iconName: this.dobIcon = 'business-outline',
      value:'اَحمد اَلعزى',
      type:this.inputType = 'ion-text'
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
    has_right_icon: false,
    left_icon: 'assets/icon/settings/back.svg',
    right_icon: 'assets/icon/posts/post-details/Phone/Vector.svg',
  };

  constructor( private auth: AuthService,
    public senitizer:DomSanitizer,
     private userAccount:UserAccountService, private userData:UserDataService, private camService:CamGalService, private storage:MediaStorageService) {}

  ngOnInit() {
    console.log("USER ID IN ACCOUNT: ", this.userData.fetchUserId());
    this.getPublicProfile()
  }

  takeImage(_name){
   this.camService.getSingleImage(_name)
   .then((file:any)=>{
    console.log("Image Taken: ", file);
    if( _name === 'profile' ) {
      this.hasCompanyLogo = true;
      this.companyLogo = file.base64.webPath;
      this.userData.setPicture('profile',this.companyCover);
    } else {
      this.hasCompanyCover = true;
      this.companyCover = file.base64.webPath;
      this.userData.setPicture('cover',this.companyCover);
    }
    //this.storage.uploadSingleImage(file.file,_name,'62b2fb48d18223d189ec6edb');
   })
  }

  segmentChanged(ev){
    console.log(ev);
  }

  getPublicProfile(){
      
      this.userAccount.getPrivateAccount(this.userData.fetchUserId())
      .then((account:any)=>{
        console.log("USER ACCOUNT", account);
        if(account.code == 0) {
          this.obj.first_name =  account.result.firstName;
          this.obj.last_name =  account.result.lastName;
        }
      })
      .catch((error)=>{
        console.log("USER ACCOUNT ERROR: ", error);
      })
      
  }

  getPrivateProfile(){

  }

  

}
