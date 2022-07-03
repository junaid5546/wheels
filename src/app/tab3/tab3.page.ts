import { Component } from '@angular/core';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  
  icons:any = { has_left_icon:true, left_icon:'../../assets/icon/settings/back.svg', has_right_icon:false, right_icon:'../../assets/icon/notification.svg'};
  heading:any = { has_main_heading:true, main_heading_name:"Ads", has_sub_heading:false, sub_heading_name:'digital-mall.com'  };
  
  constructor() {}

}
