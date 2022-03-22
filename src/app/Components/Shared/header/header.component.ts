import { Component, OnInit, Input, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ModalControllerService } from '../../../Services/modal-controller.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private nav:NavController, private router:Router, private modalCtrl:ModalControllerService) { }
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
  
  ngOnInit() {}

  navigate = async ()=> {
    
    if(this.goBack=='true'){
      this.nav.back();

    } else if(this.isModal) {
      
      this.modalCtrl.dismissModal()
    }
     else {
       console.log("forwardTo");
      this.router.navigate([this.forwardTo]);
    }
    console.log("Clicking");
  }
}
