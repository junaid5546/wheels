import { Component, OnInit, Input, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalControllerService } from '../../../Services/modal-controller.service';
import { DeviceInfoService } from 'src/app/Services/device-info.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private nav:NavController, private router:Router, private modalCtrl:ModalControllerService,private deviceInfo:DeviceInfoService) { }
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
      // this.router.navigate(['tabs/tab1'])
      // .then(()=>{
      //   console.log("Route poped");
      // })
    }
     else {
      // this.router.navigate([this.forwardTo]);
    }
  }

  translate=()=>{
    if(this.routeLink!='/tabs/posts'){
    let language = localStorage.getItem('lang');
    if(language=='ar'){
      this.deviceInfo.changeLanguage('en');
      document.documentElement.dir = "ltr";
      document.getElementsByTagName("body")[0].style.direction="ltr";
      console.log(language);
    }else{
      this.deviceInfo.changeLanguage('ar');
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
