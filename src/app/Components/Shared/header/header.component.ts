import { Component, OnInit, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalControllerService } from '../../../Services/modal-controller.service';
import { DeviceInfoService } from 'src/app/Services/device-info.service';
import { UserDataService } from 'src/app/Services/user-data.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  constructor(private nav:NavController, private detector:ChangeDetectorRef, private router:Router, private modalCtrl:ModalControllerService,private deviceInfo:DeviceInfoService, private userData:UserDataService) { }
  // ROUTE NAME HERE.
  @Input() forwardTo:string = null;
  // ROUTE IS FORWARD OR BACK.
  @Input() goBack:string = null;
  // LEFT AND RIGHT ICON.
  @Input() icons = {has_left_icon:false, has_right_icon:false, left_icon:"", right_icon:""};
  // MAIN HEADING/SUBHEADING.
  @Input() heading = {has_main_heading:false, main_heading_name:'', has_sub_heading:false, sub_heading_name:''};
  // HAS MODAL BEING PRESENTED
  @Input() isModal:boolean;
  @Input() filter:boolean;
  rotateBack:boolean = false;
  routeLink:string;

  ngOnInit() {
    this.router.events.subscribe((val) => {
      this.routeLink=val['url'];

    }
    );
  }

  navigate = ()=> {
    
    if(this.goBack=='true'){
      this.nav.back();
    } else if(this.isModal) {
      this.modalCtrl.dismissModal()
    } else if(this.filter){
       this.router.navigate(['tabs/posts'])
    }
     else {
       this.router.navigate([this.forwardTo]);
    }
  }

  translate=()=>{
    if(this.routeLink!='/tabs/posts'){
    let language = this.userData.language;
    if(language == 'ar'){
      this.deviceInfo.changeLanguage('en');
      document.documentElement.dir = "rtl";
      this.icons.right_icon = 'assets/icon/Language.svg'
      this.icons.left_icon = 'assets/icon/settings/back.svg';
      document.getElementsByTagName("body")[0].style.direction="ltr";
      this.userData.language = 'en';
      this.rotateBack = false;
      console.log("EN:language");
    }else{
      this.rotateBack = true;
      console.log("AR:language");
      this.deviceInfo.changeLanguage('ar');
      this.icons.right_icon = 'assets/icon/e.svg'
      this.icons.left_icon = 'assets/icon/settings/back.svg';
      this.userData.language = 'ar';
      document.documentElement.dir = "rtl";
      document.getElementsByTagName("body")[0].style.direction="rtl";
      this.detector.detectChanges();
    }
    
  }else{
    console.log("FOR NOTIFICATION ICON");
  }
  }


  // changeLanguage(lan) {
  //   let lang = lan.detail.value;
  //   this.deviceInfo.changeLanguage(lang);
  // }
}
