import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
 // ROUTE NAME HERE.
 @Input() forwardTo:string = null;
 // ROUTE IS FORWARD OR BACK.
 @Input() goBack:string = null;
 // LEFT AND RIGHT ICON.
 icons:any = { has_left_icon:true, left_icon:'../../assets/icon/settings.svg', has_right_icon:true, right_icon:'../../assets/icon/notification.svg'};
 // MAIN HEADING/SUBHEADING.
 @Input() heading = {has_main_heading:true, main_heading_name:'Vehicle Department', has_sub_heading:false, sub_heading_name:''};
  constructor() {}

}
