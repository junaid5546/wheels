import { Component, OnInit, Input, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalControllerService } from '../../../Services/modal-controller.service';
import { DeviceInfoService } from 'src/app/Services/device-info.service';
import { UserDataService } from 'src/app/Services/user-data.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private nav:NavController, private router:Router, private modalCtrl:ModalControllerService,private deviceInfo:DeviceInfoService, private userData:UserDataService) { }
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
    if(language=='ar'){
      this.deviceInfo.changeLanguage('en');
      document.documentElement.dir = "ltr";
      document.getElementsByTagName("body")[0].style.direction="ltr";
      this.userData.language = 'en';
      console.log(language);
    }else{
      this.deviceInfo.changeLanguage('ar');
      this.userData.language = 'ar';
      document.documentElement.dir = "rtl";
      document.getElementsByTagName("body")[0].style.direction="rtl";
      console.log(language);
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
