import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { stat } from 'fs';
import { DebugerService } from './debuger.service';
@Injectable({
  providedIn: 'root'
})
export class OfflineApiService {
  private debugging:boolean = false;

  constructor(private c:DebugerService) { 
    this.listenToNetworkStatus();
  }

  public listenToNetworkStatus(){
    Network.addListener('networkStatusChange', status => {
      this.c.log('Network Status Changes:', status,'orange',true);
      
      if(status.connected === false){
         this.c.log('Internet connection lost!!!!','','red',true);
      } else {
        this.c.log('Connected to ',status.connectionType,'green',true);
      }

    });
  }

    public currentNetworkStatus = async () => {
    const status = await Network.getStatus();
    return status;
  }


}
