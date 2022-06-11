import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OpenNativeSettings } from '@awesome-cordova-plugins/open-native-settings/ngx';
@Component({
  selector: 'app-ask-permission',
  templateUrl: './ask-permission.component.html',
  styleUrls: ['./ask-permission.component.scss'],
})
export class AskPermissionComponent implements OnInit {

  @Input() title:string = null;
  @Input() subtitle:string = null;
  @Input() description:string = null;

  constructor(public modalController: ModalController, private settings:OpenNativeSettings) { }

  ngOnInit() {}

  closeModal() {

    this.modalController.dismiss();
    
  }

  


}
