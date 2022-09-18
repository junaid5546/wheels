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
    {name:'Personal Information',available:true,route:'tabs/personal-information',icon:'../../assets/icon/accounts/personal-info.svg'},
    {name:'Public Profile',route:'tabs/personal-information',available:true,icon:'../../assets/icon/accounts/profile.svg'},
    {name:'Share Profile',available:true,icon:'../../assets/icon/accounts/share-profile.svg'},
    {name:'Membership',available:false,icon:'../../assets/icon/accounts/subscription.svg'},
    {name:'Statistics',available:false,icon:'../../assets/icon/accounts/statistic.svg'},
    {name:'Wallet',available:false,icon:'../../assets/icon/accounts/wallet.svg'},
    {name:'Orders',available:false,icon:'../../assets/icon/accounts/orders.svg'},
    {name:'Bookings',available:false,icon:'../../assets/icon/accounts/bookings.svg'},
    {name:'Following ',available:false,icon:'../../assets/icon/accounts/following.svg'},
    {name:'Followers',available:false,icon:'../../assets/icon/accounts/followers.svg'},
    {name:'Job Profile',available:false,icon:'../../assets/icon/accounts/job-profile.svg'},
    {name:'Settings',available:false,icon:'../../assets/icon/accounts/settings.svg'},
    {name:'Contact Us',available:true,route:'contact-us',icon:'../../assets/icon/accounts/contact-us.svg'}
  ]
  constructor() { }

  ngOnInit() {
  }

}
