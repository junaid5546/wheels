import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

  items:any[] = [
    {name:'WhatsApp', id:1, icon:'logo-whatsapp'},
    {name:'Message', id:2, icon:'chatbubbles-outline'},
    {name:'Call', id:3, icon:'call'},
    {name:'Instagram', id:4, icon:'logo-instagram'},
    {name:'Facebook', id:5, icon:'logo-facebook'},
    {name:'Youtube', id:6, icon:'logo-youtube'},
    {name:'Tiktok', id:7, icon:'logo-tiktok'},
    {name:'LinkedIn', id:8, icon:'logo-linkedin'},
    {name:'Email', id:9, icon:'mail'},
    {name:'Twitter', id:10, icon:'logo-twitter'},
    {name:'Snapchat', id:11, icon:'logo-snapchat'},
    {name:'Location', id:12, icon:'location'}

  ]
  heading = {
    has_main_heading: true,
    main_heading_name: 'Contact Us',
    has_sub_heading: false,
    sub_heading_name: null,
  };

  icons = {
    has_left_icon: true,
    has_right_icon: true,
    left_icon: 'assets/icon/settings/back.svg',
    right_icon: 'assets/icon/posts/post-details/Phone/Vector.svg',
  };
  constructor() { }

  ngOnInit() {
  }

}
