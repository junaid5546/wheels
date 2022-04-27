import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.page.html',
  styleUrls: ['./personal-information.page.scss'],
})
export class PersonalInformationPage implements OnInit {

  constructor(private iab: InAppBrowser) {}

  ngOnInit() {

    const browser = this.iab.create('https://checkout.thawani.om/pay/checkout_l0aWWYfyOzvoUqyhZpfVj2ERs6aS1tR5keiazri4B6vX4ox4jV?key=rRQ26GcsZzoEhbrP2HZvLYDbn9C9et','_blank',{location:"no",zoom:'no'})
    browser.show();
  
  }

}
