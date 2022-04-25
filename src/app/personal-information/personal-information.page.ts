import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.page.html',
  styleUrls: ['./personal-information.page.scss'],
})
export class PersonalInformationPage implements OnInit {

  constructor(private iab: InAppBrowser) { }

  ngOnInit() {
    const browser = this.iab.create('https://ionicframework.com/','_blank');
    browser.show();
  }

}
