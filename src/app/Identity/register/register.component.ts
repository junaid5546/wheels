import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { DeviceInfoService } from '../../Services/device-info.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit,AfterViewInit {

  @Output() registerEvent = new EventEmitter<number>();

  constructor(private deviceInfo:DeviceInfoService) { }

  ngOnInit() {}

  ngAfterViewInit(){  
    //let register = document.getElementById('login-grid');
    //register.style.height = (this.deviceInfo.getDeviceHeight() - 0) +'px';
   // this.deviceInfo.getDeviceHeight()
  }



  navigateLogin(){
    console.log("child clicking");
    this.registerEvent.emit(1);
  }

  // ON EACH INPUT COUNTING LENGTH FOR INPUT
  countNumber(ev){
    console.log(ev.detail.value.length);
    if(ev.detail.value.length == 8){
      // CALL API STRAIGH AWAY.
    }
  }

}
