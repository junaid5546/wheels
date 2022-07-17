import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
 // LEFT AND RIGHT ICON.
 icons:any = { has_left_icon:true, left_icon:'../../assets/icon/settings/back.svg', has_right_icon:true, right_icon:'../../assets/icon/Language.svg'};

 // MAIN HEADING/SUBHEADING.
 heading = {has_main_heading:true, main_heading_name:'Account', has_sub_heading:false, sub_heading_name:''};

  accountList = [
    {name:'Personal Information',available:true,route:'personal-information',icon:'../../assets/account/personal-info.svg'},
    {name:'Public Profile',available:true},
    {name:'Share Profile',available:true},
    {name:'Membership',available:false},
    {name:'Statistics',available:false},
    {name:'Wallet',available:false},
    {name:'Orders',available:false},
    {name:'Bookings',available:false},
    {name:'Following ',available:false},
    {name:'Followers',available:false},
    {name:'Job Profile',available:false},
    {name:'Settings',available:false},
    {name:'Contact Us',available:true,route:'contact-us'}
  ]
  constructor() { }

  ngOnInit() {
  }

}
